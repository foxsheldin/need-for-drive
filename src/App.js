import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import OrderPage from "./components/OrderPage/OrderPage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/order/:stepOrder" element={<OrderPage />} />
        <Route path="/order/confirm/:order" element={<OrderPage />} />
      </Routes>
    </div>
  );
};

export default App;
