"use client";
import React, { useSyncExternalStore } from "react";
import { Field, Form } from "houseform";
import { z } from "zod";
import * as Checkbox from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import useStore from "./useStore";
import FormHeader from "./FormHeader";
import BottomNav from "./BottomNav";

const addOns = [
  {
    id: "onlineService",
    title: "Online service",
    description: "Access to multiplayer games",
    priceMonthly: "+$1/mo",
    priceYearly: "+$10/yr",
  },
  {
    id: "largerStorage",
    title: "Larger storage",
    description: "Extra 1TB of cloud saves",
    priceMonthly: "+$2/mo",
    priceYearly: "+$20/yr",
  },
  {
    id: "customizableProfile",
    title: "Customizable profile",
    description: "Custom theme on your profile",
    priceMonthly: "+$2/mo",
    priceYearly: "+$20/yr",
  },
];

function StepThree({ goForward, goBack }) {
  const billing = useStore((state) => state.billing);
  const addOnsFromStore = useStore((state) => state.addOns);
  const changeAddOns = useStore((state) => state.changeAddOns);

  function onSubmit(values) {
    console.log(values);
    const addOns = Object.keys(values).filter((key) => values[key]);
    console.log(addOns);
    changeAddOns(addOns);
    goForward();
  }

  return (
    <>
      <FormHeader
        title="Pick add-ons"
        description="Add-ons help enhance your gaming experience."
      />
      <Form onSubmit={onSubmit}>
        {({ isValid, submit }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <div className="mb-6 space-y-3">
              {addOns.map(
                ({ id, title, description, priceMonthly, priceYearly }) => (
                  <FormCheckbox
                    key={title}
                    name={id}
                    initialValue={addOnsFromStore.includes(id)}
                    title={title}
                    description={description}
                    price={`${
                      billing === "monthly" ? priceMonthly : priceYearly
                    }`}
                  />
                )
              )}
            </div>
            <BottomNav goBack={goBack} withBackButton />
          </form>
        )}
      </Form>
    </>
  );
}

function FormCheckbox({ name, initialValue, title, description, price }) {
  return (
    <Field name={name} initialValue={initialValue}>
      {({ value, setValue, onBlur }) => (
        <label
          className={clsx(
            "flex cursor-pointer items-center gap-5 rounded-lg border bg-alabaster px-4 py-3 sm:gap-6 sm:px-6 sm:py-4",
            value
              ? "border-blue-purplish bg-alabaster"
              : "border-gray-light bg-white",
            "focus-within:border-blue-purplish hover:border-blue-purplish"
          )}
          htmlFor={name}
        >
          <Checkbox.Root
            id={name}
            onCheckedChange={(e) => setValue(!value)}
            checked={value}
            className={clsx(
              "grid h-5 w-5 place-content-center rounded-[4px] border-black",
              "radix-state-checked:bg-blue-purplish radix-state-unchecked:border radix-state-unchecked:border-gray-light radix-state-unchecked:bg-white",
              // "focus:outline-none focus-visible:ring focus-visible:ring-blue-purplish focus-visible:ring-opacity-75"
              "focus:outline-none"
              // "group-focus-visible:ring group-focus-visible:ring-blue-purplish group-focus-visible:ring-opacity-50"
            )}
          >
            <Checkbox.Indicator>
              <CheckIcon
                className={clsx("h-4 w-4 stroke-white stroke-[3px]")}
              />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <div className="mr-auto flex flex-col">
            <span className="select-none text-[14px] font-medium text-blue-marine sm:text-base">
              {title}
            </span>
            <span className="select-none text-[12px] text-gray-cool sm:text-[14px]">
              {description}
            </span>
          </div>
          <span className="select-none text-[13px] text-blue-purplish sm:text-[15px]">
            {price}
          </span>
        </label>
      )}
    </Field>
  );
}

export default StepThree;
