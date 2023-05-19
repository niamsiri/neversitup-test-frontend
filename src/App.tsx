import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import Home from "./views/Home";
import Login from "./views/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  const accessToken = localStorage.getItem("token");

  const bonusTesting = (dataTestB: number[]) => {
    const dataTestA = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return dataTestA.filter((data) => dataTestB.indexOf(data) > -1);
  };

  // Start bonus testing
  useEffect(() => {
    console.log(bonusTesting([1, 4, 6]));
  }, []);
  // End bonus testing

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.pathname !== "/login" &&
      !accessToken
    ) {
      window.location.href = "/login";
    }
  }, [accessToken]);

  return <RouterProvider router={router} />;
};

export default App;
