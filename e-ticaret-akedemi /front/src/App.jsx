import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./views/Home.jsx";
import Layout from "./component/Layout.jsx";
import Login from "./component/LoginAndRegister/Login.jsx";
import Register from "./component/LoginAndRegister/Register.jsx";
import Hak from "./component/Hakkımızda/Hakkımızda.jsx";
import Product from "./component/Products/Products.jsx";
import Basket from "./views/basket.jsx";
import AuthCheck from './component/AuthCheck.jsx';
import AdminPanel from "./views/AdminPanel.jsx";
import PanelNavbar from "./component/PanelComp/PanelNavbar.jsx";
import AddProduct from "./component/PanelComp/AddProduct.jsx";
import Urunler from "./component/PanelComp/Urunler.jsx";

import PrivateRoute from "./PrivateRoute.jsx" // PrivateRoute bileşenini ekleyin

function App() {
    return (
      <Routes>
        <Route element={<AuthCheck />}>
          <Route element={<Layout />}>
            <Route path="/sepet" element={<Basket />} />
            <Route path="/product" element={<Product />} />
            <Route path="/hakkimizda" element={<Hak />} />
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <>
                <PanelNavbar />
                <AdminPanel />
                <AddProduct />
                <Urunler />
              </>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
}

export default App;
