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

export default function Step5DidYou({
  onNext,
  onBack,
  onClose,
  updateUserResponse
}: StepProps) {
  
  const handleYes = () => {
    updateUserResponse('didYouSaveTime', true);
    onNext('step6-did-you');
  };

  const handleNo = () => {
    updateUserResponse('didYouSaveTime', false);
    onNext('step6-did-you');
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
        <div className="w-full h-32 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Did Migrate Mate save you time?
        </h3>
        <p className="text-gray-600 mb-6">
          Our users typically save 10-15 hours per migration project. 
          That's time you can spend on other important tasks.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleYes}
          className="w-full px-4 py-3 bg-[#8952fc] text-white rounded-lg hover:bg-[#7b40fc] transition-colors font-medium"
        >
          Yes, it saved me time
        </button>
        <button
          onClick={handleNo}
          className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          No, it didn't help much
        </button>
      </div>

      {/* Back Button */}
      <button
        onClick={() => onBack('step4-did-you')}
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
          <div className="w-2 h-2 bg-[#8952fc] rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">Step 5 of 11</p>
      </div>
    </div>
  );
}
