import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // profile API check होने तक wait
  if (loading.profile) {
    return <h2>Loading...</h2>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;