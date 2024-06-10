import { Route, Routes } from "react-router-dom";
import Home from "./container/Home";
import Login from "./container/Login";
import Signup from "./container/Signup";
import NotFound from "./container/NotFound";
import AuthenticatedRoute from "./components/authenticated-route";
import { UnauthenticatedRoute } from "./components/unauthenticated-route";

export default function Links() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthenticatedRoute>
            <Home />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/secret"
        element={
          <AuthenticatedRoute>
            <>Secret!</>
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <UnauthenticatedRoute>
            <Signup />
          </UnauthenticatedRoute>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
