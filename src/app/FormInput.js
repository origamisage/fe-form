"use client";
import { forwardRef } from "react";
import clsx from "clsx";
import { ErrorMessage } from "@hookform/error-message";

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

export default FormInput;
