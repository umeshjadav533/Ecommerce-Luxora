import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import NavigationPage from "./pages/NavigationPage";
import StudioPage from "./pages/StudioPage";
import WishlistPage from "./pages/WishlistPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import FotgotPasswordPage from "./pages/FotgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { ToastContainer } from "react-toastify";
import EmailSentPage from "./pages/EmailSentPage";
import PasswordResetSuccess from "./pages/PasswordResetSuccess";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        {/* Auth Pages (Without Layout) */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/password/forgot-password"
          element={<FotgotPasswordPage />}
        />
        <Route path="/check-email" element={<EmailSentPage />} />
        <Route
          path="/api/auth/password/reset-password/:token"
          element={<ResetPasswordPage />}
        />
        <Route path="/password-reset-success" element={<PasswordResetSuccess />} />

        {/* Pages With Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/:pageName" element={<NavigationPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/favourites" element={<WishlistPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;