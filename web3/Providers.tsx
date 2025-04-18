'use client';

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const eduChain = {
    id: 41923, // EduChain Mainnet ID
    // id: 656476,
    name: "EduChain",
    network: "educhain",
    nativeCurrency: {
      name: "Edu Token",
      symbol: "EDU",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [
          "https://rpc.edu-chain.raas.gelato.cloud/fd947a6d7b1b4565b1bb1cab5e4048b5",
        ],
        // http: [" https://rpc.open-campus-codex.gelato.digital"],
      },
      public: {
        http: [
          "https://rpc.edu-chain.raas.gelato.cloud/fd947a6d7b1b4565b1bb1cab5e4048b5",
        ],
      },
    },
    blockExplorers: {
      default: {
        name: "EduChain Explorer",
        url: "https://educhain.blockscout.com",
      },
    },
    iconUrl: "https://cryptologos.cc/logos/open-campus-edu-logo.png?v=040",
  };
  
  // Include EduChain in the list of chains
  const chains = [eduChain];

const wagmiConfig = getDefaultConfig({
    appName: "FHN-QuestAI",
    projectId: "6212dbb75c0040c878d0e0104607756d",
    chains,
    ssr: false,
});

const Providers = ({ children } :  { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: '#6b46c1',
          accentColorForeground: 'white',
          borderRadius: 'large',
          overlayBlur: 'small',
        })}
        chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
    </QueryClientProvider>
  );
};

export default Providers;