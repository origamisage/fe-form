"use client";
import clsx from "clsx";
import React from "react";
import FormHeader from "./FormHeader";
import useStore from "./useStore";
import Button from "./Button";
import BottomNav from "./BottomNav";

const planPrices = {
  arcade: {
    name: "Arcade",
    monthly: 9,
    yearly: 90,
  },
  advanced: {
    name: "Advanced",
    monthly: 12,
    yearly: 120,
  },
  pro: {
    name: "Pro",
    monthly: 15,
    yearly: 150,
  },
};

const addOnsPrices = {
  onlineService: {
    name: "Online service",
    monthly: 1,
    yearly: 10,
  },
  largerStorage: {
    name: "Larger storage",
    monthly: 2,
    yearly: 20,
  },
  customizableProfile: {
    name: "Customizable profile",
    monthly: 2,
    yearly: 20,
  },
};

function StepFour({ goForward, goBack }) {
  const plan = useStore((state) => state.plan);
  const billing = useStore((state) => state.billing);
  const addOns = useStore((state) => state.addOns);

  function total() {
    let total = planPrices[plan][billing];
    addOns.forEach((addOn) => {
      total += addOnsPrices[addOn][billing];
    });
    return `+$${total}/${billing === "monthly" ? "mo" : "yr"}`;
  }

  return (
    <>
      <FormHeader
        title="Finishing up"
        description="Double-check everything looks OK before confirming."
      />
      <div className="divide-y-[1px] divide-gray-light rounded-lg bg-alabaster py-5 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="pb-2.5 sm:pb-5">
            <h1 className="select-none text-[14px] font-medium leading-3 text-blue-marine sm:text-base">
              {`${planPrices[plan].name} (${capitalizeFirst(billing)})`}
            </h1>
            <button className="text-[14px] text-gray-cool underline decoration-2 hover:text-blue-purplish sm:text-[14px]">
              Change
            </button>
          </div>
          <span className="text-[14px] font-bold text-blue-marine sm:text-base">
            {`+$${planPrices[plan][billing]}/${
              billing === "monthly" ? "mo" : "yr"
            }`}
          </span>
        </div>
        <div className="space-y-2.5 pt-2.5 sm:pt-5">
          {addOns.map((addOn) => (
            <div key={addOn} className="flex justify-between">
              <span className="text-[14px] text-gray-cool">
                {addOnsPrices[addOn].name}
              </span>
              <span className="text-[14px] text-blue-marine">
                {`+$${addOnsPrices[addOn][billing]}/${
                  billing === "monthly" ? "mo" : "yr"
                }`}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-between px-4 sm:px-6">
        <span className="text-[14px] text-gray-cool">{`Total (per ${
          billing === "monthly" ? "month" : "year"
        })`}</span>
        <span className="font-bold text-blue-purplish sm:text-xl">
          {total()}
        </span>
      </div>
      <BottomNav goBack={goBack} goForward={goForward} withBackButton={true} />
    </>
  );
}

export default StepFour;

function capitalizeFirst(word) {
  return word.replace(/^\w/, (c) => c.toUpperCase());
}
