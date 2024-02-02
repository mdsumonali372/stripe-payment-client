import { StripeProvider, Elements } from "react-stripe-elements";
import PaymentForm from "./components/PaymentForm";

function App() {
  return (
    <>
      <StripeProvider apiKey={import.meta.env.VITE_STRIPE_PUBLIC_KEY}>
        <Elements>
          <PaymentForm />
        </Elements>
      </StripeProvider>
    </>
  );
}

export default App;
