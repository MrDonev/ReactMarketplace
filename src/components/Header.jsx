import { Link } from "react-router-dom";
import BasketIcon from "../Assets/basket.webp";
import ProfileIcon from "../Assets/profile.png";
import HomeIcon from "../Assets/home.png";
import { useContext } from "react";
import { UserContext } from "../Assets/usercontext";
import User from "./user";
const Header = () => {
  const user = useContext(UserContext);
  return (
    <section className="Header">
      <h1>D & T`s marketplace</h1>
      <section className="headerLinks">
        <Link to={"/"}>
          <img id="home" src={HomeIcon} alt="home" />
        </Link>
        <Link to={"/users"}>
          <img id="profile" src={ProfileIcon} alt="profile" />
        </Link>
        <Link to={"/basket"}>
          <img id="basket" src={BasketIcon} alt="basket" />
        </Link>
        <User />
      </section>
    </section>
  );
};

export default Header;
