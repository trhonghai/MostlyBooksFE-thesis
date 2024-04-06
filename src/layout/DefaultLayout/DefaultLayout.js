import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../CusLayout/Sidebar";

function DefaultLayout({ children }) {
  return (
    <div className="flex-col min-h-screen bg-white">
      <Header />
      <div className="flex-1  justify-center align-center items-center">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
