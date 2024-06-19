import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import NavBar from "./components/navbar.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <NavBar />
      <App />
    </BrowserRouter>
  </Provider>
);
