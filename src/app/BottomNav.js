"use client";
import Button from "./Button";

import React from "react";
import clsx from "clsx";

function BottomNav({ goForward, goBack, withBackButton = false }) {
  return (
    <div
      className={clsx(
        "fixed inset-x-0 bottom-0 flex items-center bg-white p-4 sm:static",
        withBackButton ? "justify-between" : "justify-end",
        "sm:absolute sm:bottom-[18px]"
      )}
    >
      {withBackButton && (
        <button
          onClick={() => goBack()}
          className={clsx(
            "inline-flex items-center rounded-lg text-[15px] font-medium text-gray-cool hover:text-blue-active sm:text-base"
          )}
        >
          Go Back
        </button>
      )}
      <Button onClick={goForward} type="submit" className="">
        Next Step
      </Button>
    </div>
  );
}

export default BottomNav;
