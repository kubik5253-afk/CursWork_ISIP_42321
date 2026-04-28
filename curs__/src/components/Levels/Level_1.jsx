import Image from "next/image";
import { useState, useEffect } from "react";

export default function Level_1({ onNext }) {
  const [step, setStep] = useState("default");

  useEffect(() => {
    let loadingTimeout;
    let successTimeout;

    if (step === "loading") {
      loadingTimeout = setTimeout(() => setStep("success"), 1000);
    } else if (step === "success") {
      successTimeout = setTimeout(() => {
        onNext();
      }, 1000);
    }

    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(successTimeout);
    };
  }, [step, onNext]);

  const handleCheckboxChange = () => {
    setStep("loading");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-around items-center shadow-1xl mt-16 w-80 h-20 border-gray-300 border rounded bg-stone-50">
        {step === "default" && (
          <input
            className="shadow-2xl h-6 w-6 my-6.5 ml-4"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
        )}
        {step === "loading" && (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-l-2 border-blue-500 mx-4"></div>
          </div>
        )}
        {step === "success" && (
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-green-500 mx-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        )}
        <p>I'm not a robot</p>
        <Image
          src="/RecaptchaLogo.png"
          alt="RecaptchaLogo"
          width={60}
          height={60}
        />
      </div>
    </div>
  );
}