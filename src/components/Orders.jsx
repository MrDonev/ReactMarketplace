import { useContext, useEffect, useState } from 'react';
import { getOrders } from '../Assets/api';
import { UserContext } from '../Assets/usercontext';

const Orders = () => {
  const user = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user.user.username) {
      getOrders(user.user.username).then((orders) => {
        setOrders(orders.items);
      });
    }
  }, [orders]);

  return (
    <section className="Main">
      {!orders.length && user.user.username ? (
        <p className='loading'>No previous orders</p>
      ) : user.user.username===undefined?<p className='loading'>Select user</p>: (
        <ul className="allItemsList">
          {orders.map((item) => {
            return (
              <div key={item.item_name} className="itemCard">
                <section className="itemImage">
                  <img src={item.img_url} alt="item_image" />
                </section>
                <section className="itemText">
                  <p>Item: {item.item_name}</p>
                  <p>Description: {item.description}</p>
                  <p>Price: {item.price} £</p>
                  <p>Category: {item.category_name}</p>
                  <section className="buttonSection"></section>
                </section>
              </div>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Orders;
