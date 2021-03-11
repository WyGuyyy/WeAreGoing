import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

const paypal = require('paypal-rest-sdk');

class PaypalButton extends React.Component {
  
  render() {

    //const { amount, onSuccess, onCancel, paypalClick, currency } = this.props;
    const { amount, currency, onApprove } = this.props;

    const  card = "card";
    const credit = "Credit";

    return (
        <div >
            <PayPalButton
                amount={amount}
                currency={currency}
                onApprove={(data, actions) => onApprove(data, actions)}
                options={{
                  disableFunding: credit,
                  clientId: "AdI2x6gGA-HRug3XKCYqiwk-MVDMmBbU1wbf03GJq2S9qaaGwI8XBppUIu_z7edajkVHr16cGojDBOCq" // Live Client ID
                  //clientId: "Aa9IbDS7OS79cp3KX3KHQSL4cnLNXqpJ6Kx1LTNkacmeGWmsx-2x_ukP-rvx97exOXQat0tiJvXy_SId" //Sandbox Client ID
                }}
            />
        </div>
    );

  }
}
export default PaypalButton;

//createOrder={(data, actions) => createOrder(data, actions)}
//                onClick={paypalClick}
//                onCancel={(data) => onCancel(data)}