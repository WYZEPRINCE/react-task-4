import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TopHeader from "./components/TopHeader";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import WishList from "./pages/Wishlist";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./pages/store/store";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart"
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <TopHeader />
        <Header />
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productdetails" element={<ProductDetails />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
