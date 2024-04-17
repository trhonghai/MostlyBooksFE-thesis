import { useEffect } from "react";
import BestSellerProduct from "./BestSellerProduct";
import FeatureProduct from "./RelateProduct";
import HomeSlide from "./HomeSlide";
import { useState } from "react";
import axios from "axios";
import SaleProduct from "./SaleProduct";

function Home() {
  return (
    <div className="pt-4 bg-gray-100 ">
      <HomeSlide />

      <SaleProduct />
      <div className="flex pb-4 items-center">
        <BestSellerProduct />
      </div>
    </div>
  );
}

export default Home;
