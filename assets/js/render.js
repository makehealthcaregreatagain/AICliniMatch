(() => {
  function createSpecialistCard(id, data) {
  const statusSpan = data.accepting
    ? `<span class="text-sm bg-green-100 text-green-800 font-medium px-2 py-1 rounded-full">Accepting Referrals</span>`
    : `<span class="text-sm bg-red-100 text-red-800 font-medium px-2 py-1 rounded-full">Not Accepting</span>`;

  const referButton = data.accepting
    ? `<button onclick="showProfile('${id}')" class="bg-blue-600 text-white px-4 py-2 h-fit self-center rounded-lg font-semibold hover:bg-blue-700 transition">View & Refer</button>`
    : `<button class="bg-gray-400 text-white px-4 py-2 h-fit self-center rounded-lg font-semibold cursor-not-allowed">View Profile</button>`;

  let tagsHTML = '';
  if (Array.isArray(data.tags) && data.tags.length > 0) {
    const primaryTag = data.tags[0];
    tagsHTML += `<span class="inline-block bg-blue-100 border border-blue-300 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">${primaryTag}</span>`;
    if (data.tags[1]) {
      tagsHTML += `<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${data.tags[1]}</span>`;
    }
  }

  // NEW: geo attributes (prefer lat/lng; else null)
  const latAttr = (data.lat != null) ? ` data-geo-lat="${data.lat}"` : '';
  const lonAttr = (data.lng != null) ? ` data-geo-lon="${data.lng}"` : '';

  return `
    <div class="specialist-card bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex items-start space-x-6"
         data-keywords="${(((data.keywords || '') + ' ' + (data.specialty || '') + ' ' + (Array.isArray(data.tags) ? data.tags.join(', ') : '')).toLowerCase())}"
         data-telehealth="${!!data.telehealth}" data-accepting="${!!data.accepting}"
         data-institution="${(data.location || '').toLowerCase()}"
         ${latAttr}${lonAttr}>
      <img src="${data.img}" alt="${data.name}" class="w-20 h-20 rounded-full border-4 border-white shadow-sm">
      <div class="flex-grow">
        <div class="flex justify-between items-center">
          <h4 class="text-xl font-bold">${data.name}</h4>
          ${statusSpan}
        </div>
        <p class="text-blue-700">${data.specialty}</p>
        <p class="text-gray-600 text-sm mt-1"><i class="fa-solid fa-hospital mr-2"></i>${data.location}</p>
        <div class="mt-3">${tagsHTML}</div>
      </div>
      ${referButton}
    </div>
  `;
  }


  function populateSpecialistCards() {
    const container = document.getElementById('results-list');
    if (!container) return;
    container.innerHTML = `
      <div id="no-results-message" class="hidden text-center py-10 bg-gray-50 rounded-lg">
        <i class="fa-solid fa-magnifying-glass text-4xl text-gray-400"></i>
        <h3 class="mt-4 text-xl font-semibold text-gray-700">No Specialists Found</h3>
        <p class="mt-1 text-gray-500">Try adjusting your search term or filters.</p>
      </div>`;

    for (const id in window.specialists) {
      const cardHTML = createSpecialistCard(id, window.specialists[id]);
      container.insertAdjacentHTML('beforeend', cardHTML);
    }
  }

  function showProfile(specialistId) {
    const data = window.specialists?.[specialistId];
    if (!data) return;

    // Header
    document.getElementById('profile-img').src = data.img;
    document.getElementById('profile-name').textContent = data.name;
    document.getElementById('profile-subspecialty').textContent = data.sub_specialty || '';
    document.getElementById('profile-location').innerHTML = `<i class="fa-solid fa-hospital mr-2"></i>${data.location}`;

    // Referral form header
    document.getElementById('referral-to-name').textContent = data.name;
    document.getElementById('referral-to-location').textContent = data.location;

    // Refer button container
    const referBtnCtn = document.getElementById('profile-refer-button-container');
    referBtnCtn.innerHTML = data.accepting
      ? `<button onclick="showScreen('screen-referral')" class="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"><i class="fa-solid fa-paper-plane mr-2"></i> Initiate Referral</button>`
      : `<button class="w-full bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold text-lg cursor-not-allowed"><i class="fa-solid fa-times-circle mr-2"></i> Not Accepting Referrals</button>`;

    // Body
    document.getElementById('profile-bio').textContent = data.bio || '';

    const tagsContainer = document.getElementById('profile-tags');
    tagsContainer.innerHTML = '';
    (data.tags || []).forEach((tag, idx) => {
      const isPrimary = idx === 0;
      const el = document.createElement('span');
      el.className = `${isPrimary ? 'bg-blue-100 border border-blue-300 text-blue-800' : 'bg-gray-200 text-gray-800'} px-3 py-1 rounded-full font-medium`;
      el.textContent = tag;
      tagsContainer.appendChild(el);
    });

    const trialsContainer = document.getElementById('profile-trials');
    trialsContainer.innerHTML = '';
    if (Array.isArray(data.trials) && data.trials.length > 0) {
      data.trials.forEach(t => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="font-semibold text-gray-800">${t.id}:</span> ${t.desc}`;
        trialsContainer.appendChild(li);
      });
    } else {
      trialsContainer.innerHTML = '<li>No active clinical trials listed.</li>';
    }

    const keynoteContainer = document.getElementById('profile-keynote');
    keynoteContainer.innerHTML = '';
    if (Array.isArray(data.keynote_speaking) && data.keynote_speaking.length > 0) {
      data.keynote_speaking.forEach(engagement => {
        const li = document.createElement('li');
        li.textContent = engagement;
        keynoteContainer.appendChild(li);
      });
    } else {
      keynoteContainer.innerHTML = '<li>No keynote or speaking engagements listed.</li>';
    }

    // Referral info
    document.getElementById('referral-accepted').textContent = data.referral_info?.accepted || '';
    document.getElementById('referral-protocol').textContent = data.referral_info?.protocol || '';
    document.getElementById('referral-contact').textContent = data.referral_info?.contact || '';

    window.showScreen('screen-profile');
  }

  // Referral tracking functionality
  function showReferralsPage() {
    populateReferralsTable();
    window.showScreen('screen-referrals');
  }

  function populateReferralsTable() {
    const tbody = document.getElementById('referrals-table-body');
    if (!tbody) return;

    // Get referrals from localStorage or use sample data
    const referrals = JSON.parse(localStorage.getItem('dr_sharma_referrals') || '[]');
    
    if (referrals.length === 0) {
      // Add some sample referrals
      const sampleReferrals = [
        {
          id: 1,
          patientName: 'Sarah Johnson',
          specialist: 'Dr. Eleanor Vance',
          dateReferred: '2024-01-15',
          reason: 'Mandibular osteoradionecrosis post-radiation',
          status: 'Completed',
          documents: 3
        },
        {
          id: 2,
          patientName: 'Michael Chen',
          specialist: 'Dr. Lena Petrova',
          dateReferred: '2024-01-20',
          reason: 'Adult cystic fibrosis management',
          status: 'In Progress',
          documents: 2
        },
        {
          id: 3,
          patientName: 'Emily Rodriguez',
          specialist: 'Dr. Marcus Thorne',
          dateReferred: '2024-01-25',
          reason: 'Huntington\'s disease evaluation',
          status: 'Pending',
          documents: 1
        }
      ];
      localStorage.setItem('dr_sharma_referrals', JSON.stringify(sampleReferrals));
      referrals.push(...sampleReferrals);
    }

    tbody.innerHTML = '';
    referrals.forEach(referral => {
      const row = document.createElement('tr');
      const statusClass = getStatusClass(referral.status);
      row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${referral.patientName}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${referral.specialist}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${referral.dateReferred}</td>
        <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">${referral.reason}</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusClass}">${referral.status}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <span class="flex items-center">
            <i class="fa-solid fa-file-text mr-1"></i>
            ${referral.documents} file${referral.documents !== 1 ? 's' : ''}
          </span>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  function getStatusClass(status) {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function submitReferralForm() {
    const patientName = document.querySelector('#screen-referral input[placeholder="Enter patient name"]').value.trim();
    const reason = document.querySelector('#screen-referral textarea').value.trim();
    
    if (!patientName || !reason) {
      alert('Please fill in both Patient Name and Reason for Referral fields.');
      return;
    }

    // Get current specialist data
    const specialistName = document.getElementById('referral-to-name').textContent;
    const specialistLocation = document.getElementById('referral-to-location').textContent;
    
    // Count uploaded files
    const uploadedFiles = document.querySelectorAll('#uploaded-files .file-item');
    const documentCount = uploadedFiles.length;
    
    // Create new referral
    const newReferral = {
      id: Date.now(),
      patientName: patientName,
      specialist: specialistName,
      dateReferred: new Date().toISOString().split('T')[0],
      reason: reason,
      status: 'Pending',
      documents: documentCount
    };

    // Add to localStorage
    const referrals = JSON.parse(localStorage.getItem('dr_sharma_referrals') || '[]');
    referrals.push(newReferral);
    localStorage.setItem('dr_sharma_referrals', JSON.stringify(referrals));

    // Clear form
    document.querySelector('#screen-referral input[placeholder="Enter patient name"]').value = '';
    document.querySelector('#screen-referral textarea').value = '';
    document.getElementById('uploaded-files').innerHTML = '';

    // Show success message and go back to search
    alert('Referral submitted successfully!');
    window.showScreen('screen-search');
  }

  // Document upload functionality
  function initializeDocumentUpload() {
    const dropZone = document.getElementById('document-drop-zone');
    const fileInput = document.getElementById('file-input');
    const uploadedFiles = document.getElementById('uploaded-files');

    if (!dropZone || !fileInput || !uploadedFiles) return;

    // File input change handler
    fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop handlers
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('border-blue-400', 'bg-blue-50');
    });

    dropZone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-blue-400', 'bg-blue-50');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-blue-400', 'bg-blue-50');
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    });
  }

  function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    handleFiles(files);
  }

  function handleFiles(files) {
    const uploadedFiles = document.getElementById('uploaded-files');
    
    files.forEach(file => {
      // Validate file type
      const allowedTypes = ['.pdf', '.docx', '.jpg', '.jpeg', '.png', '.dcm'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        alert(`File type ${fileExtension} is not allowed. Please upload PDF, DOCX, JPG, PNG, or DICOM files.`);
        return;
      }

      // Create file item
      const fileItem = document.createElement('div');
      fileItem.className = 'file-item flex items-center justify-between bg-gray-100 p-2 rounded';
      fileItem.innerHTML = `
        <div class="flex items-center">
          <i class="fa-solid fa-file-text text-blue-600 mr-2"></i>
          <span class="text-sm text-gray-700">${file.name}</span>
          <span class="text-xs text-gray-500 ml-2">(${formatFileSize(file.size)})</span>
        </div>
        <button onclick="removeFile(this)" class="text-red-500 hover:text-red-700">
          <i class="fa-solid fa-times"></i>
        </button>
      `;
      uploadedFiles.appendChild(fileItem);
    });
  }

  function removeFile(button) {
    button.parentElement.remove();
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Initialize document upload when DOM is ready
  document.addEventListener('DOMContentLoaded', initializeDocumentUpload);

  // Expose API to global (to keep onclick handlers working unchanged)
  window.createSpecialistCard = createSpecialistCard;
  window.populateSpecialistCards = populateSpecialistCards;
  window.showProfile = showProfile;
  window.showReferralsPage = showReferralsPage;
  window.submitReferralForm = submitReferralForm;
  window.removeFile = removeFile;
})();
