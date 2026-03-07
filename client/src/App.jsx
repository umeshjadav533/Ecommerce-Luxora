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
import PublicRoute from "./routes/PublicRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userProfileAsyncThunk } from "./features/auth/authAPI";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileAsyncThunk());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        {/* Auth Pages */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/password/forgot-password"
          element={<FotgotPasswordPage />}
        />
        <Route path="/check-email" element={<EmailSentPage />} />
        <Route
          path="/api/auth/password/reset-password/:token"
          element={<ResetPasswordPage />}
        />
        <Route
          path="/password-reset-success"
          element={<PasswordResetSuccess />}
        />

        {/* Protected Pages */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
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
