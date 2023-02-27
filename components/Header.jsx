import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { ConnectButton, useNotification } from "web3uikit";
import styles from "@/styles/Home.module.css";

const networkName = {
  1: "Ethereum Mainnet",
  31337: "localhost",
  137: "ploygon mumbai",
  5: "goerli",
};
export default function Header() {
  const { isWeb3Enabled, chainId } = useMoralis();
  const dispatch = useNotification();

  useEffect(() => {
    if (chainId == null || isWeb3Enabled == false) {
      return console.log("Kindly connect your metamask");
    }
    dispatch({
      type: "info",
      message: `Network changed to ${
        networkName[parseInt(chainId).toString()]
      }`,
      title: "Network Notification",
      position: "topL",
      icon: "bell",
    });
    // console.log(
    //   `Network changed to ${networkName[parseInt(chainId).toString()]}`
    // );
  }, [chainId]);

  return (
    <div flex="row" className={styles.header}>
      <h1>AntToken</h1>
      <div>
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}

//{1:"Ethereum Mainnet",31337:"localhost",137:"ploygon mumbai",5:"goerli"}
//0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
//0x70997970C51812dc3A010C7d01b50e0d17dc79C8
//0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
