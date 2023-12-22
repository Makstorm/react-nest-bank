import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { authRoutes, publicRoutes } from "./routes";
import { BALANCE_ROUTE, INDEX_ROUTE } from "./consts";
import PhoneDisplay from "../../containers/PhoneDisplay";

const AppRouter = () => {
  const user = useAppSelector((state) => state.userReduser.user);

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <>
  //       {user &&
  //         authRoutes.map(({ path, Component }) => (
  //           <Route
  //             key={path}
  //             path={path}
  //             element={<Component />}
  //             errorElement={<div>404 Not found</div>}
  //           />
  //         ))}
  //       {publicRoutes.map(({ path, Component }) => (
  //         <Route
  //           key={path}
  //           path={path}
  //           element={<Component />}
  //           errorElement={<div>404 Not found</div>}
  //         />
  //       ))}
  //       <Route
  //         path="*"
  //         element={
  //           (user && <Navigate to={BALANCE_ROUTE} />) || (
  //             <Navigate to={INDEX_ROUTE} />
  //           )
  //         }
  //       />
  //     </>
  //   )
  // );

  const createRoutes = () => {
    return createRoutesFromElements(
      <>
        {user &&
          authRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={<Component />}
              errorElement={<div>404 Not found</div>}
            />
          ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component />}
            errorElement={<div>404 Not found</div>}
          />
        ))}
        <Route
          path="*"
          element={
            (user && <Navigate to={BALANCE_ROUTE} />) || (
              <Navigate to={INDEX_ROUTE} />
            )
          }
        />
      </>
    );
  };

  const router = createBrowserRouter([
    { element: <PhoneDisplay />, children: createRoutes() },
  ]);

  console.log(router);

  return <RouterProvider router={router} />;
};

export default AppRouter;
