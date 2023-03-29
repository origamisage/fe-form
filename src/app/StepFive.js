"use client";

import Image from "next/image";
import React from "react";
import FormHeader from "./FormHeader";

function StepFive() {
  return (
    <div className="flex h-full items-center">
      <div className="mx-auto w-full max-w-lg text-center">
        <Image
          src="./images/icon-thank-you.svg"
          height={58}
          width={58}
          alt="Follow us on Twitter"
          className="mx-auto mb-6 sm:mb-9 sm:h-[82px] sm:w-[82px]"
        />
        <FormHeader
          title="Thank you!"
          description="Thanks for confirming your subscription! We hope you have
          fun using our platform. If you ever need support, please feel
          free to email us at support@loremgaming.com"
        />
      </div>
    </div>
  );
}

export default StepFive;
