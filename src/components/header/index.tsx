import BurgerHeader from "@/assets/burger-header.webp";
import BurgerLogo from "@/assets/burger-logo.webp";
import "./style.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="overlay-background" />
      <img
        className="header"
        src={BurgerHeader}
        alt="Burger Header"
        loading="lazy"
      />
      <img className="logo" src={BurgerLogo} alt="Burger Logo" loading="lazy" />
    </div>
  );
};

export default Header;
