import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/route";
import Home from "./routes/Home";
import Game from "./routes/Game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/game",
        element: <Game />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
