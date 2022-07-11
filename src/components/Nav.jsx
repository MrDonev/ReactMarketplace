import { Link } from "react-router-dom";


const Nav = () => {

  return (
    <>
      <section className="Nav">
        <h3>Available categories:</h3>
        <section className="categories">
          <Link to="/">All items</Link>
          <Link to="/Electronics">Electronics</Link>
          <Link to="/Clothing">Clothing</Link>
          <Link to="/Household">Household</Link>
          <Link to="/listItem">List an Item</Link>
          <Link to='/orders'>Orders</Link>
        </section>
        <section></section>
      </section>
    </>
  );
};

export default Nav;
