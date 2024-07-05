"use client";
import React, { useState } from "react";
import { createSmartAccountClient, BiconomySmartAccountV2,} from "@biconomy/account";
import { ethers } from "ethers";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Sidebar/Sidebar";
import { IoMdAdd } from "react-icons/io";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaEthereum } from "react-icons/fa";
import { IoLogoBitcoin } from "react-icons/io";
import "./wallet.css"




export default function Wallet() {
  const [smartAccount, setSmartAccount] = useState<BiconomySmartAccountV2 | null>(null);
  const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(null);

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

  // Connect immediately when the component mounts
  React.useEffect(() => {
    connect();
  }, []);

  return (
    <div className="sellerDashboard">

      <div id='sectionOne'>
            <Sidebar/>
        </div>

      <div id='sectionTwo'>
        <div className="walletContent">
          <div className="--walletContent-header">
            <h1>POLYGON</h1>
            <h3>Ethereum</h3>
          </div>

          <div>
            {smartAccount && (
              <button className="--walletContent-btn">
                <span className="--walletContent-wallet">{smartAccountAddress?.slice(0, 20)}</span>
                <span className="--walletContent-copy">Copy</span>
              </button>
            )}
          </div>

          <div className="--walletContent-amount">
            <h1>0.00 MATIC</h1>
            <h2>$0.00 USD</h2>
          </div>

          <div className="--walletContent-content">
            <div className="--walletContent-content-header">
              <h2 className="--walletContent-icon"><IoMdAdd size={20}/></h2>
              <h2>Add</h2>
            </div>
            <div className="--walletContent-content-header">
              <h2 className="--walletContent-icon"><FaLongArrowAltDown size={20}/></h2>
              <h2>Receive</h2>
            </div>
            <div className="--walletContent-content-header">
              <h2 className="--walletContent-icon"><FaLongArrowAltUp size={20}/></h2>
              <h2>Send</h2>
            </div>
          </div>

        </div> 

        <div className="--walletContent-transaction">
          <h2>Transactions</h2>

          <div className="--walletContent-transaction-headerH2">
            <div className="--walletContent-transaction-netword">
              <h1><FaEthereum size={40}/></h1>
              <div>
                <h2>Ethereum</h2>
                <p>48% Portfolio</p>
              </div>
            </div>

            <div>
              <h1>Eth</h1>
              <h1>0:00%</h1>
            </div>
          </div>

          <div className="--walletContent-transaction-headerH2">
            <div className="--walletContent-transaction-netword">
              <h1><IoLogoBitcoin size={40}/></h1>
              <div>
                <h2>Ethereum</h2>
                <p>48% Portfolio</p>
              </div>
            </div>

            <div>
              <h1>Eth</h1>
              <h1>0:00%</h1>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}