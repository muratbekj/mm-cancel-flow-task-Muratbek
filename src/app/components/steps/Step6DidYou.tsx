'use client';

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
}

export default function Step6DidYou({
  onNext,
  onBack,
  onClose,
  updateUserResponse
}: StepProps) {
  
  const handleYes = () => {
    updateUserResponse('didYouConsiderAlternatives', true);
    onNext('step7-offer');
  };

  const handleNo = () => {
    updateUserResponse('didYouConsiderAlternatives', false);
    onNext('step7-offer');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Cancel Subscription</h2>
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
        <div className="w-full h-32 bg-gradient-to-r from-teal-500 to-green-600 rounded-lg flex items-center justify-center">
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Did you consider our other plans?
        </h3>
        <p className="text-gray-600 mb-6">
          We offer different subscription tiers that might better fit your needs. 
          You can also pause your subscription instead of canceling.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleYes}
          className="w-full px-4 py-3 bg-[#8952fc] text-white rounded-lg hover:bg-[#7b40fc] transition-colors font-medium"
        >
          Yes, I looked at other options
        </button>
        <button
          onClick={handleNo}
          className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          No, I want to cancel
        </button>
      </div>

      {/* Back Button */}
      <button
        onClick={() => onBack('step5-did-you')}
        className="w-full px-4 py-3 mt-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
      >
        Back
      </button>

      {/* Progress Indicator */}
      <div className="mt-8">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-[#8952fc] rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">Step 6 of 11</p>
      </div>
    </div>
  );
}
