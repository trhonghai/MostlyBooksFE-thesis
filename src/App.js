import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Switch,
} from "react-router-dom";

import { privateRoutes, publicRoutes } from "~/routes";

import AdminLayout from "./layout/AdminLayout/AdminLayout";
import DefaultLayout from "./layout/DefaultLayout";
import { customerId } from "./utils/localStorage";
import CusLayout from "./layout/CusLayout";
import { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import routes from "./routes";
import config from "./config";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const roleUser = localStorage.getItem("roles");
  const currentUser = localStorage.getItem("userId");

  useEffect(() => {
    if (roleUser && roleUser.includes("Admin")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    console.log(isAdmin);
  }, [roleUser]);

  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      const Layout = route.layout || React.Fragment;
      const Page = route.component;

      let element = (
        <Layout>
          <Page />
        </Layout>
      );

      // Nếu đã đăng nhập mà truy cập vào các trang không cần thiết như login, register, ...
      if (route.unnecessary && currentUser) {
        if (isAdmin) {
          element = (
            <Navigate
              to={config.routes.adminUsers}
              state={{ unnecessary: true }}
            />
          );
        } else {
          element = (
            <Navigate to={config.routes.home} state={{ unnecessary: true }} />
          );
        }
      }
      // Nếu chưa đăng nhập mà truy cập vào các trang đuợc bảo vệ như cart, account, ...
      if (route.protected && currentUser === null) {
        element = (
          <Navigate to={config.routes.login} state={{ protected: true }} />
        );
      }

      // Khi truy cập vào trang chỉ dành cho admin
      if (route.onlyAdmin) {
        if (currentUser === null) {
          element = (
            <Navigate
              to={config.routes.adminLogin}
              state={{ onlyAdmin: true }}
            />
          );
        } else if (roleUser !== "Admin") {
          element = (
            <Navigate to={config.routes.home} state={{ onlyAdmin: true }} />
          );
        }
      }

      return (
        <Route key={index} path={route.path} element={element}>
          {renderRoutes(route.children || [])}
        </Route>
      );
    });
  };

  return (
    <Router>
      <div className="App">
        <Toaster position="top right" gutter={10} />
        <Routes>{renderRoutes(routes)}</Routes>
      </div>
    </Router>
  );
}

export default App;
