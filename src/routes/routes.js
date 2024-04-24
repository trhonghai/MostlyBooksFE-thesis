import config from "../config";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageProducts from "../pages/Admin/ManageBook";
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
import Checkout from "~/pages/Checkout";
import Order from "~/pages/Order";
import OrderDetail from "~/pages/OrderDetail";
import AdminLoginLayout from "~/layout/AdminLoginLayout";
import AdminLogin from "~/pages/AdminLogin";
import ManageOrders from "~/pages/Admin/ManageOrders";
import AdminOrderDetail from "~/pages/Admin/AdminOrderDetail";
import Books from "~/pages/Books";
import BooksLayout from "~/layout/BooksLayout";
import ManagePublisher from "~/pages/Admin/ManagePublisher";
import ManageAuthours from "~/pages/Admin/ManageAuthours";
import ManageDiscount from "~/pages/Admin/ManageDiscount";
import ManageReviews from "~/pages/Admin/ManageReviews";
import ManageStatistic from "~/pages/Admin/ManageStatistic/ManageStatistic";
import PaymentSuccess from "~/pages/PaymentSuccess";
import Favorite from "~/pages/Favorite";

const routes = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  {
    path: config.routes.login,
    component: Login,
    layout: DefaultLayout,
    unnecessary: true,
  },
  { path: config.routes.books, component: Books, layout: BooksLayout },
  {
    path: config.routes.register,
    component: Register,
    layout: DefaultLayout,
    unnecessary: true,
  },
  { path: config.routes.book, component: BookDetails, layout: DefaultLayout },
  {
    path: config.routes.cart,
    component: CartItem,
    layout: DefaultLayout,
    protected: true,
  },
  {
    path: config.routes.checkout,
    component: Checkout,
    layout: DefaultLayout,
    protected: true,
  },
  {
    path: config.routes.account,
    component: Account,
    layout: CusLayout,
    protected: true,
  },
  {
    path: config.routes.address,
    component: Address,
    layout: CusLayout,
    protected: true,
  },
  {
    path: config.routes.order,
    component: Order,
    layout: CusLayout,
    protected: true,
  },
  {
    path: config.routes.orderDetail,
    component: OrderDetail,
    layout: CusLayout,
  },
  {
    path: config.routes.adminLogin,
    component: AdminLogin,
    layout: AdminLoginLayout,
    unnecessary: true,
  },
  {
    path: config.routes.adminOrders,
    component: ManageOrders,
    layout: AdminLayout,
    onlyAdmin: true,
  },
  {
    path: config.routes.adminOrdersDetail,
    component: AdminOrderDetail,
    layout: AdminLayout,
    onlyAdmin: true,
  },
  {
    path: config.routes.adminUsers,
    component: ManageUsers,
    layout: AdminLayout,
    onlyAdmin: true,
  },
  {
    path: config.routes.adminCategories,
    component: ManageCategories,
    layout: AdminLayout,
    onlyAdmin: true,
  },
  {
    path: config.routes.adminPublishers,
    component: ManagePublisher,
    layout: AdminLayout,
    onlyAdmin: true,
  },
  {
    path: config.routes.adminAuthors,
    component: ManageAuthours,
    layout: AdminLayout,
    onlyAdmin: true,
  },

  {
    path: config.routes.adminBooks,
    component: ManageProducts,
    layout: AdminLayout,
    onlyAdmin: true,
  },
  {
    path: config.routes.adminDiscounts,
    component: ManageDiscount,
    layout: AdminLayout,
    onlyAdmin: true,
  },
  {
    path: config.routes.adminReviews,
    component: ManageReviews,
    layout: AdminLayout,
    onlyAdmin: true,
  },
  {
    path: config.routes.adminStatistic,
    component: ManageStatistic,
    layout: AdminLayout,
    onlyAdmin: true,
  },
  {
    path: config.routes.paymentSuccess,
    component: PaymentSuccess,
    layout: DefaultLayout,
    protected: true,
  },

  {
    path: config.routes.favorite,
    component: Favorite,
    layout: CusLayout,
  },
];

export default routes;
