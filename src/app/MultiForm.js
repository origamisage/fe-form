"use client";
import React from "react";
import useMultiForm from "./useMultiForm";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import Image from "next/image";
import clsx from "clsx";
import BottomNav from "./BottomNav";

function MultiForm() {
  const { currentStep, goForward, goBack, goToStep } = useMultiForm(1, 5);

  const formSteps = [
    {
      title: "STEP 1",
      description: "YOUR INFO",
    },
    {
      title: "STEP 2",
      description: "SELECT PLAN",
    },
    {
      title: "STEP 3",
      description: "ADD-ONS",
    },
    {
      title: "STEP 4",
      description: "SUMMARY",
    },
  ];

  return (
    <div className=" w-full sm:flex  sm:h-[600px] sm:max-w-[944px] sm:gap-[18px] sm:bg-white sm:p-[18px] md:rounded-xl">
      {/* Mobile NAV */}
      <div className="sm:hidden">
        <Image
          src="/images/bg-sidebar-mobile.svg"
          alt="Backgrounf mobile"
          width={100}
          height={100}
          className="fixed w-full"
        />
        <div className="relative flex justify-center gap-4 p-[34px]">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className={clsx(
                  "grid h-[34px] w-[34px] place-items-center rounded-full text-[15px] font-medium",
                  currentStep === i + 1 || (currentStep === 5 && i === 3)
                    ? "bg-blue-light text-blue-marine"
                    : "border border-white text-white"
                )}
              >
                {i + 1}
              </div>
            ))}
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="relative hidden @container-normal sm:block md:basis-64">
        <Image
          src="/images/bg-sidebar-desktop.svg"
          alt="Backgrounf mobile"
          fill
          className="rounded-xl object-cover"
        />
        <div className="relative flex flex-col gap-4 px-8 py-9">
          {formSteps.map(({ title, description }, i) => (
            <div key={i} className="flex items-center gap-4">
              <div
                className={clsx(
                  "grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full text-[15px] font-medium",
                  currentStep === i + 1 || (currentStep === 5 && i === 3)
                    ? "bg-blue-light text-blue-marine"
                    : "border border-white text-white"
                )}
              >
                {i + 1}
              </div>
              <div className="hidden md:flex md:flex-col">
                <span className="text-[13px] text-gray-cool">{title}</span>
                <span className="text-[14px] font-medium leading-4 text-white">
                  {description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-4 rounded-xl bg-white px-6 py-8 sm:w-full md:m-0 md:mx-auto md:max-w-md md:py-10 md:px-0">
        {currentStep === 1 && <StepOne goForward={goForward} />}
        {currentStep === 2 && <StepTwo goForward={goForward} goBack={goBack} />}
        {currentStep === 3 && (
          <StepThree goForward={goForward} goBack={goBack} />
        )}
        {currentStep === 4 && (
          <StepFour goForward={goForward} goBack={goBack} />
        )}
        {currentStep === 5 && <StepFive />}
      </div>
    </div>
  );
}

export default MultiForm;
