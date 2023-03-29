"use client";
import { Children, forwardRef } from "react";
import clsx from "clsx";

const Button = forwardRef(function Button(
  { onClick, className, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={clsx(
        className,
        "inline-flex w-[100px]  shrink-0 items-center justify-center rounded-md bg-blue-marine py-2 text-[15px] font-medium leading-relaxed text-blue-back hover:bg-blue-active sm:w-[124px] sm:py-3 sm:text-base"
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
