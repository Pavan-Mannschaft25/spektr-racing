// // App.jsx
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Layout from "./layout/Layout";
// import ScrollToTop from "./components/ScrollToTop";

// import Home from "./pages/Home";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import TermsOfService from "./pages/TermsOfService";
// import ShippingPolicy from "./pages/ShippingPolicy";
// import RefundReturnPolicy from "./pages/RefundReturnPolicy";
// import WarrantyPolicy from "./pages/WarrantyPolicy";
// import ContactPage from "./pages/ContactPage";
// import ProductOverviewPage from "./pages/ProductOverviewPage";

// function App() {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <Router>
//       <ScrollToTop />

//       <Routes>
//         <Route element={<Layout isScrolled={isScrolled} />}>
//           <Route path="/" element={<Home />} />
//           {/* Policies */}
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/terms-of-service" element={<TermsOfService />} />
//           <Route path="/shipping-policy" element={<ShippingPolicy />} />
//           <Route
//             path="/refund-return-policy"
//             element={<RefundReturnPolicy />}
//           />
//           <Route path="/warranty-policy" element={<WarrantyPolicy />} />
//           <Route path="/contact-us" element={<ContactPage />} />
//           <Route
//             path="/product-overview/:id"
//             element={<ProductOverviewPage />}
//           />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ShippingPolicy from "./pages/ShippingPolicy";
import RefundReturnPolicy from "./pages/RefundReturnPolicy";
import WarrantyPolicy from "./pages/WarrantyPolicy";
import ContactPage from "./pages/ContactPage";
import ProductOverviewPage from "./pages/ProductOverviewPage";

// Authentication & User Account Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import AddressListPage from "./pages/AddressListPage";
import SearchPage from "./pages/SearchPage";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* Public Routes - With Layout (Header + Footer) */}
        <Route element={<Layout isScrolled={isScrolled} />}>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route
            path="/product-overview/:id"
            element={<ProductOverviewPage />}
          />

          {/* User Account Pages */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/history" element={<OrderHistoryPage />} />
          <Route path="/address-list" element={<AddressListPage />} />
          <Route path="/search" element={<SearchPage />} />

          {/* Policy Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route
            path="/refund-return-policy"
            element={<RefundReturnPolicy />}
          />
          <Route path="/warranty-policy" element={<WarrantyPolicy />} />
        </Route>

        {/* Auth Pages - Without Layout (Clean Login/Register) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
