import "./App.css";
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import routes from "./routes";
import config from "./config";
import Wrapper from "./Wrapper";
import { useContext } from "react";
import AuthContext from "./context/AuthProvider";

function App() {
  const { userCurrent, userRole, isAdmin } = useContext(AuthContext);
  console.log(userCurrent);
  console.log(userRole);
  console.log(isAdmin);
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
      if (route.unnecessary && userCurrent) {
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
      if (route.protected && !userCurrent) {
        element = (
          <Navigate to={config.routes.login} state={{ protected: true }} />
        );
      }

      // Khi truy cập vào trang chỉ dành cho admin
      if (route.onlyAdmin) {
        if (!userCurrent) {
          element = (
            <Navigate
              to={config.routes.adminLogin}
              state={{ onlyAdmin: true }}
            />
          );
        } else if (!isAdmin) {
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
        <Wrapper>{renderRoutes(routes)}</Wrapper>
      </div>
    </Router>
  );
}

export default App;
