import React from "react";
import { ProgressBar } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import BUSDIcon from "../assets/icons/busd-icon.svg";
import LogoIcon from "../assets/icons/logo.svg";
import moment from "moment";

const CardComponent = ({
  title,
  discount,
  unitPrice,
  progressBar,
  sdate,
  edate,
}) => {
  function checkBetween(date2, date3) {
    const check = moment().isBetween(date2, date3);
    return check;
  }
  const checkAfterDate = (edate) => {
    return moment().isAfter(edate);
  };
  return (
    <Card className={checkBetween(sdate, edate) ? "active-supply-card" : "non-active-supply-card"}>
      <Card.Body>
        <Card.Header className={checkBetween(sdate, edate) ? "customCard card-header-active" : "supply-card card-header-inactive"}>
          <div className="card-header-color">
            <h5>
              {`${sdate.format("D")}`}
              <sup>th</sup>&nbsp;
              {sdate.format("MMMM")}
              &nbsp;to {edate.format("D")}
              <sup>th</sup> {edate.format("MMMM")} 2022
            </h5>
            <h2 className="price-title">{title}</h2>
          </div>
        </Card.Header>
        <div className="price-info">
          <h3 className={checkBetween(sdate, edate) ? "active" : ""}>
            <span className="discount">DISCOUNT</span> {discount}
          </h3>
        </div>
        <div className="price-info" style={{ marginTop: 60 }}>
          <p
            style={{
              marginBottom: "0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            AMOUNT
            <img
              src={LogoIcon}
              alt="price-amount"
              style={{ width: 24, height: 24, marginLeft: 6 }}
            />
          </p>
          <h3 className="amountPrice">25,000</h3>
        </div>
        <div className="price-info" style={{ marginTop: 30 }}>
          <p
            style={{
              marginBottom: "0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            UNIT PRICE
            <img
              src={BUSDIcon}
              alt="price-amount"
              style={{ width: 21, height: 21, marginLeft: 6 }}
            />
          </p>
          <h1 className="unitPrice">{unitPrice}</h1>
        </div>
        <div>
          <div>
            <p className="percentage">
              {checkBetween(sdate, edate)
                ? "56%"
                : checkAfterDate(edate)
                  ? "89%"
                  : "0%"}
            </p>
          </div>
          <ProgressBar
            now={
              checkBetween(sdate, edate)
                ? 56
                : checkAfterDate(edate)
                  ? 89
                  : progressBar
            }
            className="progressBar"
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
