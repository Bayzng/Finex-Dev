"use client";
import React, { useState, useEffect } from "react";
import {
  createSmartAccountClient,
  BiconomySmartAccountV2,
} from "@biconomy/account";
import { ethers } from "ethers";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';
import profile from '../../../public/man.jpeg';
import Link from 'next/link';
import './Sidebar.css';

// Define a type for the user information
interface Web3AuthUser {
  name: string;
  email: string;
}

const chains = [
  {
    chainId: 80002,
    name: "Polygon Amoy",
    providerUrl: "https://rpc-amoy.polygon.technology/",
    biconomyPaymasterApiKey: "TVDdBH-yz.5040805f-d795-4078-9fd1-b668b8817642",
    explorerUrl: "https://www.oklink.com/amoy/tx/",
  },
];

const Sidebar: React.FC = () => {
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);
  const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(
    null
  );
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const connectWeb3 = async () => {
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
          bundlerUrl: `https://bundler.biconomy.io/api/v2/${chains[0].chainId}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
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

    connectWeb3(); // Call the connection function on component mount
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <main className="">
      {smartAccount && (
        <div className="sidebar">
          <div className="--sidebar-profile">
            <Image src={profile} alt="Picture of the author" />
            <p className="welcome">Welcome</p>
            <p>{userName}</p>
          </div>
          <div className="--sidebar-profile-details">
            <div className="--sidebar-dashboard">
              <button>Dashboard</button>
            </div>
            <div className="--sidebar-sell">
              <Link href='/productCreation'>
                <button>Sell</button>
              </Link>
            </div>
            <div className="--sidebar-products">
              <Link href='/product'>
                <button>Products</button>
              </Link>
            </div>
            <div className="--sidebar-wallet">
              <Link href="/wallet">
                <button>Wallet</button>
              </Link>
            </div>
            <div className="--sidebar-switch">
              <button>Switch</button>
            </div>
            <div className="--sidebar-settings">
              <button>Settings</button>
            </div>
            <div className="--sidebar-logout">
              <button>Logout</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Sidebar;
