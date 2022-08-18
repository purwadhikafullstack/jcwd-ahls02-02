import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Homepage from "./Pages/Homepage/Homepage";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import ForgotPasswordPage from "./Pages/Auth/ForgotPasswordPage";
import VerificationPage from "./Pages/Auth/VerificationPage";
import ResetPasswordPage from "./Pages/Auth/ResetPasswordPage";
import CartPage from "./Pages/Cart/CartPage";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import PaymentPage from "./Pages/Checkout/PaymentPage";
import OrderListPage from "./Pages/Order/OrderListPage";
import PerscriptionPage from "./Pages/Order/PerscriptionPage";
import ProductDetailPage from "./Pages/Products/ProductDetailPage";
import ProductPage from "./Pages/Products/ProductPage";
import ProfilePage from "./Pages/User/ProfilePage";
import DashboardPage from "./Pages/Admin/DashboardPage";
import AdminOrderPage from "./Pages/Admin/Order/AdminOrderPage";
import AdminPerscriptionPage from "./Pages/Admin/Order/AdminPerscriptionPage";
import AdminProductPage from "./Pages/Admin/Product/AdminProductPage";
import AdminCategoryPage from "./Pages/Admin/Product/CategoryPage";
import ReportPage from "./Pages/Admin/Report/ReportPage";

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/auth/register' element={<RegisterPage />} />
        <Route path='/auth/forgot' element={<ForgotPasswordPage />} />
        <Route path='/auth/verification/:token' element={<VerificationPage />} />
        <Route path='/auth/reset/:token' element={<ResetPasswordPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/order' element={<OrderListPage />} />
        <Route path='/perscription' element={<PerscriptionPage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/product/detail' element={<ProductDetailPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/admin' element={<DashboardPage />} />
        <Route path='/admin/order' element={<AdminOrderPage />} />
        <Route path='/admin/perscription' element={<AdminPerscriptionPage />} />
        <Route path='/admin/product' element={<AdminProductPage />} />
        <Route path='/admin/product/category' element={<AdminCategoryPage />} />
        <Route path='/admin/report' element={<ReportPage />} />
      </Routes>
    </div>
  );
}

export default App;
