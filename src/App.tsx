import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import ReferralIntake from './components/ReferralIntake';
import MatchResults from './components/MatchResults';
import ReferralsDashboard from './components/ReferralsDashboard';
import type { SpecialistMatch, Referral, ExtractedReferralData } from './types';

type Tab = 'create' | 'results' | 'dashboard';

// Pre-loaded referrals at different stages
const initialReferrals: Referral[] = [
  {
    id: 'ref-001',
    patientName: 'Emily Rodriguez',
    patientCondition: 'Cystic Fibrosis',
    specialist: 'Dr. Lena Petrova, MD',
    specialty: 'Pulmonology',
    urgency: 'urgent',
    status: 'awaiting_visit',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    insurance: 'Blue Cross Blue Shield',
  },
  {
    id: 'ref-002',
    patientName: 'Michael Chen',
    patientCondition: "Huntington's Disease",
    specialist: 'Dr. Marcus Thorne, MD',
    specialty: 'Movement Disorders Neurology',
    urgency: 'routine',
    status: 'accepted',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    insurance: 'UnitedHealthcare',
  },
  {
    id: 'ref-003',
    patientName: 'Sarah Thompson',
    patientCondition: 'Osteoradionecrosis',
    specialist: 'Dr. Eleanor Vance, MD, PhD',
    specialty: 'Head & Neck Surgical Oncology',
    urgency: 'stat',
    status: 'sent',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    insurance: 'Aetna PPO',
  },
  {
    id: 'ref-004',
    patientName: 'David Martinez',
    patientCondition: 'Cystic Fibrosis',
    specialist: 'Dr. Aisha Khan, MD',
    specialty: 'Pediatric Pulmonology',
    urgency: 'routine',
    status: 'completed',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    lastUpdated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    insurance: 'Cigna',
  },
  {
    id: 'ref-005',
    patientName: 'Jessica Williams',
    patientCondition: 'Ehlers-Danlos Syndrome',
    specialist: 'Dr. Isabella Martinez, MD',
    specialty: 'Rheumatology',
    urgency: 'urgent',
    status: 'accepted',
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    insurance: 'Blue Cross Blue Shield',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const [extractedData, setExtractedData] = useState<ExtractedReferralData | null>(null);
  const [matches, setMatches] = useState<SpecialistMatch[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals);

  const handleReferralSubmit = (data: ExtractedReferralData, specialists: SpecialistMatch[]) => {
    setExtractedData(data);
    setMatches(specialists);
    setActiveTab('results');
  };

  const handleSendReferral = (specialist: SpecialistMatch) => {
    // Generate realistic patient names for demo
    const patientNames = ['Sarah Martinez', 'James Chen', 'Maria Rodriguez', 'David Thompson', 'Emily Wilson', 'Michael Brown', 'Jessica Lee', 'Robert Garcia'];
    const randomName = patientNames[Math.floor(Math.random() * patientNames.length)];
    
    const newReferral: Referral = {
      id: `ref-${Date.now()}`,
      patientName: randomName,
      patientCondition: extractedData?.condition || 'Not specified',
      specialist: specialist.name,
      specialty: specialist.specialty,
      urgency: extractedData?.urgency || 'routine',
      status: 'sent',
      createdAt: new Date(),
      lastUpdated: new Date(),
      insurance: extractedData?.insurance,
      notes: extractedData?.notes,
    };

    setReferrals([newReferral, ...referrals]);
    
    // Show success toast (handled by MatchResults component)
    setTimeout(() => {
      setActiveTab('dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AICliniMatch</h1>
                <p className="text-xs text-gray-500">Intelligent Referral Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 hidden sm:block">Dr. Anya Sharma</span>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-700">
                AS
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'create'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Create Referral
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'results'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              disabled={matches.length === 0}
            >
              AI Match Results
              {matches.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                  {matches.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Referrals
              {referrals.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gray-600 rounded-full">
                  {referrals.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'create' && <ReferralIntake onSubmit={handleReferralSubmit} />}
        {activeTab === 'results' && (
          <MatchResults 
            matches={matches} 
            extractedData={extractedData}
            onSendReferral={handleSendReferral}
          />
        )}
        {activeTab === 'dashboard' && <ReferralsDashboard referrals={referrals} />}
      </main>
    </div>
  );
}

export default App;

