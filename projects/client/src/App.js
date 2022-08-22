import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import Homepage from "./Pages/Homepage/Homepage";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import VerificationPage from "./Pages/Auth/VerificationPage";
import CartPage from "./Pages/Cart/CartPage";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import PaymentPage from "./Pages/Checkout/PaymentPage";
import OrderListPage from "./Pages/Order/OrderListPage";
import PrescriptionPage from "./Pages/Order/PrescriptionPage";
import ProductDetailPage from "./Pages/Products/ProductDetailPage";
import ProductPage from "./Pages/Products/ProductPage";
import ProfilePage from "./Pages/User/ProfilePage";
import DashboardPage from "./Pages/Admin/DashboardPage";
import AdminOrderPage from "./Pages/Admin/Order/AdminOrderPage";
import AdminPerscriptionPage from "./Pages/Admin/Order/AdminPerscriptionPage";
import AdminProductPage from "./Pages/Admin/Product/AdminProductPage";
import AdminCategoryPage from "./Pages/Admin/Product/CategoryPage";
import ReportPage from "./Pages/Admin/Report/ReportPage";
import Cookies from "js-cookie";
import { API_URL } from "./helper";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./Redux/Actions/userAction";
import ForgotPasswordPage from "./Pages/Auth/ForgotPasswordPage";
import NotFoundPage from "./Pages/404";
import Navbar from "./Components/Navbar";

function App() {

  const dispatch = useDispatch();
  const { role } = useSelector((state) => {
    return {
      role: state.userReducer.role
    }
  })


  useEffect(() => {
    keepLogin()
  }, [])

  const keepLogin = async () => {
    try {
      let token = Cookies.get("userToken")
      if (token) {
        let res = await axios.get(`${API_URL}/users/login/keep`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.data.id) {
          dispatch(loginAction(res.data))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="App">
      <Navbar />
      <Routes>
        {role ? role === "admin" ?
          <>
            <Route path='/admin' element={<DashboardPage />} />
            <Route path='/' element={<Navigate replace to='/admin' />} />
            <Route path='/admin/order' element={<AdminOrderPage />} />
            <Route path='/admin/perscription' element={<AdminPerscriptionPage />} />
            <Route path='/admin/product' element={<AdminProductPage />} />
            <Route path='/admin/product/category' element={<AdminCategoryPage />} />
            <Route path='/admin/report' element={<ReportPage />} />
          </>
          :
          <>
            <Route path='/auth/login' element={<Navigate replace to='/' />} />
            <Route path='/auth/register' element={<Navigate replace to='/' />} />\
            <Route path='/' element={<Homepage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/order' element={<OrderListPage />} />
            <Route path='/prescription' element={<PrescriptionPage />} />
            <Route path='/product' element={<ProductPage />} />
            <Route path='/product/detail' element={<ProductDetailPage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </>
          :
          <>
            <Route path='/auth/login' element={<LoginPage />} />
            <Route path='/auth/register' element={<RegisterPage />} />\
            <Route path='/' element={<Homepage />} />
            <Route path='/auth/reset/:token' element={<ForgotPasswordPage />} />
            <Route path='/product' element={<ProductPage />} />
            <Route path='/product/detail' element={<ProductDetailPage />} />
          </>
        }
        <Route path='/auth/verification/:token' element={<VerificationPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

    </div>
  );
}

export default App;
