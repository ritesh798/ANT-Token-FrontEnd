import { ethers } from "ethers";
import { useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useNotification } from "web3uikit";
import styles from "@/styles/Home.module.css";

const contractAddresses = require("../constants/contractAddresses.json");
const abi = require("../constants/abi.json");

export default function Approve() {
  const [spenderAddress, setSpenderAddress] = useState("");
  const [amount, setAmount] = useState("");
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const dispatch = useNotification();
  const chainId = parseInt(chainIdHex);
  const antTokenAdddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const { runContractFunction } = useWeb3Contract();

  async function handleSubmit(event) {
    event.preventDefault();
    if (amount == "0" || amount == "") {
      return dispatch({
        type: "info",
        message: `value must be greter than 0`,
        title: "No allowances given",
        position: "topL",
        icon: "bell",
      });
    }

    const spendADD = spenderAddress;
    const amt = ethers.utils.parseUnits(amount);
    const returnedBool = await runContractFunction({
      params: {
        abi: abi,
        contractAddress: antTokenAdddress,
        functionName: "approve",
        params: {
          spender: spendADD,
          amount: amt,
        },
      },
      onError: (error) => console.log(error),
    });

    if (Boolean(returnedBool) == true) {
      setSpenderAddress("");
      setAmount("");
      dispatch({
        type: "info",
        message: `Allowance Approved `,
        title: "Allowance Notification",
        position: "topL",
        icon: "bell",
      });
    }
  }

  return (
    <div className={styles.sub_section}>
      {antTokenAdddress ? (
        <form key={"approve"} className="form" onSubmit={handleSubmit}>
          <div className={styles.first_form_container}>
            <label htmlFor="SpenderAddress" className={styles.form_label_owner}>
              SpenderAddress :{" "}
            </label>
            <input
              type="text"
              id="spenderAddress"
              name="spenderAddress"
              className={styles.form_input}
              value={spenderAddress}
              onChange={(e) => setSpenderAddress(e.target.value)}
            />
          </div>
          <div className={styles.second_form_container}>
            <label htmlFor="amount" className={styles.amount_label}>
              Amount :{" "}
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className={styles.form_input}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className={styles.btn_wrapper}>
            <button
              type="submit"
              className={styles.allowence_btn}
              onClick={handleSubmit}
            >
              Set Allowance
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.result}>No Contract Deployed </div>
      )}
    </div>
  );
}
