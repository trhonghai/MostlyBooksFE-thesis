import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { privateRoutes, publicRoutes } from "~/routes";

import AdminLayout from "./layout/AdminLayout/AdminLayout";
import DefaultLayout from "./layout/DefaultLayout";
import { customerId } from "./utils/localStorage";
import CusLayout from "./layout/CusLayout";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const roleUser = localStorage.getItem("roles");
    if (roleUser && roleUser.includes("Admin")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Toaster position="top right" gutter={10} />
        <Routes>
          {privateRoutes.map((route, index) => {
            if (isAdmin) {
              let Layout = AdminLayout;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            } else {
              {
                publicRoutes.map((route, index) => {
                  let Layout = DefaultLayout;
                  if (route.layout) {
                    Layout = route.layout;
                  }
                  const Page = route.component;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    />
                  );
                });
              }
            }
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
