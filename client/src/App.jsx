import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./componets/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  loginUser,
  refreshAccessToken,
  registerUser,
} from "./redux/auth/authActions";

const App = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refreshAccessToken())
  }, [dispatch]);

  return (
    <Router >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route />
      </Routes>
    </Router>
  );
};

export default App;
