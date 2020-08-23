import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./POCForm.css"; // Import regular stylesheet
import clsx from "clsx";
import styles from "../pages/styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

// import { ModalWrapper, ModalOverlay } from "./POCFormTheme";

const ProofofConceptForm = ({
  isShowing,
  children,
  header,
  footer,
  width,
  top,
  zIndex,
  onToggle,
  checkedValue,
  ...rest
}) => {
  const numWidth = Number(width.replace("%", "").replace("vw", ""));

  const FORM_ID = `1612559`;
  const FORM_URL = `https://app.convertkit.com/forms/${FORM_ID}/subscriptions`;

  const [email, setEmail] = useState(null);
  const [status, setStatus] = useState(null);
  const [consent, setConsent] = useState(false);

  const toggle = () => {
    setStatus(null);
    onToggle();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    try {
      const response = await fetch(FORM_URL, {
        method: "post",
        body: data,
        headers: {
          accept: "application/json",
        },
      });
      setEmail("");
      const json = await response.json();
      // console.log(json);
      if (json.status === "success") {
        setStatus("SUCCESS");
        return;
      }
      if (json.status === "failed") {
        setStatus("ERROR");
        return;
      }
    } catch (err) {
      setStatus("ERROR");
      // console.log(err);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleCheck = (event) => {
    setConsent(event.target.checked);
  };

  const myRef = useRef();

  const handleClickOutside = (e) => {
    if (myRef.current && !myRef.current.contains(e.target)) {
      toggle();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return isShowing
    ? ReactDOM.createPortal(
        <>
          {/* <ModalOverlay>
            <ModalWrapper
              width={width}
              numWidth={numWidth}
              top={top}
              zIndex={zIndex}
              ref={myRef}
            > */}
          <form
            action="https://app.convertkit.com/forms/1612559/subscriptions"
            className="seva-form formkit-form"
            method="post"
            data-sv-form="1612559"
            data-uid="0431924738"
            data-format="modal"
            data-version="5"
            data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"facebook":null,"segment":null,"pinterest":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com?utm_source=dynamic&amp;utm_medium=referral&amp;utm_campaign=poweredby&amp;utm_content=form"},"recaptcha":{"enabled":true},"return_visitor":{"action":"hide","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
            min-width="400 500 600 700 800"
            // style="background-color: rgb(255, 255, 255); border-radius: 10px;"
            onSubmit={handleSubmit}
          >
            <div data-style="full" style={{ "--bg-border-radius": "5px" }}>
              <div data-element="column" className="formkit-column">
                <div
                  className="formkit-header"
                  data-element="header"
                  style={{ color: "rgb(55, 63, 69)", fontWeight: 700 }}
                >
                  <h1>
                    Need a Proof of Concept? We will build you one for free.
                  </h1>
                </div>
                <div
                  className="formkit-content"
                  data-element="content"
                  style={{ color: "rgb(105, 113, 119)" }}
                >
                  <p>
                    Get in touch via the below form and see what's possible in
                    motor js.
                  </p>
                </div>
                <ul
                  className="formkit-alert formkit-alert-error"
                  data-element="errors"
                  data-group="alert"
                ></ul>
                <div
                  data-element="fields"
                  data-stacked="true"
                  className="seva-fields formkit-fields"
                >
                  <div className="formkit-field">
                    <input
                      className="formkit-input"
                      name="email_address"
                      placeholder="Name"
                      required=""
                      type="email"
                      style={{
                        color: "rgb(105, 113, 119)",
                        backgroundColor: "rgb(243, 246, 249)",
                        borderRadius: "5px",
                        fontWeight: 400,
                      }}
                    />
                  </div>
                  <div className="formkit-field">
                    <input
                      className="formkit-input"
                      aria-label="Email Address"
                      name="fields[undefined]"
                      required=""
                      placeholder="Email Address"
                      type="text"
                      style={{
                        color: "rgb(105, 113, 119)",
                        backgroundColor: "rgb(243, 246, 249)",
                        borderRadius: "5px",
                        fontWeight: "400",
                      }}
                    />
                  </div>
                  <div className="formkit-field">
                    <input
                      className="formkit-input"
                      aria-label="Phone number"
                      name="fields[phone_number]"
                      required=""
                      placeholder="Phone number"
                      type="text"
                      style="
              color: rgb(105, 113, 119);
              background-color: rgb(243, 246, 249);
              border-radius: 5px;
              font-weight: 400;
            "
                    />
                  </div>
                  <div className="formkit-field">
                    <input
                      className="formkit-input"
                      aria-label="Company"
                      name="fields[company]"
                      required=""
                      placeholder="Company"
                      type="text"
                      style="
              color: rgb(105, 113, 119);
              background-color: rgb(243, 246, 249);
              border-radius: 5px;
              font-weight: 400;
            "
                    />
                  </div>
                  <button
                    data-element="submit"
                    className="formkit-submit formkit-submit"
                    style="
            color: rgb(255, 255, 255);
            background-color: rgb(120, 94, 223);
            border-radius: 5px;
            font-weight: 700;
          "
                  >
                    <div className="formkit-spinner">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <span>Request Callback</span>
                  </button>
                </div>
                <div
                  className="formkit-disclaimer"
                  data-element="disclaimer"
                  style="color: rgb(105, 113, 119);"
                >
                  We respect your privacy. Unsubscribe at any time.
                </div>
                <div className="formkit-powered-by-convertkit-container">
                  <a
                    href="https://convertkit.com?utm_source=dynamic&amp;utm_medium=referral&amp;utm_campaign=poweredby&amp;utm_content=form"
                    data-element="powered-by"
                    className="formkit-powered-by-convertkit"
                    data-variant="dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Built with ConvertKit
                  </a>
                </div>
              </div>
              <div
                data-element="column"
                className="formkit-background"
                style="
        background-image: url('https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjExODA0N30&amp;utm_source=convertkit&amp;utm_medium=referral&amp;utm_campaign=api-credit?fit=max&amp;w=800');
      "
              ></div>
            </div>
          </form>
          {/* </ModalWrapper>
          </ModalOverlay> */}
        </>,
        document.body
      )
    : null;
};

ProofofConceptForm.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.node,
  header: PropTypes.node,
  width: PropTypes.oneOf([
    "10%",
    "20%",
    "30%",
    "40%",
    "50%",
    "60%",
    "70%",
    "80%",
    "90%",
    "100%",
    "10vw",
    "20vw",
    "30vw",
    "40vw",
    "50vw",
    "60vw",
    "70vw",
    "80vw",
    "90vw",
    "10vw",
  ]),
  zIndex: PropTypes.string,
};

ProofofConceptForm.defaultProps = {
  children: undefined,
  footer: undefined,
  header: undefined,
  width: "70vw",
  top: "5%",
  zIndex: "1050",
};

export default ProofofConceptForm;
