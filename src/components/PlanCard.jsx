import React, { useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "../pages/styles.module.css";

import "./plans.css";
import { useModal } from "@motor-js/core";
import ContactUs from "./ContactUsForm";
// id: 0,
// title: "FREE",
// perUsers: "Individual",
// fee: "Nothing, its free!",
// isMostPopular: false,
// descriptions: {text: "", icon" ""}

export const PlanCard = (props) => {
  const price = props.plan;
  const { isShowing, toggle } = useModal();
  const [checkedValue, setCheckedValue] = useState(null);

  return (
    <React.Fragment>
      <div className="col col--3">
        <div
          style={
            props.isMostPopular ? { border: "2px solid var(--redBrand)" } : {}
          }
          className="card plan-card"
        >
          <div className="card__header">
            <div className="price-title">{price.title}</div>
          </div>
          <div className="price-sub text--center">{price.perUsers}</div>
          <div className="price-sub text--center">{price.perUsers2}</div>
          <br />
          <h4 className="text--center">{price.fee}</h4>

          <div className="feat-box">
            {price.descriptions.map((description) => {
              if (description.access) {
                return (
                  <div key={description.text} className="d-flex mb-2 features">
                    <FontAwesomeIcon
                      icon={description.icon || faCheckCircle}
                      size="lg"
                      className="text--primary mr-1"
                    />
                    <div className="feat-text text--left">
                      {description.text}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={description.text}
                    className="d-flex mb-2 unav-features"
                  >
                    <FontAwesomeIcon
                      icon={description.icon || faTimesCircle}
                      size="lg"
                      className="unav-icon"
                    />
                    <div className="unav-feat-text text--left">
                      {description.text}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          {price.title === "NON COMMERCIAL" ? (
            <div className="plan-button">
              <Link
                id="button1"
                className={clsx("button b1 button--lg", styles.button)}
                to={useBaseUrl("docs/Getting%20Started")}
              >
                {price.actionName}
              </Link>
            </div>
          ) : (
            <div className="plan-button">
              <Link
                id="button2"
                className={clsx("button b1 button--lg", styles.button)}
                // to={useBaseUrl("docs/Getting%20Started")}
                // onClick={toggle}
                onClick={() => {
                  toggle();
                  setCheckedValue(price.title);
                }}
              >
                {price.actionName}
              </Link>
              <ContactUs
                isShowing={isShowing}
                onToggle={toggle}
                checkedValue={checkedValue}
              />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
