import { useState } from 'react';
import { Sparkles, MapPin, Clock, TrendingUp, Shield, Phone, Send, CheckCircle, Video, Building2 } from 'lucide-react';
import type { SpecialistMatch, ExtractedReferralData } from '../types';

interface Props {
  matches: SpecialistMatch[];
  extractedData: ExtractedReferralData | null;
  onSendReferral: (specialist: SpecialistMatch) => void;
}

// Unique AI insights for each physician
const aiInsights: Record<string, Array<{color: string, icon: string, title: string, text: string}>> = {
  petrova: [
    { color: 'blue', icon: 'trending', title: 'Published researcher', text: '12 peer-reviewed publications on CF treatment in last 2 years' },
    { color: 'purple', icon: 'clock', title: 'Trial coordinator', text: 'Leading 3 active CF clinical trials with novel modulator therapies' },
    { color: 'green', icon: 'shield', title: 'Patient outcomes', text: '89% improvement rate in lung function among CF patients' },
  ],
  khan: [
    { color: 'blue', icon: 'trending', title: 'Pediatric expert', text: 'Specializes in transition care for young adults with CF' },
    { color: 'purple', icon: 'clock', title: 'Fast appointments', text: 'Average wait time 30% shorter than national average' },
    { color: 'green', icon: 'shield', title: 'Family-centered', text: '98% satisfaction from parents and caregivers' },
  ],
  brown: [
    { color: 'blue', icon: 'trending', title: 'Dual expertise', text: 'Handles both pulmonary and GI complications in one visit' },
    { color: 'purple', icon: 'clock', title: 'Comprehensive care', text: 'Coordinates with nutrition and pharmacy teams' },
    { color: 'green', icon: 'shield', title: 'Insurance navigator', text: 'Dedicated team helps with authorization and coverage' },
  ],
  chen: [
    { color: 'blue', icon: 'trending', title: 'Technology leader', text: 'Uses AI-powered diagnostics for early intervention' },
    { color: 'purple', icon: 'clock', title: 'Same-week slots', text: 'Flexible scheduling with evening and weekend availability' },
    { color: 'green', icon: 'shield', title: 'Patient portal', text: 'Award-winning digital communication platform' },
  ],
  williams: [
    { color: 'blue', icon: 'trending', title: 'Critical care expert', text: 'Manages complex cases requiring ICU-level monitoring' },
    { color: 'purple', icon: 'clock', title: 'Rapid response', text: 'Available for urgent consultations within 24 hours' },
    { color: 'green', icon: 'shield', title: 'Hospital privileges', text: 'Admits to 3 major hospitals for continuity of care' },
  ],
  taylor: [
    { color: 'blue', icon: 'trending', title: 'Sleep specialist', text: 'Addresses sleep-disordered breathing in pulmonary patients' },
    { color: 'purple', icon: 'clock', title: 'Research grants', text: 'NIH-funded studies on sleep and lung disease outcomes' },
    { color: 'green', icon: 'shield', title: 'Holistic approach', text: 'Integrates lifestyle and behavioral interventions' },
  ],
};

// Hardcoded physicians - will show 3 different sets based on search
const physicianSets = {
  initial: [
    {
      id: 'petrova',
      name: 'Dr. Lena Petrova, MD',
      specialty: 'Pulmonology',
      subspecialty: 'Adult Cystic Fibrosis Program',
      location: 'Denver, CO',
      distance: 12,
      institution: 'National Jewish Health',
      insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna PPO', 'Medicare'],
      matchScore: 95,
      matchReasons: ['5 similar cases treated', 'CF specialist', 'In-network', 'Running active CF trial'],
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
      matchReasons: ['Leading CF research', 'Pediatric & young adult patients', 'Running inhaled antibiotic trial'],
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
      matchReasons: ['Dual-specialist for CF', 'GI manifestations expertise', 'High patient satisfaction'],
      waitTime: '2-4 weeks',
      acceptanceRate: 91,
      image: 'https://placehold.co/80x80/FDE68A/854D0E?text=MB',
      telehealth: true,
    },
  ],
  refined: [
    {
      id: 'chen',
      name: 'Dr. Sarah Chen, MD',
      specialty: 'Pulmonology',
      subspecialty: 'Interventional Pulmonology',
      location: 'San Francisco, CA',
      distance: 5,
      institution: 'UCSF Medical Center',
      insuranceAccepted: ['Blue Cross Blue Shield', 'Kaiser Permanente', 'Medicare'],
      matchScore: 92,
      matchReasons: ['Closest match to your criteria', 'Excellent reviews', 'Fast response time'],
      waitTime: '1 week',
      acceptanceRate: 96,
      image: 'https://placehold.co/80x80/93C5FD/3B82F6?text=SC',
      telehealth: true,
    },
    {
      id: 'williams',
      name: 'Dr. James Williams, MD',
      specialty: 'Pulmonology',
      subspecialty: 'Critical Care',
      location: 'Seattle, WA',
      distance: 28,
      institution: 'University of Washington Medical Center',
      insuranceAccepted: ['Blue Cross Blue Shield', 'Aetna PPO', 'UnitedHealthcare'],
      matchScore: 89,
      matchReasons: ['Matches refined criteria', 'Available immediately', 'Telehealth preferred'],
      waitTime: '3-5 days',
      acceptanceRate: 93,
      image: 'https://placehold.co/80x80/FDA4AF/881337?text=JW',
      telehealth: true,
    },
    {
      id: 'taylor',
      name: 'Dr. Maria Taylor, MD',
      specialty: 'Pulmonology',
      subspecialty: 'Sleep Medicine',
      location: 'Portland, OR',
      distance: 42,
      institution: 'Oregon Health & Science University',
      insuranceAccepted: ['Blue Cross Blue Shield', 'Cigna', 'Medicare'],
      matchScore: 85,
      matchReasons: ['Specialized care', 'Comprehensive approach', 'Research-focused'],
      waitTime: '2 weeks',
      acceptanceRate: 90,
      image: 'https://placehold.co/80x80/A78BFA/4C1D95?text=MT',
      telehealth: false,
    },
  ],
};

