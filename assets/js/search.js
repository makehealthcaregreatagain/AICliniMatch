(() => {
  function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      window.scrollTo(0, 0);
    }
  }

  function toggleAdvancedSearch() {
    const form = document.getElementById('advanced-search-form');
    const toggleIcon = document.querySelector('#advanced-search-toggle i');
    form.classList.toggle('hidden');
    if (form.classList.contains('hidden')) {
      toggleIcon.classList.remove('rotate-180');
    } else {
      toggleIcon.classList.add('rotate-180');
    }
  }

  // Core filtering logic factored out so we can call after data loads if needed
  async function _runFilter() {
    const searchTerm = document.getElementById('main-search-input').value.toLowerCase().trim();
    const locationTerm = document.getElementById('adv-location').value.toLowerCase().trim();
    const institutionTerm = document.getElementById('adv-institution').value.toLowerCase().trim();
    const trialsTerm = document.getElementById('adv-trials').value.toLowerCase().trim();
    const telehealthChecked = document.getElementById('adv-telehealth').checked;
    const acceptingChecked = document.getElementById('adv-accepting').checked;
    const radiusEl = document.getElementById('adv-radius');
    const radiusMiles = radiusEl ? parseFloat(radiusEl.value) : NaN;

    document.getElementById('search-results-term').textContent = `"${searchTerm || 'All Specialists'}"`;

    const cards = document.querySelectorAll('.specialist-card');
    let any = false;

    // Determine if locationTerm is a 5-digit ZIP for proximity search
    let origin = null;
    const zipMatch = locationTerm.match(/^\d{5}$/);
    if (zipMatch) {
      try {
        origin = await window.__geo.geocodeZip(locationTerm);
      } catch (e) {
        console.warn('[AICliniMatch] ZIP geocode failed:', e?.message || e);
      }
    }

    const visibleCards = [];
    cards.forEach(card => {
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const telehealth = card.getAttribute('data-telehealth') === 'true';
      const accepting = card.getAttribute('data-accepting') === 'true';

      const mainMatch = !searchTerm || keywords.includes(searchTerm);
      let locationMatch = true;
      let computedDistance = null;

      if (origin) {
        const coords = window.__geo.getCardLatLon(card);
        if (coords) {
          computedDistance = window.__geo.haversineMiles(origin.lat, origin.lon, coords.lat, coords.lon);
          const maxRadius = Number.isFinite(radiusMiles) ? radiusMiles : 9999;
          locationMatch = computedDistance <= maxRadius;
        } else {
          locationMatch = false;
        }
      } else {
        locationMatch = !locationTerm || keywords.includes(locationTerm);
      }
      const institutionMatch = !institutionTerm || keywords.includes(institutionTerm);
      const trialsMatch = !trialsTerm || keywords.includes(trialsTerm);
      const telehealthMatch = !telehealthChecked || telehealth;
      const acceptingMatch = !acceptingChecked || accepting;

      if (mainMatch && locationMatch && institutionMatch && trialsMatch && telehealthMatch && acceptingMatch) {
        card.style.display = 'flex';
        if (computedDistance != null) {
          card.setAttribute('data-distance', String(computedDistance));
        } else {
          card.removeAttribute('data-distance');
        }
        any = true;
        visibleCards.push(card);
      } else {
        card.style.display = 'none';
        card.removeAttribute('data-distance');
      }
    });

    // Sort visible cards by distance if proximity search is active
    if (origin && visibleCards.length > 1) {
      const container = document.getElementById('results-list');
      const sorted = visibleCards
        .map(el => ({ el, d: parseFloat(el.getAttribute('data-distance')) }))
        .filter(x => Number.isFinite(x.d))
        .sort((a, b) => a.d - b.d)
        .map(x => x.el);
      sorted.forEach(el => container.appendChild(el));
    }

    const msg = document.getElementById('no-results-message');
    if (msg) msg.style.display = any ? 'none' : 'block';
    showScreen('screen-results');
  }

  // Public function called by onclick in HTML
  function performSearch() {
    // If cards aren't on the page yet, ensure they get created first (race-safe).
    const haveCards = !!document.querySelector('.specialist-card');

    const ensureReadyThenFilter = () => {
      if (!document.querySelector('.specialist-card') && typeof window.populateSpecialistCards === 'function' && window.specialists) {
        window.populateSpecialistCards();
      }
      _runFilter();
    };

    if (haveCards) {
      _runFilter();
    } else if (window.__doctorsLoaded && typeof window.__doctorsLoaded.then === 'function') {
      // Wait for doctors to load, then populate and filter
      window.__doctorsLoaded.then(ensureReadyThenFilter).catch(ensureReadyThenFilter);
    } else {
      // No promise? try to populate from whatever we have, then filter
      ensureReadyThenFilter();
    }
  }

  function runDemoSearch(term) {
    document.getElementById('main-search-input').value = term;
    document.getElementById('adv-location').value = '';
    document.getElementById('adv-institution').value = '';
    document.getElementById('adv-trials').value = '';
    document.getElementById('adv-telehealth').checked = false;
    document.getElementById('adv-accepting').checked = false;
    performSearch();
  }

  // Pressing Enter in the main input triggers search
  document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('main-search-input');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          performSearch();
        }
      });
    }

    // Auto-update search when ZIP code changes
    const zipInput = document.getElementById('adv-location');
    if (zipInput) {
      zipInput.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        // If it's a 5-digit ZIP, auto-trigger search after a short delay
        if (/^\d{5}$/.test(value)) {
          clearTimeout(window.zipSearchTimeout);
          window.zipSearchTimeout = setTimeout(() => {
            performSearch();
          }, 500); // 500ms delay to avoid too many searches
        }
      });
    }
  });

  function toggleInsuranceFilter() {
    const options = document.getElementById('insurance-filter-options');
    const icon = document.getElementById('insurance-filter-icon');
    const text = document.getElementById('insurance-filter-text');
    
    options.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
    
    // Update button text based on selected options
    const checkboxes = document.querySelectorAll('.insurance-checkbox:checked');
    if (checkboxes.length === 0) {
      text.textContent = 'Select Insurance Plans';
    } else if (checkboxes.length === 1) {
      text.textContent = checkboxes[0].value;
    } else {
      text.textContent = `${checkboxes.length} plans selected`;
    }
  }

  // expose globals used by inline onclick
  window.showScreen = showScreen;
  window.toggleAdvancedSearch = toggleAdvancedSearch;
  window.performSearch = performSearch;
  window.runDemoSearch = runDemoSearch;
  window.toggleInsuranceFilter = toggleInsuranceFilter;
})();
