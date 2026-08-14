import { Navigate } from "react-router-dom";
import { useAuth } from "../store/useAuth";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  console.log("AUTH STATUS:", { user, loading });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
