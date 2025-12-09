// // src/App.jsx
// import React from "react";
// import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
// import "./App.css";

// import { SignIn } from "./pages/SignIn";
// import { SignUp } from "./pages/SignUp";
// import { ProtectedRoute, PublicRoute } from "./context/AuthContext";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import Layout from "./layout/Layout";
// import Dashboard from "./pages/Dashboard";
// import Boards from "./pages/Board";
// import Rooms from "./pages/Rooms";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Setting";

// const App = () => {
//   const { isAuthenticated, signIn, signUp, signOut } = useAuth();

//   return (
//     <AuthProvider>
//       <HashRouter>
//         <Routes>
//           {/* Public Routes */}
//           <Route
//             path="/signin"
//             element={
//               <PublicRoute isAuthenticated={isAuthenticated}>
//                 <SignIn onSignIn={signIn} />
//               </PublicRoute>
//             }
//           />

//           <Route
//             path="/signup"
//             element={
//               <PublicRoute isAuthenticated={isAuthenticated}>
//                 <SignUp onSignUp={signUp} />
//               </PublicRoute>
//             }
//           />

//           {/* Protected Routes */}
//           <Route
//             element={
//               <ProtectedRoute isAuthenticated={isAuthenticated}>
//                 <Layout onSignOut={signOut} />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/boards" element={<Boards />} />
//             <Route path="/rooms" element={<Rooms />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/settings" element={<Settings />} />
         
//           </Route>

//           {/* Catch all */}
//           <Route
//             path="*"
//             element={
//               <Navigate to={isAuthenticated ? "/" : "/signin"} replace />
//             }
//           />
//         </Routes>
//       </HashRouter>
//     </AuthProvider>
//   );
// };

// export default App;


// src/App.jsx
import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { ProtectedRoute, PublicRoute } from "./context/AuthContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Boards from "./pages/Board";
import Rooms from "./pages/Rooms";
import Profile from "./pages/Profile";
import Settings from "./pages/Setting";

// ✅ Inner App with access to context
const AppContent = () => {
  const { isAuthenticated, signIn, signUp, signOut } = useAuth();

  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/signin"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <SignIn onSignIn={signIn} />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <SignUp onSignUp={signUp} />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout onSignOut={signOut} />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Catch all */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/" : "/signin"} replace />
          }
        />
         
      </Routes>
 
    </HashRouter>
  );
};

// ✅ Wrap AppContent inside AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
