"use client";

import React, { useState } from "react";

export default function useMultiForm(first = 1, numSteps) {
  const [currentStep, setCurrentStep] = useState(first);

  const goForward = () => {
    if (numSteps === currentStep) {
      return;
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep === first) {
      return;
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  return {
    currentStep,
    goForward,
    goBack,
    goToStep,
  };
}
