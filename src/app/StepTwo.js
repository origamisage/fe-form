"use client";
import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import FormInput from "./FormInput";
import Button from "./Button";
import { RadioGroup, Switch } from "@headlessui/react";
import Image from "next/image";
import useStore from "./useStore";
import FormHeader from "./FormHeader";
import BottomNav from "./BottomNav";
// import FormInput from "./FormInput";

const plans = [
  {
    id: "arcade",
    plan: "Arcade",
    monthly: "$9/mo",
    yearly: "$90/yr",
    discount: "2 months free",
    iconURL: "/images/icon-arcade.svg",
  },
  {
    id: "advanced",
    plan: "Advanced",
    monthly: "$12/mo",
    yearly: "$120/yr",
    discount: "2 months free",
    iconURL: "/images/icon-advanced.svg",
  },
  {
    id: "pro",
    plan: "Pro",
    monthly: "$15/mo",
    yearly: "$150/yr",
    discount: "2 months free",
    iconURL: "/images/icon-pro.svg",
  },
];

// const schema = z.object({
//   name: z.string().min(1, "This field is required").max(100),
//   email: z.string().min(1, "This field is required").email("Invalid email"),
//   phone: z
//     .string()
//     .min(1, "This field is required")
//     .regex(phoneRegex, "Invalid phone number"),
// });

function StepTwo({ goForward, goBack }) {
  const plan = useStore((state) => state.plan);
  const changePlan = useStore((state) => state.changePlan);
  const billingFromStore = useStore((state) => state.billing);
  const changeBilling = useStore((state) => state.changeBilling);

  const [toggleBilling, setToggleBilling] = useState(
    billingFromStore === "yearly"
  );
  const billing = toggleBilling ? "yearly" : "monthly";

  const { control, handleSubmit } = useForm({
    defaultValues: {
      plan: plan,
    },
  });

  function onSubmit(data) {
    // console.log(billing);
    const newData = { ...data, billing: billing };
    const { plan } = data;
    console.log(data, billing);
    // console.log(data);
    changePlan(plan);
    changeBilling(billing);
    goForward();
  }

  return (
    <>
      <FormHeader
        title="Select your plan"
        description="You have the option of monthly or yearly billing."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <input {...register("plan")} type="radio" value="Arcade" />
        <input {...register("plan")} type="radio" value="Advanced" />
        <input {...register("plan")} type="radio" value="Pro" /> */}
        <Controller
          name="plan"
          control={control}
          render={({ field }) => (
            <div className="@container">
              <RadioGroup defaultValue={plan} {...field}>
                <RadioGroup.Label className="sr-only">
                  Billing plan
                </RadioGroup.Label>
                <div className="mb-6 grid gap-3 @md:mb-8 @md:grid-cols-3 @md:gap-4">
                  {plans.map(
                    ({ id, iconURL, plan, monthly, yearly, discount }) => (
                      <RadioGroup.Option
                        key={plan}
                        value={id}
                        className={({ active, checked }) =>
                          clsx(
                            "flex cursor-pointer items-start gap-4 rounded-lg border p-[14px] @md:flex-col",
                            checked
                              ? "border-blue-purplish bg-alabaster"
                              : "border-gray-light",
                            "hover:border-blue-purplish focus:border-blue-purplish focus:outline-none"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <Image
                              src={iconURL}
                              height={40}
                              width={40}
                              alt="Follow us on Twitter"
                              className="mt-0.5 @md:mb-5 @md:mt-1"
                            />
                            <div className="flex flex-col gap-0.5">
                              <h1
                                className="font-medium
                     text-blue-marine"
                              >
                                {plan}
                              </h1>
                              {billing === "monthly" && (
                                <span className="text-[14px] text-gray-cool">
                                  {monthly}
                                </span>
                              )}
                              {billing === "yearly" && (
                                <span className="text-[14px] text-gray-cool">
                                  {yearly}
                                </span>
                              )}
                              {billing === "yearly" && (
                                <span className="text-[12px] text-blue-marine">
                                  {discount}
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    )
                  )}
                </div>
              </RadioGroup>
            </div>
          )}
        />
        <div className="flex items-center justify-center gap-6 rounded-lg bg-alabaster py-3">
          <span
            className={clsx(
              "text-[14px] font-medium transition-colors",
              billing === "monthly" ? "text-blue-marine" : "text-gray-cool"
            )}
          >
            Monthly
          </span>
          <Switch
            checked={toggleBilling}
            onChange={setToggleBilling}
            className={clsx(
              "relative inline-flex h-5 w-[36px] items-center rounded-full bg-blue-marine p-1"
            )}
          >
            <span className="sr-only">Choose monthly or yearly plan</span>
            <span
              aria-hidden="true"
              className={clsx(
                "h-3 w-3 rounded-full bg-white transition-all duration-200 ease-out",
                billing === "monthly" ? "translate-x-0" : "translate-x-[16px]"
              )}
            />
          </Switch>
          <span
            className={clsx(
              "text-[14px] font-medium transition-colors",
              billing === "yearly" ? "text-blue-marine" : "text-gray-cool"
            )}
          >
            Yearly
          </span>
        </div>
        <BottomNav goBack={goBack} withBackButton />
      </form>
    </>
  );
}

export default StepTwo;
