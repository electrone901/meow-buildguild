"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { DailyLogIn } from "./_components/DailyLogIn";
import { DailyQuiz } from "./_components/DailyQuiz";

const backgroundImageStyle = {
  backgroundImage: 'url("/assets/background.jpg")',
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "104vh", // Set to full height of the viewport
};

function DailyPoints() {
  const router = useRouter();
  const { address } = useAccount();
  const [showDailyLogin, setShowDailyLogin] = useState(false);
  const [showDailyQuiz, setShowDailyQuiz] = useState(false);

  const { data: XPToken } = useScaffoldContractRead({
    contractName: "XPToken",
    functionName: "balanceOf",
    args: [address],
  });
  // console.log("🚀 ~ DailyPoints ~ XPToken:", XPToken?.toString());

  return (
    <div style={backgroundImageStyle}>
      <p className="text-right mr-[100px] mt-10">Current Points: {formatEther(XPToken || 0)}</p>
      <div className="flex items-center justify-center">
        <div className=" mt-10">
          <p className="font-semibold text-3xl text-black px-2 py-2">Check MOMOTO’s status</p>

          <div className="grid grid-cols-2 gap-10 w-[1000px]">
            <div className=" p-4 flex items-center justify-center">
              <Image
                src="/assets/cat 001.png"
                width={1900}
                height={1900}
                alt="pet"
                className={`object-cover w-[300px] h-[400px] `}
              />
            </div>

            <div className="bg-white border-8 border-[#FED595] rounded-md">
              <div className="flex items-center justify-center bg-[#F5F1F1] mb-4">
                <Image src="/assets/feedtrophy.svg" width={40} height={40} alt="pet" />
                <p className="font-semibold text-2xl text-black px-4 py-3">Daily Points</p>
              </div>
              <div className="flex flex-col items-center justify-center bg-[#F5F1F1] mb-4">
                <div className="flex items-center">
                  <Image src="/assets/calendar.svg" width={40} height={40} alt="pet" />
                  <p className="font-semibold text-2xl text-black px-4 py-3">Daily Log in</p>
                  {showDailyLogin ? (
                    <FiChevronUp
                      className="cursor-pointer text-black"
                      style={{ fontSize: "30px" }}
                      onClick={() => setShowDailyLogin(false)}
                    />
                  ) : (
                    <FiChevronDown
                      className="cursor-pointer text-black"
                      style={{ fontSize: "30px" }}
                      onClick={() => setShowDailyLogin(true)}
                    />
                  )}
                </div>
                {showDailyLogin && <DailyLogIn />}
              </div>
              <div className="flex flex-col items-center justify-center bg-[#F5F1F1] mb-4">
                <div className="flex items-center">
                  <Image src="/assets/quiz.svg" width={40} height={40} alt="pet" />
                  <p className="font-semibold text-2xl text-black px-4 py-3">Daily Quiz</p>
                  {showDailyQuiz ? (
                    <FiChevronUp
                      className="cursor-pointer text-black"
                      style={{ fontSize: "30px" }}
                      onClick={() => setShowDailyQuiz(false)}
                    />
                  ) : (
                    <FiChevronDown
                      className="cursor-pointer text-black"
                      style={{ fontSize: "30px" }}
                      onClick={() => setShowDailyQuiz(true)}
                    />
                  )}
                </div>
                {showDailyQuiz && <DailyQuiz />}
              </div>
              <div className="flex items-center justify-center bg-[#F5F1F1]">
                <Image src="/assets/feedcat.svg" width={40} height={40} alt="pet" />
                <p className="font-semibold text-2xl text-black px-4 py-3">Feed Cat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyPoints;
