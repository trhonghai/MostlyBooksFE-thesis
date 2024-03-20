import { Children } from "react";
import Header from "../components/Header";
import Sidebar from "./Sidebar";
import Footer from "../components/Footer";

function CusLayout({ children }) {
  return (
    <div className="flex-col min-h-screen bg-white">
      <Header />
      <div className="flex-1 justify-center align-center items-center">
        <div class="bg-gray-100 min-h-screen py-4">
          <div class="container md:w-4/5 mx-auto px-2">
            <div class="flex flex-col md:flex-row gap-4 ">
              <div class="md:w-1/4">
                <Sidebar />
              </div>
              <div class="md:w-3/4">{children}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CusLayout;
