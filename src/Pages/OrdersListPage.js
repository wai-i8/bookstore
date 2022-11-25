import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrdersListItem from "../Components/OrdersListItem";

const OrdersListPage = (props) => {
  const { userId, token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [ordersList, setOrdersList] = useState(null);
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      const respond = await fetch(
        `https://bookstore-3c010-default-rtdb.firebaseio.com/users/${userId}/orders.json?auth=${token}`
      );
      if (respond.ok) {
        const data = await respond.json();
        let temp = [];
        for (let key in data) {
          temp.push(data[key]);
        }
        setOrdersList(temp);
      } else {
        const data = await respond.json();
        throw Error(data.error.message);
      }
    };
    fetchOrderData()
      .then(() => {
        if (ordersList && ordersList.length > 0) {
          const tempList = ordersList.map((item) => {
            return (
              <OrdersListItem
                orderId={item.orderId}
                orderStatus={item.status}
                orderDate={item.orderDate}
              />
            );
          });
          setList(tempList);
        } else {
          setList(<OrdersListItem />);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setIsLoading(false);
      });
  }, [ordersList, userId, token]);

  return (
    <div className="orders-list-page">
      <div className="signup__title border-bottom-basic">
        <div className="signup__title__options-container">
          <h2 className="signup__title__company-name">訂單記錄</h2>
        </div>
      </div>
      <div className="orders-list-page__content">
        {!isLoading ? list : <h3>Loading ...</h3>}
      </div>
    </div>
  );
};

export default OrdersListPage;
