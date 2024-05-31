import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import ViewProduct from './pages/ViewProduct'
import Navbar from './pages/Navbar'
import AuthenticationPage from './pages/AuthenticationPage'
import SellerDashboard from './pages/seller/SellerDashboard'
import CustomerSearch from './pages/customer/pages/CustomerSearch'
import Products from './components/Products';
import { useEffect } from 'react';
import { getProducts } from './redux/userHandle';
import CustomerOrders from './pages/customer/pages/CustomerOrders';
import CheckoutSteps from './pages/customer/pages/CheckoutSteps';
import Profile from './pages/customer/pages/Profile';
import Logout from './pages/Logout';
import { isTokenValid } from './redux/userSlice';
import CheckoutAftermath from './pages/customer/pages/CheckoutAftermath';
import ViewOrder from './pages/customer/pages/ViewOrder';
import AboutUsPage from './pages/AboutUsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicePage';
import ContactUsPage from './pages/ContactUsPage';
import AdminLogin from './components/AdminLogin';
import AdminHomePage from './components/AdminHomePage';
import FAQPage from './pages/FAQPage';
import TermsAndConditionPage from './pages/TermsAndConditionPage';

const App = () => {

  const dispatch = useDispatch()

  const { isLoggedIn, currentToken, currentRole, productData } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getProducts());

    if (currentToken) {
      dispatch(isTokenValid());
    }
  }, [dispatch, currentToken]);

  return (
    <BrowserRouter>
      {(!isLoggedIn && currentRole === null) &&
        <>
          <Navbar />

          <Routes>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminHomePage />} />
            <Route path="/" element={<Home />} />
            <Route path="/Home2" element={<Home2 />} />
            <Route path='*' element={<Navigate to="/" />} />

            <Route path="/Products" element={<Products productData={productData} />} />

            <Route path="/product/view/:id" element={<ViewProduct />} />

            <Route path="/Search" element={<CustomerSearch mode="Mobile" />} />
            <Route path="/ProductSearch" element={<CustomerSearch mode="Desktop" />} />

            <Route path="/Customerregister" element={<AuthenticationPage mode="Register" role="Customer" />} />
            <Route path="/Customerlogin" element={<AuthenticationPage mode="Login" role="Customer" />} />
            <Route path="/Sellerregister" element={<AuthenticationPage mode="Register" role="Seller" />} />
            <Route path="/Sellerlogin" element={<AuthenticationPage mode="Login" role="Seller" />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/terms-condition" element={<TermsAndConditionPage />} />
          </Routes>
        </>
      }

      {(isLoggedIn && currentRole === "Customer") &&
        <>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home2" element={<Home2 />} />
            <Route path='*' element={<Navigate to="/" />} />

            <Route path="/Products" element={<Products productData={productData} />} />

            <Route path="/product/view/:id" element={<ViewProduct />} />

            <Route path="/Search" element={<CustomerSearch mode="Mobile" />} />
            <Route path="/ProductSearch" element={<CustomerSearch mode="Desktop" />} />

            <Route path="/Checkout" element={<CheckoutSteps />} />
            <Route path="/product/buy/:id" element={<CheckoutSteps />} />
            <Route path="/Aftermath" element={<CheckoutAftermath />} />

            <Route path="/Profile" element={<Profile />} />
            <Route path="/Orders" element={<CustomerOrders />} />
            <Route path="/order/view/:id" element={<ViewOrder />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/terms-condition" element={<TermsAndConditionPage />} />
          </Routes>
        </>
      }

      {(isLoggedIn && (currentRole === "Seller" || currentRole === "Shopcart")) && (
        <>
          <SellerDashboard />
        </>
      )}

      

    </BrowserRouter >
  )
}

export default App