import { createContext } from "react";

export const navigationTypeOptions = [
  "stack",
  "native-stack",
  "bottom-tab",
  "drawer",
] as const;
export type NavigationTypeT = (typeof navigationTypeOptions)[number];

export const Context = createContext({
  navigationType: "stack" as NavigationTypeT,
  setNavigationType: null! as (v: NavigationTypeT) => void,
});
