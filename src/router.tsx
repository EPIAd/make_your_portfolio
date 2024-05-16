import { createBrowserRouter } from "react-router-dom";
import { Wrapper } from "./components";
import { InvestPage } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "invest",
        element: <InvestPage />,
      },
    ],
  },
]);
