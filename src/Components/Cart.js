import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../Store/cart-Slice";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import CartItem from "./CartItem";
import ConfirmMessage from "./ConfirmMessage";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { isLoggedIn, userId, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch(cartAction.replaceCart(JSON.parse(storedCart)));
    }
  }, [dispatch]);

  const priceOfEeveyItem = cartItems.map((book) => {
    const price = book.currentPrice;
    return book.quantity * price;
  });
  const totalPrice = priceOfEeveyItem.reduce(
    (preValue, curValue) => preValue + curValue,
    0
  );
  const decreaseItem = (id) => {
    dispatch(cartAction.decreaseItem(id));
  };

  const addItem = (id) => {
    dispatch(cartAction.increaseItem(id));
  };

  const itemsList = cartItems.map((book) => (
    <CartItem book={book} decrease={decreaseItem} increase={addItem} />
  ));

  const clearHandler = () => {
    dispatch(cartAction.deleteAllItem());
  };

  let clearDisabled = false;
  if (totalPrice === 0) {
    clearDisabled = true;
  }

  const orderConfirmHandler = async () => {
    setShowConfirm(true);
    setIsLoading(true);
    try {
      const respond = await fetch(
        `https://bookstore-3c010-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`
      );
      if (respond.ok) {
        const data = await respond.json();
        setAddress(data.email);
        setIsLoading(false);
      } else {
        const data = await respond.json();
        throw new Error(data.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const newOrderHandler = async () => {
    try {
      const respond = await fetch(
        `https://bookstore-3c010-default-rtdb.firebaseio.com/orders.json?auth=${token}`,
        {
          method: "POST",
          body: JSON.stringify({
            ...cartItems,
            buyerId: userId,
            email: address,
            orderDate: today,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (respond.ok) {
        const result = await respond.json();
        const responseOfAddOrderToUser = await fetch(
          `https://bookstore-3c010-default-rtdb.firebaseio.com/users/${userId}/orders/${result.name}.json?auth=${token}`,
          {
            method: "PUT",
            body: JSON.stringify({
              orderId: result.name,
              status: "pending for delivery",
              orderDate: today,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!responseOfAddOrderToUser.ok) {
          throw new Error(responseOfAddOrderToUser.error.message);
        }
        clearHandler();
        closeConfirmHandler();
        navigate("orderslist");
      } else {
        const result = await respond.json();
        throw new Error(result.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const closeConfirmHandler = () => {
    setShowConfirm(false);
  };

  return (
    <Fragment>
      <div className="cart" onClick={(e) => e.stopPropagation()}>
        <div className="cart__content">{itemsList}</div>
        <div className="cart__total">
          <h3 className="font-500">總價：${totalPrice}</h3>
          <button
            className="btn btn-purple"
            onClick={clearHandler}
            disabled={clearDisabled}
          >
            清空
          </button>
          {isLoggedIn && (
            <button
              className="btn btn-purple"
              disabled={clearDisabled}
              onClick={orderConfirmHandler}
            >
              下單
            </button>
          )}
          {isLoggedIn && (
            <button className="btn btn-purple">
              <Link to="orderslist">我的訂單</Link>
            </button>
          )}
        </div>
      </div>
      {showConfirm &&
        createPortal(
          <Backdrop>
            <ConfirmMessage
              close={closeConfirmHandler}
              message={`寄送地址：${address}`}
              loading={isLoading}
              confirm={newOrderHandler}
            />
          </Backdrop>,
          document.getElementById("confirm-message")
        )}
    </Fragment>
  );
};

export default Cart;
