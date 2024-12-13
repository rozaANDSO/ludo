import Home from "./Pages/Home/Index";
import Board from "./Pages/Board/Index";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { SocketProvider } from "./Pages/Context/socketContext";
import { Sigin } from "./Pages/Signin/Signin";
import { Sigup } from "./Pages/Signup/Signup";
import { ProtectedRoute } from "./Pages/components/protectedroutes";

function App() {
  //lobbby you joined left
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/game/:lobbyId" element={<Board />} />
        </Route>
        <Route path="signin" element={<Sigin />} />
        <Route path="signup" element={<Sigup />} />
      </Route>
    )
  );
  return (
    <>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </>
  );
}
const Root = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default App;
