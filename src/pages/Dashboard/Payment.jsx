import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const stripePromise = loadStripe('pk_test_51RfmRYClpl7KizLAARWUBKxY3Pq3HK1mSTTyMbIozp9QIfUggN11yts4GeMCqUZR2l0gLpBRZAuo6GYm8GBarnDB00mgMpuMVJ');

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Payment;