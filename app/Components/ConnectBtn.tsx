"use client";
import React, { useState } from "react";
import {
  createSmartAccountClient,
  BiconomySmartAccountV2,
} from "@biconomy/account";
import { ethers } from "ethers";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import "react-toastify/dist/ReactToastify.css";
import SellerDashboard from "../Dashboards/SellerDashboard/SellerDashboard";
import "./ConnectBtn.css";

// Define a type for the user information
interface Web3AuthUser {
  name: string;
  email: string;
}

export default function ConnectBtn() {
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);
  const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(
    null
  );
  const [userName, setUserName] = useState<string | null>(null); // New state for user name

  const chains = [
    {
      chainId: 80002,
      name: "Polygon Amoy",
      providerUrl: "https://rpc-amoy.polygon.technology/",
      biconomyPaymasterApiKey: "TVDdBH-yz.5040805f-d795-4078-9fd1-b668b8817642",
      explorerUrl: "https://www.oklink.com/amoy/tx/",
    },
  ];

  const connect = async () => {
    try {
      const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x13882",
        rpcTarget: chains[0].providerUrl,
        displayName: "Polygon Amoy",
        blockExplorer: "https://www.oklink.com/amoy/",
        ticker: "MATIC",
        tickerName: "Polygon Matic",
      };

      const web3auth = new Web3Auth({
        clientId:
          "BExrkk4gXp86e9VCrpxpjQYvmojRSKHstPRczQA10UQM94S5FtsZcxx4Cg5zk58F7W1cAGNVx1-NPJCTFIzqdbs",
        web3AuthNetwork: "sapphire_devnet",
        chainConfig,
        uiConfig: {
          appName: "Biconomy X Web3Auth",
          mode: "dark",
          loginMethodsOrder: ["apple", "google", "twitter"],
          logoLight: "https://web3auth.io/images/web3auth-logo.svg",
          logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
          defaultLanguage: "en",
          loginGridCol: 3,
          primaryButton: "socialLogin",
        },
      });

      await web3auth.initModal();
      const web3authProvider = await web3auth.connect();
      const user = await web3auth.getUserInfo() as Web3AuthUser; // Fetch user info and cast to Web3AuthUser
      setUserName(user.name); // Set user name

      const ethersProvider = new ethers.providers.Web3Provider(
        web3authProvider as any
      );
      const web3AuthSigner = ethersProvider.getSigner();

      const config = {
        biconomyPaymasterApiKey: chains[0].biconomyPaymasterApiKey,
        bundlerUrl: `https://bundler.biconomy.io/api/v2/${chains[0].chainId}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`, // <-- Read about this at https://docs.biconomy.io/dashboard#bundler-url
      };

      const smartWallet = await createSmartAccountClient({
        signer: web3AuthSigner,
        biconomyPaymasterApiKey: config.biconomyPaymasterApiKey,
        bundlerUrl: config.bundlerUrl,
        rpcUrl: chains[0].providerUrl,
        chainId: chains[0].chainId,
      });

      console.log("Biconomy Smart Account", smartWallet);
      setSmartAccount(smartWallet);
      const saAddress = await smartWallet.getAccountAddress();
      console.log("Smart Account Address", saAddress);
      setSmartAccountAddress(saAddress);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="">
      {!smartAccount && (
        <div className="buyerSignUp">
          <div className="--buyerSignUp-header">
            <h2>Sign Up</h2>
            <div className="--buyerSignUp-btnOne">
              <button onClick={connect}>Connect Your X</button>
            </div>
            <div className="--buyerSignUp-btnTwo">
              <button onClick={connect}>Connect Your Wallet</button>
            </div>
          </div>
        </div>
      )}

      {smartAccount && (
        <>
          <SellerDashboard />
        </>
      )}
    </main>
  );
}
