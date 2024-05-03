import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { fetchAllCartItems } from "./services/redux/productSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./pages/Home/Home";
import PrimaryHeader from "./components/PrimaryHeader";
import SecondaryHeader from "./components/SecondaryHeader";
import Seller from "./pages/Seller";
import Customer from "./pages/Customer";
import ContactUs from "./pages/ContactUs";

import FooterSecondary from "./components/FooterSecondary";

import Item from "./pages/seller/Item";
import Selleritem from "./pages/seller/selleritem";
import UpdateItem from "./pages/seller/UpdateItem";
import Shop from "./pages/shop";
import Menu from "./pages/cart/Menu";
import AdminReview from "./pages/AdminReview";
import Cart from "./pages/Cart";

// import Review from "./components/Review";
import SellerDashboard from "./pages/seller/SellerDashboard";
// import StarReview from "./components/StarReview";
import SellerReview from "./pages/seller/SellerReview";
import { ToastContainer, toast } from "react-toastify";

import Admincontact from "./pages/Admincontact";
import Newshop from "./pages/Shop/Newshop";

import Checkout from "./pages/Checkout";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import Analysis from "./pages/analys";
import AddReview from "./components/reviews/addReviews";




function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch all cart items when the app mounts
    dispatch(fetchAllCartItems());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Toaster />
      <PrimaryHeader />
      <SecondaryHeader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/cart" element={<Cart />} />

        {/* <Route path="/review" element={<Review />} /> */}
        <Route path="/reviewrating" element={<SellerReview />} />
        <Route path="/adminReview" element={<AdminReview />} />

        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/admin-contact" element={<Admincontact />} />
        <Route path="/NewShop" element={<Newshop />} />
     

        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        <Route path="/item" element={<Item />} />
        <Route path="/sellerDashboard" element={<SellerDashboard />} />
        {/* <Route path="/star" element={<StarReview />} /> */}
        <Route path="/selleritem" element={<Selleritem />} />
        <Route path="/UpdateItem/:id/edit" element={<UpdateItem />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="menu" element={<Menu />} />
        <Route path="menu/:filterby" element={<Menu />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/anaysys" element={<Analysis />} />
        <Route path="/addreviews" element={<AddReview />} />
        <Route path="/addreviews/:filterby" element={<AddReview />} />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <FooterSecondary />
    </BrowserRouter>
  );
}

export default App;
