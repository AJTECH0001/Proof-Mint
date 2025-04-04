// src/index.tsx  
import React from "react";  
import ReactDOM from "react-dom/client";  
import App from "./App";  
import "./index.css";  

import '@rainbow-me/rainbowkit/styles.css';  
import {  
  getDefaultConfig,  
  RainbowKitProvider,  
} from '@rainbow-me/rainbowkit';  
import { WagmiProvider } from 'wagmi';  
import {  
  mainnet,  
  polygon,  
  optimism,  
  arbitrum,  
  base,
  sepolia,
} from 'wagmi/chains';  
import {  
  QueryClientProvider,  
  QueryClient,  
} from "@tanstack/react-query";  

// Note: Ensure you have instantiated the queryClient since it is being used below  
const queryClient = new QueryClient();  

const config = getDefaultConfig({  
  appName: 'My RainbowKit App',  
  projectId: 'YOUR_PROJECT_ID',  
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],  
  ssr: true, // If your dApp uses server side rendering (SSR)  
});  

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);  
root.render(  
  <WagmiProvider config={config}>  
    <QueryClientProvider client={queryClient}>  
      <RainbowKitProvider>  
        <React.StrictMode>  
          <App />  
        </React.StrictMode>  
      </RainbowKitProvider>  
    </QueryClientProvider>  
  </WagmiProvider>  
);  