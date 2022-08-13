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

export const PaymentContract = {
  BNB: "0x0000000000000000000000000000000000000000",
  BUSD: "0xFd6a8739Ce434f5cB52FB4d4E0DBeA4a9cB25532",
  WBTC: "0xd15B482A08b44FA055Ad77dF5Cc99dae6E3A4184",
  WETH: "0x9b9f1b34bC30e2789DB71eD18C749167880215Bd",
  Stripe: "stripe",
};
