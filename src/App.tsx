import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth } from "./firebase/config";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./features/auth/authSlice";
import { useEffect, useState } from "react";
import { redirectIfLoggedIn, requireAuth } from "./loaders/authLoader";
import PatientDetails from "./pages/PatientDetails";
import Analytics from "./pages/Analytics";

function App() {
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }),
        );
      } else {
        dispatch(clearUser());
      }
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!authReady) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter([
    { path: "/login", element: <Login />, loader: redirectIfLoggedIn },
    { path: "/register", element: <Register />, loader: redirectIfLoggedIn },

    {
      path: "/",
      element: <Layout />,
      loader: requireAuth,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "patients", element: <PatientDetails /> },
        { path: "analytics", element: <Analytics /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
