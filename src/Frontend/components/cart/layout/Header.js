import React from "react";
import { useState } from "react";
import FeastoFood from "../../../../assets/FeastoFood.png";
import Cart from "../Cart";
import { useCart } from "../../../store/CartContext";
import CartIcon from "../CArtIcons";
import classes from "./Header.module.css";

const Header = (props) => {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const cartCtx = useCart();

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const cartVisibilityHandler = () => {
    setCartIsVisible(true);
  };

  const hideCartHandler = () => {
    setCartIsVisible(false);
  };

  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Feasto</h1>
        <button className={classes.button} onClick={cartVisibilityHandler}>
          <CartIcon />
          <span>Your Cart</span>
          <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
      </header>
      <div className={classes["main-image"]}>
        <div className={classes["image-placeholder"]}>
          <img src={FeastoFood} alt="A table full of delicious food!" loading="lazy" />
        </div>
      </div>
      {cartIsVisible && <Cart onClose={hideCartHandler} />}
    </React.Fragment>
  );
};

export default Header;