export default function MatchResults({ matches, extractedData, onSendReferral }: Props) {
  const [showToast, setShowToast] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);
  const [refineInput, setRefineInput] = useState('');
  const [expandedInsights, setExpandedInsights] = useState<Set<string>>(new Set(['petrova', 'khan', 'brown', 'chen', 'williams', 'taylor']));
  const [displayedPhysicians, setDisplayedPhysicians] = useState<SpecialistMatch[]>(physicianSets.initial);

  const handleSend = (specialist: SpecialistMatch) => {
    setSelectedSpecialist(specialist.id);
    setShowToast(true);
    setTimeout(() => {
      onSendReferral(specialist);
    }, 1500);
  };

  const handleRefineSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Switch to refined set of physicians
    setDisplayedPhysicians(physicianSets.refined);
    setRefineInput('');
  };

  return (
    <div className="animate-fade-in">
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 animate-slide-up">
          <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-semibold">Referral Sent Successfully!</p>
              <p className="text-sm text-green-100">Redirecting to dashboard...</p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">AI-Matched Specialists</h2>
        </div>
        <p className="text-gray-600">
          Based on your patient's case, we've identified {displayedPhysicians.length} highly relevant specialists.
        </p>
      </div>

      {/* Refine Search Bar */}
      <form onSubmit={handleRefineSearch} className="mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm font-medium text-blue-900 mb-3">Not happy with these results? Refine your search:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={refineInput}
              onChange={(e) => setRefineInput(e.target.value)}
              placeholder='e.g., "Must accept Kaiser" or "Within 10 miles of SF"'
              className="flex-1 px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Refine
            </button>
          </div>
        </div>
      </form>

      <div className="max-w-5xl mx-auto">
        {/* Main Results */}
        <div className="space-y-4">
          {displayedPhysicians.map((match, idx) => (
            <div
              key={match.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden card-hover"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Match Score Banner */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white font-semibold text-sm">
                    {match.matchScore}% Match
                  </span>
                </div>
                <span className="text-xs text-blue-100">
                  Rank #{idx + 1}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Profile Image */}
                  <img
                    src={match.image}
                    alt={match.name}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200"
                  />

                  {/* Specialist Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{match.name}</h3>
                    <p className="text-blue-600 font-medium">{match.specialty}</p>
                    {match.subspecialty && (
                      <p className="text-sm text-gray-600">{match.subspecialty}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span>{match.institution}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{match.location} ({match.distance} mi)</span>
                      </div>
                      {match.telehealth && (
                        <div className="flex items-center gap-1 text-green-600">
                          <Video className="w-4 h-4" />
                          <span>Telehealth</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex flex-col gap-2">
                    <div className="text-center px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-xs text-green-700 font-medium">Acceptance</div>
                      <div className="text-lg font-bold text-green-700">{match.acceptanceRate}%</div>
                    </div>
                    <div className="text-center px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-xs text-blue-700 font-medium">Wait Time</div>
                      <div className="text-sm font-semibold text-blue-700">{match.waitTime}</div>
                    </div>
                  </div>
                </div>

                {/* Match Reasons */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Why This Match?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {match.matchReasons.map((reason, i) => (
                      <span key={i} className="ai-chip">
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Insurance */}
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Accepts:</span>
                  <span className="font-medium text-gray-900">
                    {match.insuranceAccepted.join(', ')}
                  </span>
                </div>

                {/* AI Insights Toggle */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      const newSet = new Set(expandedInsights);
                      if (newSet.has(match.id)) {
                        newSet.delete(match.id);
                      } else {
                        newSet.add(match.id);
                      }
                      setExpandedInsights(newSet);
                    }}
                    className="w-full flex items-center justify-between text-left text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Insights</span>
                    </div>
                    <span className="text-xs">
                      {expandedInsights.has(match.id) ? '▼' : '▶'}
                    </span>
                  </button>
                  
                  {/* Expanded AI Insights */}
                  {expandedInsights.has(match.id) && aiInsights[match.id] && (
                    <div className="mt-3 space-y-2 animate-slide-up">
                      {aiInsights[match.id].map((insight, i) => (
                        <div key={i} className={`bg-${insight.color}-50 rounded-lg p-3 border border-${insight.color}-100`}>
                          <div className="flex items-start gap-2">
                            {insight.icon === 'trending' && <TrendingUp className={`w-4 h-4 text-${insight.color}-600 mt-0.5 flex-shrink-0`} />}
                            {insight.icon === 'clock' && <Clock className={`w-4 h-4 text-${insight.color}-600 mt-0.5 flex-shrink-0`} />}
                            {insight.icon === 'shield' && <Shield className={`w-4 h-4 text-${insight.color}-600 mt-0.5 flex-shrink-0`} />}
                            <p className="text-sm text-gray-700">
                              <strong>{insight.title}:</strong> {insight.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => handleSend(match)}
                    disabled={selectedSpecialist === match.id}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {selectedSpecialist === match.id ? 'Sending...' : 'Send Secure Referral'}
                  </button>
                  <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SuggestionButton({ text }: { text: string }) {
  return (
    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200 hover:border-blue-300">
      {text}
    </button>
  );
}

function Insight({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5">{icon}</div>
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  );
}

