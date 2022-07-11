import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../Assets/usercontext';
import { addToBasket, database, removeItem, purchaseItem } from '../Assets/api';

const Items = () => {
  const user = useContext(UserContext);
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [listOfAllItems, setListOfAllItems] = useState([]);

  useEffect(() => {
    database
      .get('/items', {
        params: {
          category_name: category,
        },
      })
      .then((res) => {
        setLoading(false);
        setListOfAllItems(res.data.items);
      });
  }, [category, listOfAllItems]);
  const addItemToBasket = (username, item_id) => {
    addToBasket(item_id, username).then((newItem) => {
    });
  };

  function removeListing(item_id) {
    removeItem(item_id)
      .then((deletedItem) => {
        setListOfAllItems(listOfAllItems);
      })
      .catch((err) => {
        console.dir(err);
      });
  }
  
  function orderItem(username,item_id){
purchaseItem(username,item_id).then((itemPurchased)=>{
alert(`${itemPurchased.item.item_name} purchased successfuly!`)
})
  }

  return (
    <section className="Main">
      {!listOfAllItems.length && loading === true ? (
        <p className="loading">...Loading items</p>
      ) : (
        <ul className="allItemsList">
          {listOfAllItems.map((item) => {
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
                    <button
                      onClick={() => {
                        if (
                          window.confirm(`${item.item_name} added to basket!`)
                        )
                          addItemToBasket(user.user.username, item.item_id);
                      }}
                    >
                      Add to basket
                    </button>
                    <button onClick={() => {
                        if (
                          window.confirm(`Confirm purchasing ${item.item_name}`)
                        )
                          orderItem(user.user.username,item.item_id);
                      }}>Purchase</button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(`${item.item_name} is going to be removed!`)
                        )
                          removeListing(item.item_id);
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
      )}
    </section>
  );
};

export default Items;
