"use client";

import { createContext, useEffect, useState } from "react";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useDarkMode } from "~~/hooks/scaffold-eth/useDarkMode";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

type FoodType = {
  name: string;
  img: string;
  calories: string;
  price: string;
};

export const MyContext = createContext({});
export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useDarkMode();
  const [catSelected, setCatSelected] = useState(null);
  const [selectedFood, setSelectedFood] = useState<FoodType>({ name: "", img: "", calories: "", price: "" });

  return (
    <MyContext.Provider value={{ catSelected, setCatSelected, selectedFood, setSelectedFood }}>
      <WagmiConfig config={wagmiConfig}>
        <ProgressBar />
        <RainbowKitProvider
          chains={appChains.chains}
          avatar={BlockieAvatar}
          theme={isDarkMode ? darkTheme() : lightTheme()}
        >
          <ScaffoldEthApp>{children}</ScaffoldEthApp>
        </RainbowKitProvider>
      </WagmiConfig>
    </MyContext.Provider>
  );
};
