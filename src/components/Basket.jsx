import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../Assets/usercontext';
import { deleteFromBasket, getBasket } from '../Assets/api';

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const user = useContext(UserContext);
  useEffect(() => {
    getBasket(user.user.username).then((userBasket) => {
      setBasket(userBasket.items);
    });
  });
  const removeItemFromBasket = (userName, item_id) => {
    deleteFromBasket(item_id, userName)
      .then((deletedItem) => {
        console.log(deletedItem);
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  return !basket.length ? (
    <section className="Basket">
      <p>No items in the basket</p>
    </section>
  ) : (
    <section className="Main">
      <ul className="allItemsList">
        {basket.map((item) => {
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
                <section className="buttonSection">
                  <button>Purchase</button>
                  <button
                    onClick={() => {
                      if (window.confirm(`${item.item_name} added to basket!`))
                        removeItemFromBasket(user.user.username, item.item_id);
                    }}
                  >
                    Remove
                  </button>
                </section>
              </section>
            </div>
          );
        })}
      </ul>
    </section>
  );
};

export default Basket;
