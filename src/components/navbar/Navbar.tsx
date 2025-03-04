import { FC, useState } from "react";
import { createPortal } from "react-dom";

import { NAVBAR_ITEMS } from "./constants";
import { useBreakpoints, useNavigate } from "@/hooks/index";
import { CloseIcon, LeftArrowIcon, MenuIcon } from "@/assets/icons";

import "./navbar.css";

export const Navbar: FC = () => {
  const { route } = useNavigate();
  const { isMobileOrTablet } = useBreakpoints();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        {isMobileOrTablet && (
          <>
            <div className="icon-container">
              <LeftArrowIcon style={{ visibility: "hidden" }} />
            </div>
            <h1 className="label">Menu</h1>

            <div onClick={() => setIsMenuOpen(true)} className="icon-container">
              <MenuIcon />
            </div>
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
              {NAVBAR_ITEMS.map((item) => {
                const isActive = route === item.path;

                return (
                  <li key={item.name} className="item">
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
