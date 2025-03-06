import { ChangeEvent, FC, useState } from "react";
import { createPortal } from "react-dom";

import { NAVBAR_ITEMS } from "./constants";
import { useBreakpoints, useNavigate } from "../../hooks/index";
import { CloseIcon, LeftArrowIcon, MenuIcon } from "../../assets/icons";

import "./navbar.css";
import { useTranslation } from "react-i18next";

export const Navbar: FC = () => {
  const { route } = useNavigate();
  const { isMobileOrTablet } = useBreakpoints();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation("common");

  const { i18n } = useTranslation();

  const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!e) return;
    i18n.changeLanguage(e.target.value);
  };

  const currentLanguage = i18n.language;

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
                  <a href={item.path}>{t(`common:nav.${item.name}`)}</a>
                  {isActive && <span />}
                </li>
              );
            })}
            <div className="language-select">
              <select onChange={changeLanguage} defaultValue={currentLanguage}>
                <option value="en">English</option>
                <option value="pt-BR">Português</option>
              </select>
            </div>
          </ul>
        )}
      </nav>

      {isMenuOpen &&
        isMobileOrTablet &&
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
                    <a href={item.path}>{t(`common:nav.${item.name}`)}</a>
                    {isActive && <span />}
                  </li>
                );
              })}
            </div>
            <div className="language-select">
              <select onChange={changeLanguage} defaultValue={currentLanguage}>
                <option value="en">English</option>
                <option value="pt-BR">Português</option>
              </select>
            </div>
          </nav>,
          document.body
        )}
    </>
  );
};
