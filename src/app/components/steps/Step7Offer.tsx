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

export default function Step7Offer({
  onNext,
  onBack,
  onClose,
  updateUserResponse,
  subscriptionData,
  flowState
}: StepProps) {
  
  // A/B Testing Logic
  const isVariantB = flowState.downsellVariant === 'B';
  
  // Calculate discounted price
  const originalPrice = subscriptionData.monthlyPrice;
  const discountedPrice = originalPrice - 1000; // $10 off (1000 cents)
  
  const handleAcceptOffer = () => {
    updateUserResponse('acceptedDownsell', true);
    updateUserResponse('downsellVariant', flowState.downsellVariant);
    // TODO: Process the discount and return to profile
    onClose();
  };

  const handleDeclineOffer = () => {
    updateUserResponse('acceptedDownsell', false);
    updateUserResponse('downsellVariant', flowState.downsellVariant);
    onNext('step8-offer-details');
  };

  const handleSkipOffer = () => {
    updateUserResponse('acceptedDownsell', false);
    updateUserResponse('downsellVariant', flowState.downsellVariant);
    onNext('step8-offer-details');
  };

  // Variant A: No downsell screen - skip to next step
  if (!isVariantB) {
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
          <div className="w-full h-32 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            We're sorry to see you go
          </h3>
          <p className="text-gray-600 mb-6">
            Your feedback helps us improve. Let's continue with the cancellation process.
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSkipOffer}
          className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Continue with cancellation
        </button>

        {/* Back Button */}
        <button
          onClick={() => onBack('step6-did-you')}
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
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-[#8952fc] rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">Step 7 of 11</p>
        </div>
      </div>
    );
  }

  // Variant B: Show $10 off offer
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Special Offer</h2>
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
        <div className="w-full h-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Wait! We have a special offer for you
        </h3>
        <p className="text-gray-600 mb-6">
          Stay with us and get <strong>$10 off</strong> your next month. 
          That's just ${(discountedPrice / 100).toFixed(2)} instead of ${(originalPrice / 100).toFixed(2)}.
        </p>
        
        {/* Price Display */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl font-bold text-green-600">${(discountedPrice / 100).toFixed(2)}</span>
            <span className="text-lg text-gray-500 line-through">${(originalPrice / 100).toFixed(2)}</span>
            <span className="text-sm text-green-600 font-medium">($10 off)</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAcceptOffer}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Accept $10 off offer
        </button>
        <button
          onClick={handleDeclineOffer}
          className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          No thanks, continue with cancellation
        </button>
      </div>

      {/* Back Button */}
      <button
        onClick={() => onBack('step6-did-you')}
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
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-[#8952fc] rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">Step 7 of 11</p>
      </div>
    </div>
  );
}
