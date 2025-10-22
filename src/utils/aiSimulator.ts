import type { ExtractedReferralData, SpecialistMatch, UrgencyLevel } from '../types';

// Simulates AI extraction from free-text input
export function simulateAIResponse(
  userInput: string,
  currentData: ExtractedReferralData
): { response: string; data: Partial<ExtractedReferralData>; needsMoreInfo: boolean } {
  const lowerInput = userInput.toLowerCase();
  const extractedData: Partial<ExtractedReferralData> = {};
  let response = '';
  let needsMoreInfo = false;

  // Extract condition
  if (!currentData.condition) {
    if (
      lowerInput.includes('cystic fibrosis') ||
      lowerInput.includes('cf')
    ) {
      extractedData.condition = 'Cystic Fibrosis';
    } else if (
      lowerInput.includes('huntington') ||
      lowerInput.includes('hd')
    ) {
      extractedData.condition = "Huntington's Disease";
    } else if (
      lowerInput.includes('osteoradionecrosis') ||
      lowerInput.includes('orn') ||
      lowerInput.includes('radiation') && lowerInput.includes('jaw')
    ) {
      extractedData.condition = 'Osteoradionecrosis';
    } else if (
      lowerInput.includes('ehlers-danlos') ||
      lowerInput.includes('eds')
    ) {
      extractedData.condition = 'Ehlers-Danlos Syndrome';
    } else if (
      lowerInput.includes('leukemia') ||
      lowerInput.includes('cancer')
    ) {
      extractedData.condition = 'Leukemia';
    } else if (
      lowerInput.includes('parkinson')
    ) {
      extractedData.condition = "Parkinson's Disease";
    }
  }

  // Extract urgency
  if (!currentData.urgency) {
    if (lowerInput.includes('urgent') || lowerInput.includes('asap') || lowerInput.includes('quickly')) {
      extractedData.urgency = 'urgent' as UrgencyLevel;
    } else if (lowerInput.includes('stat') || lowerInput.includes('emergency') || lowerInput.includes('immediately')) {
      extractedData.urgency = 'stat' as UrgencyLevel;
    } else if (lowerInput.includes('routine') || lowerInput.includes('regular')) {
      extractedData.urgency = 'routine' as UrgencyLevel;
    }
  }

  // Extract insurance
  if (!currentData.insurance) {
    if (lowerInput.includes('blue cross') || lowerInput.includes('bcbs')) {
      extractedData.insurance = 'Blue Cross Blue Shield';
    } else if (lowerInput.includes('aetna')) {
      extractedData.insurance = 'Aetna PPO';
    } else if (lowerInput.includes('cigna')) {
      extractedData.insurance = 'Cigna';
    } else if (lowerInput.includes('united') || lowerInput.includes('uhc')) {
      extractedData.insurance = 'UnitedHealthcare';
    } else if (lowerInput.includes('kaiser')) {
      extractedData.insurance = 'Kaiser Permanente';
    } else if (lowerInput.includes('medicare')) {
      extractedData.insurance = 'Medicare';
    }
  }

  // Extract location
  if (!currentData.location) {
    const locationPatterns = [
      /in ([a-z\s]+, [a-z]{2})/i,
      /from ([a-z\s]+)/i,
      /near ([a-z\s]+)/i,
      /([a-z\s]+, [a-z]{2})/i,
    ];

    for (const pattern of locationPatterns) {
      const match = userInput.match(pattern);
      if (match) {
        extractedData.location = match[1];
        break;
      }
    }

    // Check for specific cities
    if (!extractedData.location) {
      const cities = ['boston', 'new york', 'san francisco', 'palo alto', 'houston', 'chicago', 'los angeles', 'baltimore', 'cleveland', 'denver'];
      for (const city of cities) {
        if (lowerInput.includes(city)) {
          extractedData.location = city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          break;
        }
      }
    }
  }

  // Extract telehealth preference
  if (currentData.telehealth === undefined) {
    if (lowerInput.includes('telehealth') || lowerInput.includes('virtual') || lowerInput.includes('remote')) {
      extractedData.telehealth = true;
    }
  }

  // Extract distance preference
  if (!currentData.preferredDistance) {
    const distanceMatch = userInput.match(/within (\d+) miles?/i);
    if (distanceMatch) {
      extractedData.preferredDistance = parseInt(distanceMatch[1]);
    }
  }

  // Store notes
  if (!currentData.notes) {
    extractedData.notes = userInput;
  }

  // Generate response
  const updatedData = { ...currentData, ...extractedData };

  if (extractedData.condition) {
    response = `✓ Got it! I've identified the condition as **${extractedData.condition}**.\n\n`;
    needsMoreInfo = true;
  }

  if (extractedData.urgency && !currentData.urgency) {
    response += `✓ Urgency level set to **${extractedData.urgency.toUpperCase()}**.\n\n`;
  }

  if (extractedData.insurance && !currentData.insurance) {
    response += `✓ Patient insurance: **${extractedData.insurance}**.\n\n`;
  }

  if (extractedData.location && !currentData.location) {
    response += `✓ Location: **${extractedData.location}**.\n\n`;
  }

  // Determine what's still needed
  const missing = [];
  if (!updatedData.condition) missing.push('condition/diagnosis');
  if (!updatedData.urgency) missing.push('urgency level');
  if (!updatedData.insurance) missing.push('insurance provider');
  if (!updatedData.location) missing.push('patient location');

  if (missing.length > 0) {
    response += `To find the best specialists, I still need:\n• ${missing.join('\n• ')}\n\nCould you provide these details?`;
    needsMoreInfo = true;
  } else {
    response += `Perfect! I have all the information needed. Click "Find Matching Specialists" to see AI-powered recommendations.`;
    needsMoreInfo = false;
  }

  if (!response) {
    response = "I've noted that information. Could you provide more details about the patient's condition, insurance, location, and urgency?";
    needsMoreInfo = true;
  }

  return { response, data: extractedData, needsMoreInfo };
}

