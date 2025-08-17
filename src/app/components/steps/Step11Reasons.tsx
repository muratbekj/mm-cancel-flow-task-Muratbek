'use client';

import { useState } from 'react';
import { CancellationStep, FlowState, UserData, SubscriptionData } from '../CancellationFlow';

interface StepProps {
  onNext: (step: CancellationStep) => void;
  onBack: (step: CancellationStep) => void;
  onClose: () => void;
  updateUserResponse: (key: string, value: any) => void;
  userData: UserData;
  subscriptionData: SubscriptionData;
  flowState: FlowState;
  isProcessing: boolean;
  onComplete: () => void;
}

const cancellationReasons = [
  { id: 'too_expensive', label: 'Too expensive' },
  { id: 'not_using', label: 'Not using it enough' },
  { id: 'missing_features', label: 'Missing features I need' },
  { id: 'switching_services', label: 'Switching to another service' },
  { id: 'technical_issues', label: 'Technical issues' },
  { id: 'customer_service', label: 'Poor customer service' },
  { id: 'no_longer_needed', label: 'No longer needed' },
  { id: 'other', label: 'Other' }
];

export default function Step11Reasons({
  onBack,
  onClose,
  updateUserResponse,
  isProcessing,
  onComplete
}: StepProps) {
  
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState('');

  const handleReasonToggle = (reasonId: string) => {
    setSelectedReasons(prev => 
      prev.includes(reasonId) 
        ? prev.filter(id => id !== reasonId)
        : [...prev, reasonId]
    );
  };

  const handleSubmit = () => {
    const reasons = selectedReasons.includes('other') 
      ? [...selectedReasons.filter(r => r !== 'other'), otherReason]
      : selectedReasons;
    
    updateUserResponse('cancellationReasons', reasons);
    onComplete();
  };

  const canSubmit = selectedReasons.length > 0 && 
    (!selectedReasons.includes('other') || otherReason.trim().length > 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Help us improve</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Hero Image */}
      <div className="mb-6">
        <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Why are you cancelling?
        </h3>
        <p className="text-gray-600 mb-6">
          Your feedback helps us improve our service. Please select all that apply.
        </p>
      </div>

      {/* Reason Selection */}
      <div className="space-y-3 mb-6">
        {cancellationReasons.map((reason) => (
          <label key={reason.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedReasons.includes(reason.id)}
              onChange={() => handleReasonToggle(reason.id)}
              className="w-4 h-4 text-[#8952fc] border-gray-300 rounded focus:ring-[#8952fc]"
            />
            <span className="ml-3 text-sm font-medium text-gray-900">{reason.label}</span>
          </label>
        ))}
      </div>

      {/* Other Reason Input */}
      {selectedReasons.includes('other') && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Please specify:
          </label>
          <textarea
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            placeholder="Tell us more about why you're cancelling..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#8952fc] focus:border-[#8952fc] resize-none"
            rows={3}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isProcessing}
          className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Complete Cancellation'}
        </button>
        <button
          onClick={() => onBack('step10-end')}
          className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Back
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="mt-8">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-[#8952fc] rounded-full"></div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">Step 11 of 11</p>
      </div>
    </div>
  );
}
