import { useState } from "react";
import { useDispatch } from "react-redux";
import "./i18n";

import { useNavigate } from "./hooks";
import PageInMaintenance from "./components/page-in-maintenance/PageInMaintenance";
import { Header } from "./components/header/Header";
import { Navbar } from "./components/navbar/Navbar";
import { Spinner } from "./components/spinner/Spinner";

import MenuPage from "./pages/menu";
import ContactPage from "./pages/contact";
import LoginPage from "./pages/login";

import { applyThemeAndMetaTags } from "./utils";

import "./global.css";

const App = () => {
  const { route } = useNavigate();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const dispatch = useDispatch();

  const renderPage = () => {
    switch (route) {
      case "/": {
        return <MenuPage />;
      }
      case "/login": {
        return <LoginPage />;
      }
      case "/contact": {
        return <ContactPage />;
      }
      default: {
        return <PageInMaintenance pageExists={false} />;
      }
    }
  };

  applyThemeAndMetaTags("9", setIsPageLoading, dispatch);

  if (isPageLoading) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          animation: "slideDown 100ms forwards",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <Header />
      <section>
        <div className="page-container">{renderPage()}</div>
      </section>
    </main>
  );
};

export default App;
