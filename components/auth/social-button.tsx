import { GithubButton } from "./social-button-github";
import type { FC } from "react";
import type { AllProvidersType } from "./social-constants";

/** Simple button selector with a warning for the developer */
export const Button: FC<{ provider: AllProvidersType }> = ({ provider }) => {
  switch (provider) {
    case "github":
      return <GithubButton />;
    default:
      throw new Error("Provider not enabled in backend Dashboard.");
  }
};
