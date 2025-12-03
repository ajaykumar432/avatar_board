// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import {authApi} from '../api/apiService'
// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     return localStorage.getItem('isAuthenticated') === 'true';
//   });

//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem('user');
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const signIn = (credentials) => {
//     if (credentials.email && credentials.password) {
//       const userData = { email: credentials.email };
//       setIsAuthenticated(true);
//       setUser(userData);
//       localStorage.setItem('isAuthenticated', 'true');
//       localStorage.setItem('user', JSON.stringify(userData));
//       return true;
//     }
//     return false;
//   };

//   const signUp = (userData) => {
//     if (userData.email && userData.password && userData.name) {
//       const newUser = { email: userData.email, name: userData.name };
//       setIsAuthenticated(true);
//       setUser(newUser);
//       localStorage.setItem('isAuthenticated', 'true');
//       localStorage.setItem('user', JSON.stringify(newUser));
//       return true;
//     }
//     return false;
//   };

//   const signOut = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, signIn, signUp, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook to consume AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within AuthProvider');
//   return context;
// };

// // Protected route wrapper
// export const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   if (!isAuthenticated) return <Navigate to="/signin" replace />;
//   return children;
// };

// // Public route wrapper
// export const PublicRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   if (isAuthenticated) return <Navigate to="/" replace />;
//   return children;
// };


// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authApi } from '../api/apiService'; // ✅ import API service

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ Real Login (with backend)
  // const signIn = async (credentials) => {
  //   try {
  //     const response = await authApi.login({
  //       email: credentials.email,
  //       password: credentials.password,
  //     });

  //     const data = response.data;

  //     // Check success
  //     if (data && data.token) {
  //       // Save data to localStorage
  //       localStorage.setItem('token', data.token);
  //       localStorage.setItem('isAuthenticated', 'true');
  //       localStorage.setItem('user', JSON.stringify(data.user || { email: credentials.email }));

  //       setIsAuthenticated(true);
  //       setUser(data.user || { email: credentials.email });

  //       return true;
  //     } else {
  //       console.error('Login failed: Invalid response structure');
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     alert(error.message || 'Invalid credentials');
  //     return false;
  //   }
  // };

const signIn = async (credentials) => {
  try {
    const response = await authApi.login({
      email: credentials.email,
      password: credentials.password,
    });

    const data = response.data;


    // ✅ Firebase returns idToken, not token
    if (data && data.idToken) {
      // Save everything to localStorage
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("email", credentials.email);
      localStorage.setItem("isAuthenticated", "true");

      setIsAuthenticated(true);
      setUser({ userId: data.userId, email: credentials.email });

      console.log("✅ Login success, token saved!");
      return data; // return full data
    } else {
      console.error("❌ Login failed: missing idToken");
      return null;
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    alert(error.response?.data?.message || "Invalid credentials");
    return null;
  }
};


  // Dummy signup (you can replace with /register later)
  const signUp = (userData) => {
    if (userData.email && userData.password && userData.name) {
      const newUser = { email: userData.email, name: userData.name };
      setIsAuthenticated(true);
      setUser(newUser);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const signOut = async () => {
    try {
      await authApi.logout(); // optional if backend supports it
    } catch {
      console.warn('Logout API failed or not implemented.');
    }

    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// ProtectedRoute
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return children;
};

// PublicRoute
export const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
};
