"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";

const GetStart: NextPage = () => {
  // const { address } = useAccount();

  const backgroundImageStyle = {
    backgroundImage: 'url("/assets/cover1.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh", // Set to full height of the viewport
    width: "100vw",
  };

  const router = useRouter();
  const poligonIdAuthentication = async () => {
    router.push("/selectCat");
  };
  return (
    <div className="">
      <div style={backgroundImageStyle} onClick={poligonIdAuthentication}></div>
    </div>
  );
};

export default GetStart;
