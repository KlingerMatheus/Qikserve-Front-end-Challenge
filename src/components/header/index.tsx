import BurgerHeader from "@/assets/burger-header.jpeg";
import BurgerLogo from "@/assets/burger-logo.png";
import "./style.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="overlay-background" />
      <img className="header" src={BurgerHeader} />
      <img className="logo" src={BurgerLogo} />
    </div>
  );
};

export default Header;
