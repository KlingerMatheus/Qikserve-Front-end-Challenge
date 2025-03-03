import { Navbar } from "./components/navbar";
import "./global.css";
import { useNavigate } from "@/hooks";
import ContactPage from "./pages/contact";
import LoginPage from "./pages/login";
import MenuPage from "./pages/menu";
import Header from "./components/header";
import PageInMaintenance from "./components/page-in-maintenance";
import { Provider } from "react-redux";
import store from "@/store";

const App = () => {
  const { route } = useNavigate();

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

  return (
    <main>
      <Navbar />
      <Header />
      <section>
        <Provider store={store}>
          <div className="page-container">{renderPage()}</div>
        </Provider>
      </section>
    </main>
  );
};

export default App;
