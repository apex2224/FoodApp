import React from "react";
import { CartProvider } from "./Frontend/store/CartContext";
import Header from "./Frontend/components/cart/layout/Header";
import Meals from "./Frontend/components/Meals/Meals";

const App = () => {
  return (
    <CartProvider>
      <React.Fragment>
        <Header />
        <main>
          <Meals />
        </main>
      </React.Fragment>
    </CartProvider>
  );
};

export default App;
