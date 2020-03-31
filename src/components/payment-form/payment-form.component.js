import React, { Component } from "react";
import { Frames, CardNumber, ExpiryDate, Cvv } from "johnny-tools-frames-react";
import CustomButton from "../custom-button/custom-button.component";

import "./payment-form.styles.scss";

class PaymentFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      errorMessage: "",
      showPaymentMethod: false,
      paymentMethodIcon: "",
      payButton: false
    };
  }

  // Handle tokenisation
  cardTokenised = event => {
    this.props.onComplete(event.token);
  };

  // Handle card input validation changes
  validationChanged = () => {
    // enable or disable the payment button based on the validity of the card input
    this.setState({
      payButton: !window.Frames.isCardValid()
    });
  };

  // Handle card type detection
  paymentMethodChanged = event => {
    var pm = event.paymentMethod;
    if (!pm) {
      this.setState({
        showPaymentMethod: false
      });
    } else {
      this.setState({
        paymentMethodIcon: pm.toLowerCase(),
        showPaymentMethod: true
      });
    }
  };

  // Handle form submission
  handleSubmit = event => {
    event.preventDefault();
    Frames.submitCard();
  };

  render() {
    return (
      <div className="payment-form">
        <Frames
          config={{
            debug: true,
            publicKey: "pk_test_6e40a700-d563-43cd-89d0-f9bb17d35e73",
            localization: {
              cardNumberPlaceholder: "Card number",
              expiryMonthPlaceholder: "MM",
              expiryYearPlaceholder: "YY",
              cvvPlaceholder: "CVV"
            },
            style: {
              base: {
                fontSize: "17px"
              }
            }
          }}
          paymentMethodChanged={this.paymentMethodChanged}
          cardValidationChanged={this.validationChanged}
          cardTokenized={this.cardTokenised}
        >
          <label htmlFor="card-number">Card number</label>
          <div className="input-container card-number">
            <div className="icon-container">
              <img
                id="icon-card-number"
                src={require(`./card-icons/card.svg`)}
                alt="PAN"
              />
            </div>
            <CardNumber />
            {/* Display the payment icon only when needed */}
            {this.state.showPaymentMethod ? (
              <div className="icon-container payment-method">
                <img
                  id="logo-payment-method"
                  alt="payment method"
                  src={require(`./card-icons/${this.state.paymentMethodIcon}.svg`)}
                />
              </div>
            ) : null}
          </div>

          <div className="date-and-code">
            <div>
              <label htmlFor="expiry-date">Expiry date</label>
              <div className="input-container expiry-date">
                <div className="icon-container">
                  <img
                    id="icon-expiry-date"
                    src={require(`./card-icons/exp-date.svg`)}
                    alt="Expiry date"
                  />
                </div>
                <ExpiryDate />
              </div>
            </div>

            <div>
              <label htmlFor="cvv">Security code</label>
              <div className="input-container cvv">
                <div className="icon-container">
                  <img
                    id="icon-cvv"
                    src={require(`./card-icons/cvv.svg`)}
                    alt="CVV"
                  />
                </div>
                <Cvv />
              </div>
            </div>
          </div>

          <CustomButton
            id="pay-button"
            type="submit"
            disabled={this.state.payButton}
            onClick={this.handleSubmit}
          >
            PAY
          </CustomButton>

          <div>
            <span className="error-message error-message__card-number" />
            <span className="error-message error-message__expiry-date" />
            <span className="error-message error-message__cvv" />
          </div>

          <p className="success-payment-message" />
        </Frames>
      </div>
    );
  }
}

export default PaymentFrom;
