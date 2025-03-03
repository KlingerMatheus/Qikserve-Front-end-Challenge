import { FC, useState } from "react";
import { NAVBAR_ITEMS } from "./constants";
import { useBreakpoints, useNavigate } from "@/hooks/index";
import { CloseIcon, MenuIcon } from "@/assets/icons";
import "./style.css";
import { createPortal } from "react-dom";

export const Navbar: FC = () => {
  const { route } = useNavigate();
  const device = useBreakpoints();
  const isMobileOrTablet = ["mobile", "tablet"].includes(device);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        {isMobileOrTablet && (
          <>
            <div />
            <h1 className="label">Menu</h1>
            <button
              className="icon-container"
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          </>
        )}

        {!isMobileOrTablet && (
          <ul>
            {NAVBAR_ITEMS.map((item) => {
              const isActive = route === item.path;

              return (
                <li key={item.name} className={isActive ? "active" : ""}>
                  <a href={item.path}>{item.name}</a>
                  {isActive && <span />}
                </li>
              );
            })}
          </ul>
        )}
      </nav>

      {isMenuOpen &&
        createPortal(
          <nav className="mobile-navbar">
            <button
              className="close-button-icon"
              onClick={() => setIsMenuOpen(false)}
            >
              <CloseIcon color="gray" aria-label="Close Menu" />
            </button>
            <div className="mobile-navbar-items">
              {NAVBAR_ITEMS.map((item, index) => {
                const isActive = route === item.path;

                return (
                  <li key={item.name} className={`item delay- ${index}`}>
                    <a href={item.path}>{item.name}</a>
                    {isActive && <span />}
                  </li>
                );
              })}
            </div>
          </nav>,
          document.body
        )}
    </>
  );
};
