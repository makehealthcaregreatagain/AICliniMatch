import { useState } from 'react';
import { Activity, CheckCircle, Clock, XCircle, Filter, TrendingUp, Calendar } from 'lucide-react';
import type { Referral, ReferralStatus } from '../types';

interface Props {
  referrals: Referral[];
}

const statusConfig = {
  sent: { label: 'Sent', color: 'blue', icon: Clock },
  accepted: { label: 'Accepted', color: 'green', icon: CheckCircle },
  awaiting_visit: { label: 'Awaiting Visit', color: 'yellow', icon: Calendar },
  completed: { label: 'Completed', color: 'gray', icon: CheckCircle },
  declined: { label: 'Declined', color: 'red', icon: XCircle },
};

const urgencyColors = {
  routine: 'bg-gray-100 text-gray-700 border-gray-300',
  urgent: 'bg-orange-100 text-orange-700 border-orange-300',
  stat: 'bg-red-100 text-red-700 border-red-300',
};

export default function ReferralsDashboard({ referrals }: Props) {
  const [filterStatus, setFilterStatus] = useState<ReferralStatus | 'all'>('all');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');

  const filteredReferrals = referrals.filter((ref) => {
    if (filterStatus !== 'all' && ref.status !== filterStatus) return false;
    if (filterSpecialty !== 'all' && ref.specialty !== filterSpecialty) return false;
    return true;
  });

  const activeCount = referrals.filter((r) => r.status === 'sent' || r.status === 'accepted').length;
  const completedThisMonth = referrals.filter((r) => {
    const now = new Date();
    const refDate = new Date(r.createdAt);
    return r.status === 'completed' && refDate.getMonth() === now.getMonth();
  }).length;

  const specialties = Array.from(new Set(referrals.map((r) => r.specialty)));

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Referrals</h2>
        <p className="text-gray-600">Track and manage all your patient referrals in one place.</p>
      </div>

      {/* AI Assistant Notifications */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-gray-900">AI Assistant Updates</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-blue-100">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <strong className="text-green-700">Dr. Marcus Thorne</strong> replied to your email about Michael Chen's case
              </p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-blue-100">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <strong className="text-orange-700">Dr. Eleanor Vance</strong> requested additional imaging for Sarah Thompson
              </p>
              <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-blue-100">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <strong className="text-blue-700">Dr. Lena Petrova</strong> scheduled Emily Rodriguez for next Tuesday at 2:00 PM
              </p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <MetricCard
          icon={<Activity className="w-6 h-6 text-blue-600" />}
          label="Active Referrals"
          value={activeCount}
          bgColor="bg-blue-50"
          borderColor="border-blue-200"
        />
        <MetricCard
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          label="Completed This Month"
          value={completedThisMonth}
          bgColor="bg-green-50"
          borderColor="border-green-200"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as ReferralStatus | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="awaiting_visit">Awaiting Visit</option>
            <option value="completed">Completed</option>
            <option value="declined">Declined</option>
          </select>

          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>

          {(filterStatus !== 'all' || filterSpecialty !== 'all') && (
            <button
              onClick={() => {
                setFilterStatus('all');
                setFilterSpecialty('all');
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Referrals Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredReferrals.length === 0 ? (
          <div className="p-12 text-center">
            <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Referrals Found</h3>
            <p className="text-gray-600">
              {referrals.length === 0
                ? 'Create your first referral to get started.'
                : 'No referrals match your current filters.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialist
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Urgency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReferrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{referral.patientName}</div>
                        <div className="text-xs text-gray-500">{referral.patientCondition}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{referral.specialist}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{referral.specialty}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          urgencyColors[referral.urgency]
                        }`}
                      >
                        {referral.urgency.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={referral.status} />
                    </td>
                    <td className="px-6 py-4">
                      <ProgressTracker status={referral.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(referral.lastUpdated)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  bgColor,
  borderColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <div className={`${bgColor} border ${borderColor} rounded-xl p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ReferralStatus }) {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
    red: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
        colorClasses[config.color]
      }`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

function ProgressTracker({ status }: { status: ReferralStatus }) {
  const steps = ['sent', 'accepted', 'awaiting_visit', 'completed'];
  const currentIndex = steps.indexOf(status);
  
  // Handle declined status
  if (status === 'declined') {
    return (
      <div className="flex items-center gap-1">
        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
          <XCircle className="w-4 h-4 text-white" />
        </div>
        <div className="text-xs text-red-600 font-medium ml-1">Declined</div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, idx) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              idx <= currentIndex
                ? 'bg-green-500'
                : 'bg-gray-200'
            }`}
          >
            {idx <= currentIndex && <CheckCircle className="w-4 h-4 text-white" />}
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 ${
                idx < currentIndex ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function formatDate(date: Date): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

