'use client';

import React, { useState, useMemo } from 'react';
import { LeaveManagementProps } from '@/types';
import { Calendar, CheckCircle, Clock, XCircle, ChevronRight, X, FileText } from 'lucide-react';

const LeaveManagement: React.FC<LeaveManagementProps> = ({ data }) => {
  const [selectedLeaveId, setSelectedLeaveId] = useState<string | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: 'casual',
    fromDate: '',
    toDate: '',
    reason: '',
  });

  const selectedLeave = useMemo(
    () => data.applications.find((l) => l.id === selectedLeaveId) ?? null,
    [data.applications, selectedLeaveId],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Leave application submitted:', formData);
    setShowApplyModal(false);
    setFormData({ leaveType: 'casual', fromDate: '', toDate: '', reason: '' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'rejected':
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <Clock size={16} className="text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'casual':
        return 'bg-[#0A6E8A]/10 text-[#0A6E8A]';
      case 'medical':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-amber-50 text-amber-700';
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="heading-lg">Leave Management</h2>
            <p className="body-text">Apply and track your leave applications</p>
          </div>
          <button 
            onClick={() => setShowApplyModal(true)}
            className="hover:opacity-90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            style={{ backgroundColor: '#0A6E8A' }}
          >
            Apply Leave
          </button>
        </div>

        {/* Leave Balance Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {data.balances.map((balance) => (
            <div key={balance.type} className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-sm transition-all">
              <div className="text-xs font-semibold text-gray-600 mb-2">{balance.label}</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-xl font-bold text-gray-900">{balance.remaining}</span>
                <span className="text-xs text-gray-500">/ {balance.total}</span>
              </div>
              <div className="text-xs text-gray-500">Used: {balance.used}</div>
            </div>
          ))}
        </div>

        {/* Recent Leave Applications */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <h3 className="heading-sm mb-3">Recent Applications</h3>
          <div className="flex-1 overflow-y-auto space-y-2">
            {data.applications.map((application) => (
              <button
                key={application.id}
                type="button"
                onClick={() => setSelectedLeaveId(application.id)}
                className="w-full text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-3 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-start gap-2 min-w-0 flex-1">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-xs ${getLeaveTypeColor(application.type)}`}>
                      {application.type.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-gray-900 truncate group-hover:text-[#0A6E8A] transition-colors">
                        {application.dateRange}
                      </div>
                      <div className="text-xs text-gray-600 line-clamp-1">{application.reason}</div>
                    </div>
                  </div>
                  <div className={`flex-shrink-0 border rounded-lg px-2 py-1 text-xs font-semibold flex items-center gap-1 ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    <span className="capitalize">{application.status}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>{application.duration} days</span>
                  <span>{application.appliedDate}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setShowApplyModal(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <div className="relative w-[92%] max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0A6E8A] to-[#0a5d75] px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Apply for Leave</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Leave Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Leave Type</label>
                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A6E8A] focus:ring-2 focus:ring-[#0A6E8A]/20 transition-colors bg-white text-gray-900"
                >
                  <option value="casual">Casual Leave</option>
                  <option value="medical">Medical Leave</option>
                  <option value="earned">Earned Leave</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">From Date</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A6E8A] focus:ring-2 focus:ring-[#0A6E8A]/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">To Date</label>
                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A6E8A] focus:ring-2 focus:ring-[#0A6E8A]/20 transition-colors"
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Reason</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Enter reason for leave..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0A6E8A] focus:ring-2 focus:ring-[#0A6E8A]/20 transition-colors resize-none h-24 text-gray-900"
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#0A6E8A] hover:bg-[#085a70] text-white font-semibold rounded-lg transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveManagement;
