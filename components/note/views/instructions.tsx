import * as copy from "../note-constants";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useNoteSnap } from "../note-provider";

const Requirements = ({ variant, message }: { variant: "green" | "gray"; message: string }) => {
  const variants = {
    green: "text-green-500 ",
    gray: "text-gray-500",
  } as const;
  return (
    <li className={`${variants[variant]} flex items-center`}>
      <svg
        className={`${variants[variant]} mr-2 h-3.5 w-3.5 flex-shrink-0`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
      {message}
    </li>
  );
};

const RequirementOne = ({ message, fn }: { message: string; fn: (typeof copy.requirementsToMeet)[0]["check"] }) => {
  const snap = useNoteSnap();
  return <Requirements variant={fn(snap.isUnderMin)} message={message} />;
};
const RequirementTwo = ({ message, fn }: { message: string; fn: (typeof copy.requirementsToMeet)[1]["check"] }) => {
  const snap = useNoteSnap();
  return <Requirements variant={fn(snap.isUnderMax)} message={message} />;
};

function Instructions() {
  return (
    <div className="m-auto w-full">
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between bg-[#1f2937] px-4 py-2 text-justify text-sm font-medium text-white  hover:text-[#4af2a1] focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
              <span className="text-center">{copy.instructionsHeader}</span>
              <ChevronUpIcon className={`${open ? "rotate-180 transform" : ""} h-5 w-5 text-blue-500`} />
            </Disclosure.Button>
            <Disclosure.Panel className="text-md bg-[#1f2937] px-4 pb-2 text-gray-500">
              <ul className="max-w-md list-inside space-y-1 font-bold text-white">
                <RequirementOne message={copy.requirementsToMeet[0].message} fn={copy.requirementsToMeet[0].check} />
                <RequirementTwo message={copy.requirementsToMeet[1].message} fn={copy.requirementsToMeet[1].check} />
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default Instructions;
