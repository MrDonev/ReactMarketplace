import { listNewItem } from '../Assets/api';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../Assets/usercontext';
const ListItem = () => {
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [itemAdded, setItemAdded] = useState({});
  const user=useContext(UserContext)

  function addListing(formObject) {
    const item_name = formObject[0].value;
    const description = formObject[1].value;
    const img_url = formObject[2].value;
    const price = formObject[3].value;
    const category_name = formObject[4].value;

    listNewItem(item_name, description, img_url, price, category_name)
      .then((newItem) => {
        setIsItemAdded(true);
        setItemAdded(newItem)
      })
      .catch((err) => {
        console.dir(err);
      });
  }

   const handleChange=(event)=>{
    const targ=event.target;

 if(event.target['value'].length<5)console.log(`too short`)
   }

  return isItemAdded === true ? (
    <div key={itemAdded.item.item_name} className="itemCard">
      <section className="itemImage">
        <img src={itemAdded.item.img_url} alt="item_image" />
      </section>
      <section className="itemText">
        <p>Item: {itemAdded.item.item_name}</p>
        <p>Description: {itemAdded.item.description}</p>
        <p>Price: {itemAdded.item.price} £</p>
        <p>Category: {itemAdded.item.category_name}</p>
      </section>
    </div>
  ) : (
    <form
      className="listingItem"
      onSubmit={(event) => {
        event.preventDefault();
        if(user.user.username){
          addListing(event.target);
        }else{
          alert(`Log in first`)
        }
      }}
    >
      <label>List an item</label>
      <input type="text"    onBlur={handleChange} placeholder="Item name"></input>
      <input type="text"  onBlur={handleChange} placeholder="Item description"></input>
      <input type="text"   onBlur={handleChange} placeholder="Item image url"></input>
      <input type="text"   onBlur={handleChange} placeholder="Price in GBP"></input>
      <select>
        <option value=''></option>
        <option value='Household'>Household</option>
        <option value='Electronics'>Electronics</option>
        <option value='Clothing'>Clothing</option>
        </select> 
      <input type="submit" value="List Item"></input>
    </form>
  );
};

export default ListItem;
