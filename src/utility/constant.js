import BUSDIcon from "../assets/icons/busd-icon.svg";
import BitCoinIcon from "../assets/icons/bitcoin-icon.svg";
import EtherumIcon from "../assets/icons/etherum-icon.svg";
import BNBIcon from "../assets/icons/bnb-icon.svg";
import StripeIcon from "../assets/icons/stripe-icon.svg";

export const Coins = [
  { label: "BUSD", icon: BUSDIcon },
  { label: "WBTC", icon: BitCoinIcon },
  { label: "WETH", icon: EtherumIcon },
  { label: "BNB", icon: BNBIcon },
  { label: "Stripe", icon: StripeIcon },
];

//test
// export const PaymentContract = {
//   BNB: "0x0000000000000000000000000000000000000000",
//   BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
//   WBTC: "0xd15B482A08b44FA055Ad77dF5Cc99dae6E3A4184",
//   WETH: "0x9b9f1b34bC30e2789DB71eD18C749167880215Bd",
//   Stripe: "stripe",
// };

//main
export const PaymentContract = {
  BNB: "0x0000000000000000000000000000000000000000",
  BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  WBTC: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
  WETH: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
  Stripe: "stripe",
};


export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};