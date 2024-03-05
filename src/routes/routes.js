import config from "../config";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageProducts from "../pages/Admin/ManageProducts";
import ManageCategories from "../pages/Admin/ManageCategories";
import AdminLayout from "../layout/AdminLayout/AdminLayout";
import Home from "~/pages/Home";
import Login from "~/pages/Login/Login";
import DefaultLayout from "~/layout/DefaultLayout";
import Register from "~/pages/Register";
import BookDetails from "~/pages/BookDetails";
import CartItem from "~/pages/CartItem";
import Account from "~/pages/Account";
import CusLayout from "~/layout/CusLayout/CusLayout";
import Address from "~/pages/Address";

const privateRoutes = [
  { path: config.routes.users, component: ManageUsers, layout: AdminLayout },
  {
    path: config.routes.categories,
    component: ManageCategories,
    layout: AdminLayout,
  },
  {
    path: config.routes.products,
    component: ManageProducts,
    layout: AdminLayout,
  },
];

const publicRoutes = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.login, component: Login, layout: DefaultLayout },
  { path: config.routes.register, component: Register, layout: DefaultLayout },
  { path: config.routes.book, component: BookDetails, layout: DefaultLayout },
  { path: config.routes.cart, component: CartItem, layout: DefaultLayout },
  { path: config.routes.account, component: Account, layout: CusLayout },
  { path: config.routes.address, component: Address, layout: CusLayout },
];

export { privateRoutes, publicRoutes };
