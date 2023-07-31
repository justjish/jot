export const instructionsHeader = "Requirements to enable the save button.";
export const min = 20;
export const max = 500;
export const requirementsToMeet = [
  {
    message: "Type minimum of 20 characters.",
    check: (isUnderMin: boolean) => (isUnderMin === false ? "green" : "gray"),
  },
  {
    message: "Do not exceed 500 characters.",
    check: (isUnderMax: boolean) => (isUnderMax === true ? "green" : "gray"),
  },
] as const;
export const instructionsFooter = "The save button will be activated once the note is valid!";
export const autoSaveTooltip = "You may turn on auto-save now, but it will not start saving until the note is valid!";
