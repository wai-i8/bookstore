const CartItem = (props) => {
  const { bookCover, title, currentPrice, quantity, key } = props.book;
  return (
    <div className="cart-item">
      <div className="cart-item__content--left">
        <img src={bookCover} className="cart-item__bookcover" alt="bookCover" />
      </div>
      <div className="cart-item__content--right">
        <h3 className="font-500">{title}</h3>
        <span>${currentPrice}</span>
        <div className="cart-item__quantity-adjust">
          <span>數量：{quantity}</span>
          <span>合計：${quantity * currentPrice}</span>
          <button
            className="btn btn-purple"
            onClick={() => props.increase(key)}
          >
            <h2>+</h2>
          </button>
          <button
            onClick={() => props.decrease(key)}
            className="btn btn-purple"
          >
            <h2>-</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
