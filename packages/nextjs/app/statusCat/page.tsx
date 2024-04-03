"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { MyContext } from "~~/components/ScaffoldEthAppWithProviders";

function StatusCat() {
  const { catSelected } = useContext<any>(MyContext);

  const router = useRouter();
  const { address } = useAccount();
  const cat = {
    catName: "Momo",
    breed: "Persian",
    target: "50",
    totalDonation: "5",
    temperament: "friendly",
  };

  const { data: XPToken } = useScaffoldContractRead({
    contractName: "XPToken",
    functionName: "balanceOf",
    args: [address],
  });

  const { data: background } = useScaffoldContractRead({
    contractName: "Meow",
    functionName: "ownerToBackground",
    args: [address],
  });
  const id = Number(0);
  const { data: getCatsInfo } = useScaffoldContractRead({
    contractName: "Meow",
    functionName: "cats",
    args: [id],
  });
  console.log("getCatsInfo", getCatsInfo);

  return (
    <div
      style={{
        backgroundImage: `url(${background || "/assets/background.jpg"})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "104vh", // Set to full height of the viewport
      }}
    >
      <p className="text-right mr-[100px] mt-10">Current Points: {formatEther(XPToken || 0)}</p>
      <div className="flex items-center justify-center">
        <div className=" mt-10">
          <div className="grid grid-cols-4 gap-10">
            <div className="p-4 col-span-2 flex flex-col items-center justify-center">
              <p className="font-semibold bg-gray-100 text-3xl text-black p-2 pb-0 mb-0">
                Check {catSelected?.name} status
              </p>
              <Image
                src={catSelected ? catSelected.front : "/assets/cat 001.png"}
                width={1900}
                height={1900}
                alt="pet"
                className={`object-cover w-[300px] h-[400px] `}
              />

              <table className="w-3/4 divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">{getCatsInfo ? getCatsInfo[1] : "Momoto"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Target: ${getCatsInfo ? getCatsInfo[3].toString() : "0"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Total Donation: ${getCatsInfo ? getCatsInfo[2].toString() : "0"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">{getCatsInfo ? getCatsInfo[6] : "Friendly"} cat</td>
                    <td className="px-6 py-4 whitespace-nowrap"> Traits: {cat.temperament} </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Donations {getCatsInfo ? getCatsInfo[4].toLowerCase() : "Medical"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-1">
              <div
                className="flex flex-col items-center justify-center bg-[#F5F1F1]  cursor-pointer w-[220px]  mx-auto rounded-xl overflow-hidden shadow-lg "
                // onClick={() => router.push("/dailyPoints")}
              >
                <Image src="/assets/feedtrophy.svg" width={40} height={40} alt="pet" />
                <p className="font-semibold text-2xl text-black px-4 py-3">Daily Points</p>
                <small>Coming soon</small>
              </div>
              <div
                className="flex flex-col items-center justify-center bg-[#F5F1F1]  cursor-pointer w-[220px]  mx-auto rounded-xl overflow-hidden shadow-lg "
                onClick={() => router.push("/selectFood")}
              >
                <Image src="/assets/fish.svg" width={40} height={40} alt="pet" />
                <p className="font-semibold text-2xl text-black px-4 py-3">Feed Cat</p>
              </div>
              <div
                className="flex flex-col items-center justify-center bg-[#F5F1F1]  cursor-pointer w-[220px]  mx-auto rounded-xl overflow-hidden shadow-lg "
                // onClick={() => router.push("/customize")}
              >
                <Image src="/assets/customize.svg" width={40} height={40} alt="pet" />
                <p className="font-semibold text-2xl text-black px-4 py-3">Customize</p>
                <small>Coming soon</small>
              </div>
              <div className="flex flex-col items-center justify-center bg-[#F5F1F1]  cursor-pointer w-[220px]  mx-auto rounded-xl overflow-hidden shadow-lg ">
                <Image src="/assets/marketplace.svg" width={40} height={40} alt="pet" />
                <p className="font-semibold text-2xl text-black px-4 py-3">Market Place</p>
                <small>Coming soon</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusCat;
