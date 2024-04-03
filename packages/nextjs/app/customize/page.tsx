"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";
import { formatEther } from "viem";

const backgroundImageStyle = {
  backgroundImage: 'url("/assets/background.jpg")',
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const imageURLs = [
  "/assets/background.jpg",
  "/assets/background1.png",
  "/assets/background2.png",
  "/assets/background3.png",
];

function Customize() {
  const router = useRouter();
  const { address } = useAccount();

  const [selected, setSelected] = useState(Number(0));

  const { data: XPToken } = useScaffoldContractRead({
    contractName: "XPToken",
    functionName: "balanceOf",
    args: [address],
  });

  const { writeAsync: setBackground } = useScaffoldContractWrite({
    contractName: "Meow",
    functionName: "setBackground",
    args: [imageURLs[selected]],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      // console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div style={backgroundImageStyle} className="h-screen">
      <div className="flex items-center justify-center">
        <div className="w-[800px]">
          <p className="text-right mt-10">Current Points: {formatEther(XPToken || 0)}</p>
          <div className=" mt-10">
            <h1 className="text-3xl font-semibold">Select A Background</h1>
            <p className="text-xl font-bold">Preview</p>
            <div className="grid grid-cols-3 gap-10">
              <div
                className="grid col-span-2 grid-cols-2 gap-1 border border-blue-500 p-6"
                style={{
                  backgroundImage: `url(${imageURLs[selected]})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <p className="font-semibold text-2xl text-white px-2 py-2">MOMOTO</p>
                  <Image
                    src="/assets/cat 001.png"
                    width={1900}
                    height={1900}
                    alt="pet"
                    className={`object-cover w-[200px] h-[200px] `}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center w-[100px] justify-center bg-[#F5F1F1] cursor-pointer">
                    <Image className="mt-4" src="/assets/feedtrophy.svg" width={30} height={30} alt="pet" />
                    <p className="font-semibold text-[10px] text-black ">Daily Points</p>
                  </div>
                  <div className="flex flex-col items-center w-[100px] justify-center bg-[#F5F1F1] cursor-pointer">
                    <Image className="mt-4" src="/assets/fish.svg" width={30} height={30} alt="pet" />
                    <p className="font-semibold text-[10px] text-black ">Feed Cat</p>
                  </div>
                  <div className="flex flex-col items-center w-[100px] justify-center bg-[#F5F1F1] cursor-pointer">
                    <Image className="mt-4" src="/assets/customize.svg" width={30} height={30} alt="pet" />
                    <p className="font-semibold text-[10px] text-black ">Customize</p>
                  </div>
                  <div className="flex flex-col items-center w-[100px] justify-center bg-[#F5F1F1] cursor-pointer">
                    <Image className="mt-4" src="/assets/marketplace.svg" width={30} height={30} alt="pet" />
                    <p className="font-semibold text-[10px] text-black ">Market Place</p>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex items-center mt-[50px]">
                  <Image
                    className="rounded-full border border-blue-500"
                    src={imageURLs[selected]}
                    width={180}
                    height={100}
                    alt="Background"
                  />
                  <div className="text-4xl font-bold">
                    <FiChevronRight
                      className="ml-10 cursor-pointer "
                      onClick={() => {
                        if (selected === 3) setSelected(0);
                        else setSelected(selected + 1);
                      }}
                    />
                  </div>
                </div>
                <p className="ml-10 text-[21px] font-semibold">100 Points</p>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                className="bg-[#C3994A] text-white border-4 border-white px-4 py-4 rounded-lg transition duration-300 ease-in-out w-[180px] text-2xl hover:bg-[#d1a24b] mr-6"
                onClick={() => router.push("/statusCat")}
              >
                Close
              </button>
              <button
                className="bg-[#C3994A] text-white border-4 border-white px-4 py-4 rounded-lg transition duration-300 ease-in-out w-[180px] text-2xl hover:bg-[#d1a24b]"
                onClick={setBackground}
              >
                Redeem
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customize;
