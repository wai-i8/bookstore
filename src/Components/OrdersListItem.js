const OrdersListItem = (props) => {
  if (!props.orderId && !props.orderStatus && !props.orderDate) {
    return (
      <div className="orders-list-item--not-found">
        <h3>沒有訂單</h3>
      </div>
    );
  }
  return (
    <div className="orders-list-item">
      <h3>訂單編號：{props.orderId}</h3>
      <span>訂單狀態：{props.orderStatus}</span>
      <span>下單日期：{props.orderDate}</span>
    </div>
  );
};

export default OrdersListItem;
