"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface PlusState {
  isPlus: boolean;
  setIsPlus: (v: boolean) => void;
}

const PlusContext = createContext<PlusState>({ isPlus: false, setIsPlus: () => {} });

export function PlusProvider({ children }: { children: React.ReactNode }) {
  const [isPlus, setIsPlusState] = useState(false);

  useEffect(() => {
    setIsPlusState(localStorage.getItem("finn-plus-member") === "1");
  }, []);

  const setIsPlus = (v: boolean) => {
    setIsPlusState(v);
    localStorage.setItem("finn-plus-member", v ? "1" : "0");
  };

  return (
    <PlusContext.Provider value={{ isPlus, setIsPlus }}>
      {children}
    </PlusContext.Provider>
  );
}

export function usePlus() {
  return useContext(PlusContext);
}
