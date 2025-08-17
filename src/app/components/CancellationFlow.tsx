'use client';

import { useState, useEffect } from 'react';
import Step1NoHelp from './steps/Step1NoHelp';
import Step2HelpWith from './steps/Step2HelpWith';
import Step3DidYou from './steps/Step3DidYou';
import Step4DidYou from './steps/Step4DidYou';
import Step5DidYou from './steps/Step5DidYou';
import Step6DidYou from './steps/Step6DidYou';
import Step7Offer from './steps/Step7Offer';
import Step8OfferDetails from './steps/Step8OfferDetails';
import Step9Error from './steps/Step9Error';
import Step10End from './steps/Step10End';
import Step11Reasons from './steps/Step11Reasons';

export interface UserData {
  email: string;
  id: string;
}

export interface SubscriptionData {
  status: string;
  isTrialSubscription: boolean;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: string;
  monthlyPrice: number;
  isUCStudent: boolean;
  hasManagedAccess: boolean;
  managedOrganization: string | null;
  downsellAccepted: boolean;
}

interface CancellationFlowProps {
  onClose: () => void;
  userData: UserData;
  subscriptionData: SubscriptionData;
}

export type CancellationStep = 
  | 'step1-no-help'
  | 'step2-help-with'
  | 'step3-did-you'
  | 'step4-did-you'
  | 'step5-did-you'
  | 'step6-did-you'
  | 'step7-offer'
  | 'step8-offer-details'
  | 'step9-error'
  | 'step10-end'
  | 'step11-reasons';

export interface FlowState {
  currentStep: CancellationStep;
  downsellVariant: 'A' | 'B' | null;
  userResponses: Record<string, any>;
  errorMessage: string | null;
  isProcessing: boolean;
}

export default function CancellationFlow({ onClose, userData, subscriptionData }: CancellationFlowProps) {
  const [flowState, setFlowState] = useState<FlowState>({
    currentStep: 'step1-no-help',
    downsellVariant: null,
    userResponses: {},
    errorMessage: null,
    isProcessing: false
  });

  // Initialize A/B test variant on first load
  useEffect(() => {
    if (!flowState.downsellVariant) {
      // Deterministic A/B test based on user ID
      const userHash = userData.id.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      const variant = Math.abs(userHash) % 2 === 0 ? 'A' : 'B';
      
      setFlowState(prev => ({
        ...prev,
        downsellVariant: variant
      }));
    }
  }, [userData.id, flowState.downsellVariant]);

  const goToStep = (step: CancellationStep) => {
    setFlowState(prev => ({
      ...prev,
      currentStep: step,
      errorMessage: null
    }));
  };

  const updateUserResponse = (key: string, value: any) => {
    setFlowState(prev => ({
      ...prev,
      userResponses: {
        ...prev.userResponses,
        [key]: value
      }
    }));
  };

  const handleComplete = async () => {
    setFlowState(prev => ({ ...prev, isProcessing: true }));
    
    try {
      // TODO: Save cancellation data to database
      console.log('Cancellation completed:', {
        userData,
        subscriptionData,
        flowState
      });
      
      // Close the modal
      onClose();
    } catch (error) {
      setFlowState(prev => ({
        ...prev,
        errorMessage: 'Failed to process cancellation. Please try again.',
        isProcessing: false
      }));
    }
  };

  const renderCurrentStep = () => {
    const commonProps = {
      onNext: goToStep,
      onBack: goToStep,
      onClose,
      updateUserResponse,
      userData,
      subscriptionData,
      flowState,
      isProcessing: flowState.isProcessing
    };

    switch (flowState.currentStep) {
      case 'step1-no-help':
        return <Step1NoHelp {...commonProps} />;
      case 'step2-help-with':
        return <Step2HelpWith {...commonProps} />;
      case 'step3-did-you':
        return <Step3DidYou {...commonProps} />;
      case 'step4-did-you':
        return <Step4DidYou {...commonProps} />;
      case 'step5-did-you':
        return <Step5DidYou {...commonProps} />;
      case 'step6-did-you':
        return <Step6DidYou {...commonProps} />;
      case 'step7-offer':
        return <Step7Offer {...commonProps} />;
      case 'step8-offer-details':
        return <Step8OfferDetails {...commonProps} />;
      case 'step9-error':
        return <Step9Error {...commonProps} />;
      case 'step10-end':
        return <Step10End {...commonProps} />;
      case 'step11-reasons':
        return <Step11Reasons {...commonProps} onComplete={handleComplete} />;
      default:
        return <Step1NoHelp {...commonProps} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {renderCurrentStep()}
      </div>
    </div>
  );
}
