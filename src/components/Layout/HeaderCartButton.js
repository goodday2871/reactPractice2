import React, { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css'


const HeaderCartButton = (props)=>{
  const [btnIsHighlighted, setBtnIsHighlight] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce(
    (currentNumber, item)=>{
      return currentNumber + item.amount
    },0)

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
    useEffect(()=>{
      if(items.length === 0){
        return;
      }
      setBtnIsHighlight(true);
      const timer = setTimeout(() => {
        setBtnIsHighlight(false);
      }, 300);
      return ()=>{
        clearTimeout(timer);
      }
    },[items]);
  return <button className={btnClasses} onClick={props.showCart}>
      <span className={classes.icon}>
          <CartIcon />
        </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
          {numberOfCartItems}
      </span>
  </button>
}

export default HeaderCartButton;