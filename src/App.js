import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import OrderPage from "./components/OrderPage/OrderPage";

const App = (props) => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/order/:stepOrder" element={<OrderPage />} />
      </Routes>
    </div>
  );
};

export default App;
