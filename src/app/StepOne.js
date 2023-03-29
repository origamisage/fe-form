"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Button from "./Button";
import useStore from "./useStore";
import FormHeader from "./FormHeader";
import { forwardRef } from "react";
import { ErrorMessage } from "@hookform/error-message";
import BottomNav from "./BottomNav";

// import FormInput from "./FormInput";

const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = z.object({
  name: z.string().min(1, "This field is required").max(100),
  email: z.string().min(1, "This field is required").email("Invalid email"),
  phone: z
    .string()
    .min(1, "This field is required")
    .regex(phoneRegex, "Invalid phone number"),
});

function StepOne({ goForward }) {
  const changeName = useStore((state) => state.changeName);
  const changeEmail = useStore((state) => state.changeEmail);
  const changePhone = useStore((state) => state.changePhone);
  const name = useStore((state) => state.name);
  const email = useStore((state) => state.email);
  const phone = useStore((state) => state.phone);

  function onSubmit(data) {
    const { name, email, phone } = data;
    console.log(data);
    changeName(name);
    changeEmail(email);
    changePhone(phone);
    goForward();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name,
      email,
      phone,
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <FormHeader
          title="Personal info"
          description="Please provide your name, email address, and phone number."
        />
        <div className="flex flex-col gap-5">
          <FormInput
            id="name"
            name="name"
            label="Name"
            errors={errors}
            placeholder="e.g. Stephen King"
            register={register}
          />
          <FormInput
            id="email"
            name="email"
            label="Email Address"
            errors={errors}
            placeholder="e.g. stephenking@lorem.com"
            register={register}
          />
          <FormInput
            id="phone"
            name="phone"
            label="Phone Number"
            errors={errors}
            placeholder="e.g. +1 234 567 890"
            register={register}
          />
        </div>
        <BottomNav />
      </form>
    </>
  );
}

const FormInput = forwardRef(function FormInput(
  { name, id, label, type = "text", register, errors, ...rest },
  ref
) {
  return (
    <div>
      <div className="mb-0.5 flex justify-between sm:mb-1">
        <label
          htmlFor="phone"
          className="text-[13px] text-blue-marine sm:text-[14px]"
        >
          {label}
        </label>
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <p className="text-[13px] font-medium text-red-strawberry sm:text-[14px]">
              {message}
            </p>
          )}
        />
      </div>
      <input
        ref={ref}
        id={id}
        type={type}
        {...(register && register(name))}
        {...rest}
        className={clsx(
          "w-full rounded-md border-gray-light py-2 px-4 font-medium text-blue-marine placeholder:font-medium placeholder:text-gray-cool sm:py-3",
          "focus:border-blue-purplish focus:outline-none focus:ring-0 focus:ring-blue-purplish",
          errors[name]?.message && "border-red-strawberry "
        )}
      />
    </div>
  );
});

export default StepOne;
