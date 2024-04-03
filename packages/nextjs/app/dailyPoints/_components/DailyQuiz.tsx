import React, { useState } from "react";
import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { parseEther } from "viem";

export const DailyQuiz = () => {
  const [step, setStep] = useState(0);

  const { writeAsync: takequiz } = useScaffoldContractWrite({
    contractName: "Meow",
    functionName: "earnXP",
    args: [parseEther('5')],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      // console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const right = async () => {
    await takequiz();
    setStep(1);
  }

  const wrong = async () => {
    await takequiz();
    setStep(2);
  }

  return (
    <div className="w-full">
      {step === 0 && (
        <div className="bg-[#FEE3B7] p-5">
          <h2 className="text-xl">
              What do cats want to do if their tails form the shape of question marks?
          </h2>
          <div className="mt-10 flex justify-center">
            <button
              className="bg-white p-3 rounded-full transition duration-300 ease-in-out w-[150px] text-xl hover:bg-[#d1a24b] mr-6"
              onClick={right}
            >
              To Play
            </button>
            <button
              className="bg-white p-3 rounded-full transition duration-300 ease-in-out w-[150px] text-xl hover:bg-[#d1a24b]"
              onClick={wrong}
            >
              To Eat
            </button>
          </div>
        </div>
      )}
      {step === 1 && (
        <div className="bg-white p-5">
          <div className="flex items-center justify-center">
            <FiCheckCircle className="text-2xl mr-3"/>
            <h2 className="mt-2 text-4xl">Correct!</h2>
          </div>
          <p className="text-center text-xl">+5 points</p>
        </div>
      )}
       {step === 2 && (
        <div className="bg-white p-5">
          <div className="flex items-center justify-center">
            <Image src="/assets/wrong.svg" className="mr-4" width={40} height={40} alt="pet" />
            <h2 className="mt-2 text-4xl">Nice Try!</h2>
          </div>
          <p className="text-center text-xl">+1 points</p>
        </div>
      )}
    </div>
  );
};
