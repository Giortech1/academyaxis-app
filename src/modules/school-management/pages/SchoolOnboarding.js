import React, { useState } from 'react';
import { SchoolBasicInfo } from '../components/SchoolBasicInfo';
import { SchoolCustomization } from '../components/SchoolCustomization';
import { SchoolIntegrations } from '../components/SchoolIntegrations';
import { SchoolService } from '../services/SchoolService';

export const SchoolOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [schoolData, setSchoolData] = useState({
    basicInfo: {},
    customization: {},
    integrations: {}
  });

  const handleStepComplete = (stepData) => {
    const step = getCurrentStepKey();
    setSchoolData(prev => ({
      ...prev,
      [step]: stepData
    }));
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - create school
      handleSchoolCreation();
    }
  };

  const handleSchoolCreation = async () => {
    try {
      const newSchool = await SchoolService.createSchool(schoolData);
      // Redirect to school dashboard
      window.location.href = `/school/${newSchool.id}/dashboard`;
    } catch (error) {
      console.error('Failed to create school:', error);
    }
  };

  const getCurrentStepKey = () => {
    const steps = ['basicInfo', 'customization', 'integrations'];
    return steps[currentStep - 1];
  };

  return (
    <div className="school-onboarding">
      <div className="onboarding-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
        <div className="step-labels">
          <span className={currentStep >= 1 ? 'active' : ''}>Informations de base</span>
          <span className={currentStep >= 2 ? 'active' : ''}>Personnalisation</span>
          <span className={currentStep >= 3 ? 'active' : ''}>Intégrations</span>
        </div>
      </div>

      <div className="onboarding-content">
        {currentStep === 1 && (
          <SchoolBasicInfo 
            onComplete={handleStepComplete}
            initialData={schoolData.basicInfo}
          />
        )}
        {currentStep === 2 && (
          <SchoolCustomization 
            onComplete={handleStepComplete}
            initialData={schoolData.customization}
            schoolBasicInfo={schoolData.basicInfo}
          />
        )}
        {currentStep === 3 && (
          <SchoolIntegrations 
            onComplete={handleStepComplete}
            initialData={schoolData.integrations}
            schoolData={schoolData}
          />
        )}
      </div>
    </div>
  );
};