import { Navbar } from "./components/navbar";
import "./global.css";
import { useNavigate } from "@/hooks";
import ContactPage from "./pages/contact";
import LoginPage from "./pages/login";
import MenuPage from "./pages/menu";

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
    }
  };

  return (
    <main>
      <Navbar />
      {renderPage()}
    </main>
  );
};

export default App;
