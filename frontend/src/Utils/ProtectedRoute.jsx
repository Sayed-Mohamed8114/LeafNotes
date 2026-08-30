import Loader from "@/Components/Common/Loader";
import { useAuth } from "@/Context/AurhContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;