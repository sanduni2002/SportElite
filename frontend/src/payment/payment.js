// payment.js

import axios from "axios";
import StripeCheckout from 'react-stripe-checkout';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import "./Gateway.css"



/*const Payment = () => {
  const handleToken = (totalAmount, token) => {
    try {
      axios.post("http://localhost:5000/api/stripe/pay", {
        token: token.id,
        amount: totalAmount,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const tokenHandler = (token) => {
    handleToken(100, token);
  };*/

  const Payment= () => {
    
    
    const [stripeToken, setStripeToken] = useState(null);

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:5000/api/stripe/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: 100,
                        email: stripeToken.email,
                        
                    }
                );
                console.log(res.data);
                swal({
                  title: "Payment Successful!",
                  text: "Your payment has been processed successfully.",
                  icon: "success",
                  button: "OK",
                });

             
            } catch (err) {
                console.log(err);
                swal({
                  title: "Payment Unsuccessful!",
                  text: "There was an error processing your payment. Please try again later.",
                  icon: "error",
                  button: "OK",
                });
                
            }
        };
        

        if (stripeToken) {
            makeRequest();
        }
    }, [stripeToken]);


  return (
    <div>

      
      <StripeCheckout
        name="SportElite"
        image="https://stripe.com/img/documentation/checkout/marketplace.png"
        billingAddress
        description="Registration fee $1"
        amount={100}
        token={onToken}
        stripeKey={"pk_test_51P7zHR008C48mjTvg38YBWnLV6gTnNT9een2jlwbNdbvvs1UvaXnmMQGewgnSmY6yJj5Ld2aFNipSCEyhkUpM5dq00ksDamBg9"}
        
      >

          <button
              className="btn btn-primary"
              style={{
                backgroundColor: 'blue',
                color: 'white',
                borderRadius: '5px',
                padding: '10px 20px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Pay Now
            </button>
      </StripeCheckout>



    </div>
  );
};

export default Payment;
