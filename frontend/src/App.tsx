import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import User from "./pages/User/User";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { restoreState } from "./features/auth/authSlice";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedState = localStorage.getItem("authState");
    if (storedState) {
      dispatch(restoreState(JSON.parse(storedState)));
    }
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={
            <ProtectedRoute redirectIfAuthenticated redirectTo="/user">
              <Signin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute
              redirectIfAuthenticated={false}
              redirectTo="/sign-in"
            >
              <User />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}
