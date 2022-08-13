import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Popover } from "react-tiny-popover";
import { Coins } from "../utility/constant";

const InputText = ({ value, icon, position, onChange,handleChange,inputtoken }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginRight: 50 }}>
      <Popover
        onClickOutside={() => setIsPopoverOpen(false)}
        positions={position || ["bottom", "top"]}
        isOpen={isPopoverOpen}
        content={
          <div
            style={{
              backgroundColor: "#FFF",
              border: "1px solid #0052CC",
              borderRadius: 4,
              marginRight: 6
            }}
          >
            {Coins.map((coin, index) => (
              <div
                key={index}
                style={{
                  padding: "2px 8px",
                  borderBottom:
                    index + 1 === Coins.length ? "" : "1px solid #0052CC",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                    onChange(coin);
                    setIsPopoverOpen(false);
                }}
              >
                <span style={{ fontSize: 10, margin: 0, color: "#808080" }}>
                  {coin.label}
                </span>

                <img
                  src={coin.icon}
                  alt="icon"
                  style={
                    coin.label === "BUSD"
                      ? { height: 28, width: 28, textAlign: "right" }
                      : { height: 32, width: 32, textAlign: "right" }
                  }
                />
              </div>
            ))}
          </div>
        }
      >
        <div
          style={{ display: "grid", cursor: "pointer" }}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <img
            src={icon}
            alt="icon"
            style={
              value === "BUSD"
                ? { height: 28, width: 28, margin: "auto" }
                : { height: 32, width: 32, margin: "auto" }
            }
          />
          <span style={{ fontSize: 10, margin: 0, color: "#808080" }}>
            {value}
          </span>
        </div>
      </Popover>
      <div>
        <Form.Control
          type="text"
          id="inputBusd"
          value={inputtoken}
          onChange={handleChange}
          aria-describedby="passwordHelpBlock"
        />
      </div>
    </div>
  );
};

export default InputText;
