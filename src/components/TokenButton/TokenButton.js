import React from "react";
import {Coins} from "../../utility/constant";
import styles from "./TokenButton.css";


const TokenButton = ({selectedToken, onChange}) => {
    return (
        <div className="tokens">
            {Coins.map((coin, index) => {
                return (
                    <div
                        key={index}
                        className={`tokenButton ${selectedToken.label === coin.label ? "selected" : ""}`}

                        onClick={() => onChange(coin)}
                    >
                        <img
                            src={coin.icon}
                            className="buttonIcon"
                            alt="icon"
                        />
                        <span
                            className={`coinText ${selectedToken.label === coin.label ? "selectedText" : ""}`}
                            >{coin.label}</span>
                    </div>
                )
            })}
        </div>
    );
};

export default TokenButton;