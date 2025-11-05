// // src/components/ProtectedRoute.jsx
// import { Navigate } from 'react-router-dom';

// // Protected Route - Only accessible when authenticated
// export const ProtectedRoute = ({ children, isAuthenticated }) => {
//   if (!isAuthenticated) {
//     return <Navigate to="/signin" replace />;
//   }
//   return children;
// };

// // Public Route - Only accessible when NOT authenticated
// export const PublicRoute = ({ children, isAuthenticated }) => {
//   if (isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };


// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

// Protected Route - for authenticated users only
export const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

// Public Route - for unauthenticated users only
export const PublicRoute = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};