// Generate mock specialist matches based on extracted data
export function generateMatches(data: ExtractedReferralData): SpecialistMatch[] {
  const condition = data.condition?.toLowerCase() || '';

  let specialists: SpecialistMatch[] = [];

  if (condition.includes('cystic fibrosis')) {
    specialists = [
      {
        id: 'petrova',
        name: 'Dr. Lena Petrova, MD',
        specialty: 'Pulmonology',
        subspecialty: 'Co-Director, Adult Cystic Fibrosis Program',
        location: 'Denver, CO',
        distance: 12,
        institution: 'National Jewish Health',
        insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna PPO', 'Medicare'],
        matchScore: 95,
        matchReasons: [
          '5 similar cases treated',
          'CF specialist',
          'In-network for patient insurance',
          'Running active CF trial (NCT05554321)',
        ],
        waitTime: '1-2 weeks',
        acceptanceRate: 94,
        image: 'https://placehold.co/80x80/86EFAC/15803D?text=LP',
        telehealth: true,
      },
      {
        id: 'khan',
        name: 'Dr. Aisha Khan, MD',
        specialty: 'Pediatric Pulmonology',
        subspecialty: 'Complex Respiratory Diseases',
        location: 'Boston, MA',
        distance: 45,
        institution: "Boston Children's Hospital",
        insuranceAccepted: ['Blue Cross Blue Shield', 'UnitedHealthcare', 'Cigna'],
        matchScore: 88,
        matchReasons: [
          'Leading CF research',
          'Accept pediatric & young adult patients',
          'Running inhaled antibiotic trial',
        ],
        waitTime: '3-5 weeks',
        acceptanceRate: 87,
        image: 'https://placehold.co/80x80/67E8F9/0E7490?text=AK',
        telehealth: true,
      },
      {
        id: 'brown',
        name: 'Dr. Michael Brown, MD',
        specialty: 'Pulmonology & Gastroenterology',
        subspecialty: 'CF Complications Specialist',
        location: 'Atlanta, GA',
        distance: 78,
        institution: 'Emory University Hospital',
        insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna PPO', 'Kaiser Permanente'],
        matchScore: 82,
        matchReasons: [
          'Dual-specialist for CF complications',
          'Expertise in GI manifestations',
          'High patient satisfaction',
        ],
        waitTime: '2-4 weeks',
        acceptanceRate: 91,
        image: 'https://placehold.co/80x80/FDE68A/854D0E?text=MB',
        telehealth: true,
      },
    ];
  } else if (condition.includes('huntington')) {
    specialists = [
      {
        id: 'thorne',
        name: 'Dr. Marcus Thorne, MD',
        specialty: 'Movement Disorders Neurology',
        subspecialty: 'Director, Movement Disorders Center',
        location: 'Baltimore, MD',
        distance: 22,
        institution: 'Johns Hopkins Hospital',
        insuranceAccepted: ['Blue Cross Blue Shield', 'UnitedHealthcare', 'Medicare'],
        matchScore: 97,
        matchReasons: [
          'Leading HD expert',
          'Running gene therapy trial',
          '15+ years HD research',
          'In-network',
        ],
        waitTime: '2-3 weeks',
        acceptanceRate: 96,
        image: 'https://placehold.co/80x80/FDBA74/C2410C?text=MT',
        telehealth: true,
      },
      {
        id: 'carter',
        name: 'Dr. Ben Carter, PhD',
        specialty: 'Neurogenetics',
        subspecialty: 'Genetic Counseling',
        location: 'Cleveland, OH',
        distance: 34,
        institution: 'Cleveland Clinic',
        insuranceAccepted: ['Blue Cross Blue Shield', 'Cigna', 'Aetna PPO'],
        matchScore: 89,
        matchReasons: [
          'Genetic testing specialist',
          'Family counseling expertise',
          'Predictive testing available',
        ],
        waitTime: '2-4 weeks',
        acceptanceRate: 88,
        image: 'https://placehold.co/80x80/C4B5FD/5B21B6?text=BC',
        telehealth: true,
      },
      {
        id: 'rodriguez',
        name: 'Dr. Olivia Rodriguez, MD',
        specialty: 'Neurology',
        subspecialty: 'Clinical Trials Principal Investigator',
        location: 'Los Angeles, CA',
        distance: 56,
        institution: 'UCLA Medical Center',
        insuranceAccepted: ['Blue Cross Blue Shield', 'Kaiser Permanente'],
        matchScore: 85,
        matchReasons: [
          'Leading clinical trials',
          'Novel treatment approaches',
          'Research-focused care',
        ],
        waitTime: 'Varies',
        acceptanceRate: 72,
        image: 'https://placehold.co/80x80/FDA4AF/881337?text=OR',
        telehealth: true,
      },
    ];
  } else if (condition.includes('osteoradionecrosis')) {
    specialists = [
      {
        id: 'vance',
        name: 'Dr. Eleanor Vance, MD, PhD',
        specialty: 'Head & Neck Surgical Oncology',
        subspecialty: 'Professor and Chair',
        location: 'Palo Alto, CA',
        distance: 8,
        institution: 'Stanford Health Care',
        insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna PPO', 'UnitedHealthcare'],
        matchScore: 98,
        matchReasons: [
          'ORN specialist',
          'Microvascular reconstruction expert',
          '3 active ORN trials',
          'In-network',
        ],
        waitTime: '4-6 weeks',
        acceptanceRate: 93,
        image: 'https://placehold.co/80x80/93C5FD/3B82F6?text=EV',
        telehealth: false,
      },
      {
        id: 'tanaka',
        name: 'Dr. Kenji Tanaka, DDS',
        specialty: 'Oral & Maxillofacial Surgery',
        subspecialty: 'Oral Oncology Complications',
        location: 'Houston, TX',
        distance: 125,
        institution: 'MD Anderson Cancer Center',
        insuranceAccepted: ['Blue Cross Blue Shield', 'Medicare', 'Cigna'],
        matchScore: 91,
        matchReasons: [
          'Hyperbaric oxygen trial',
          'Surgical ORN management',
          'World-class cancer center',
        ],
        waitTime: '2-3 weeks',
        acceptanceRate: 95,
        image: 'https://placehold.co/80x80/FCA5A5/991B1B?text=KT',
        telehealth: false,
      },
    ];
  } else {
    // Default generic specialists
    specialists = [
      {
        id: 'generic1',
        name: 'Dr. Sarah Johnson, MD',
        specialty: 'Internal Medicine',
        subspecialty: 'Complex Cases Specialist',
        location: data.location || 'Boston, MA',
        distance: 15,
        institution: 'Academic Medical Center',
        insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna PPO', 'Medicare'],
        matchScore: 85,
        matchReasons: [
          'Broad specialty match',
          'In-network',
          'Accepting new referrals',
        ],
        waitTime: '2-3 weeks',
        acceptanceRate: 88,
        image: 'https://placehold.co/80x80/93C5FD/3B82F6?text=SJ',
        telehealth: true,
      },
    ];
  }

  // Filter by insurance if specified
  if (data.insurance) {
    specialists = specialists.map((s) => {
      if (s.insuranceAccepted.some((ins) => ins.toLowerCase().includes(data.insurance!.toLowerCase()))) {
        return { ...s, matchScore: s.matchScore + 3 };
      }
      return s;
    });
  }

  // Filter by telehealth if specified
  if (data.telehealth) {
    specialists = specialists.filter((s) => s.telehealth);
  }

  // Sort by match score
  specialists.sort((a, b) => b.matchScore - a.matchScore);

  return specialists;
}

