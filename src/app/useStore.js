"use client";
import { create } from "zustand";

const useStore = create((set) => ({
  name: "",
  email: "",
  phone: "",
  plan: "arcade",
  billing: "monthly",
  addOns: [],
  changeName: (name) =>
    set((state) => ({
      name: name,
    })),
  changeEmail: (email) =>
    set((state) => ({
      email: email,
    })),
  changePhone: (phone) =>
    set((state) => ({
      phone: phone,
    })),
  changePlan: (plan) =>
    set((state) => ({
      plan: plan,
    })),
  changeBilling: (billing) =>
    set((state) => ({
      billing: billing,
    })),
  changeAddOns: (addOns) =>
    set((state) => ({
      addOns: addOns,
    })),
}));
export default useStore;
