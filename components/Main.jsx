import { useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useNotification } from "web3uikit";
import { ethers } from "ethers";
import styles from "@/styles/Home.module.css";
const contractAddresses = require("../constants/contractAddresses.json");
const abi = require("../constants/abi.json");

export default function Main() {
  const { chainId: chainIdHex } = useMoralis();
  const { dispatch } = useNotification();
  const chainId = parseInt(chainIdHex);
  const antTokenAdddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [userAllowance, setUserAllowance] = useState("0");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [spenderAddress, setSpenderAddress] = useState("");
  const ethAllowances = ethers.utils.formatEther(userAllowance);

  const { runContractFunction } = useWeb3Contract();

  async function handleSubmit(event) {
    event.preventDefault();
    const ownerADD = ownerAddress;
    const spendADD = spenderAddress;
    const returnedAllowances = await runContractFunction({
      params: {
        abi: abi,
        contractAddress: antTokenAdddress,
        functionName: "allowance",
        params: {
          owner: ownerADD,
          spender: spendADD,
        },
      },
      onError: (error) => console.log(error),
    });
    if (returnedAllowances) {
      setOwnerAddress("");
      setSpenderAddress("");
      setUserAllowance(returnedAllowances.toString());
    }
  }

  return (
    <div className={styles.sub_section}>
      {antTokenAdddress ? (
        <form key={"main"} className="form" onSubmit={handleSubmit}>
          <div className={styles.first_form_container}>
            <label htmlFor="Owner Address" className={styles.form_label_owner}>
              OwnerAddress :{" "}
            </label>
            <input
              type="text"
              id="ownerAddress"
              name="ownerAddress"
              value={ownerAddress}
              className={styles.form_input}
              onChange={(e) => setOwnerAddress(e.target.value)}
            />
          </div>
          <div className={styles.first_form_container}>
            <label htmlFor="spender Address" className={styles.form_label}>
              SpenderAddress :{" "}
            </label>
            <input
              type="text"
              id="spenderAddress"
              name="spenderAddress"
              value={spenderAddress}
              className={styles.form_input}
              onChange={(e) => setSpenderAddress(e.target.value)}
            />
          </div>
          <div className={styles.btn_wrapper}>
            <button
              type="submit"
              className={styles.allowence_btn}
              onClick={handleSubmit}
            >
              Allowance
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.result}>No contract Deployed</div>
      )}

      <div className={styles.result}>Allowances are: {ethAllowances}ETH</div>
    </div>
  );
}
