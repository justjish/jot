import type { FC } from "react";
import { Button } from "~/components/auth/social-button";
import type { AllProvidersType } from "./social-constants";
export const SocialForm: FC<{
  provider: AllProvidersType;
  returnTo?: string;
  action: (formData: FormData) => void;
}> = ({ provider, returnTo, action }) => {
  return (
    <form action={action}>
      <input hidden name="provider" value={provider} readOnly />
      <input hidden name="returnTo" value={returnTo} readOnly />
      <Button provider={provider} />
    </form>
  );
};
