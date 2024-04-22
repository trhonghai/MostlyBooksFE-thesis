import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

function Chart({ orderDelivered }) {
  const ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: 100,
    },
  };

  const [revenueData, setRevenueData] = useState([]);
  const [revenueByYear, setRevenueByYear] = useState({});
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const getMonthYearFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const year = date.getFullYear();
    return { month, year };
  };

  useEffect(() => {
    // Hàm tính toán doanh thu theo tháng và cập nhật state revenueData
    const calculateRevenueByMonthAndYear = (orders) => {
      const revenueByMonth = {};
      const revenueByYear = {};

      orders.forEach((order) => {
        const { amount, shipping, orderDate } = order;
        const { month, year } = getMonthYearFromTimestamp(orderDate);

        // Tính tổng doanh thu theo tháng
        if (!revenueByMonth[year]) {
          revenueByMonth[year] = {};
        }
        if (!revenueByMonth[year][month]) {
          revenueByMonth[year][month] = 0;
        }
        revenueByMonth[year][month] += amount + shipping;

        // Tính tổng doanh thu theo năm
        if (!revenueByYear[year]) {
          revenueByYear[year] = 0;
        }
        revenueByYear[year] += amount + shipping;
      });

      // Lưu trữ dữ liệu doanh thu theo năm
      setRevenueByYear(revenueByYear);

      // Chuyển dữ liệu doanh thu theo tháng thành mảng revenueData cho năm được chọn
      const selectedYearRevenueData = [];
      for (let month = 1; month <= 12; month++) {
        if (
          revenueByMonth[selectedYear] &&
          revenueByMonth[selectedYear][month]
        ) {
          const monthlyRevenue =
            (revenueByMonth[selectedYear][month] /
              revenueByYear[selectedYear]) *
            100;
          selectedYearRevenueData.push(monthlyRevenue.toFixed(2)); // Làm tròn đến 2 chữ số thập phân
        } else {
          selectedYearRevenueData.push(0); // Nếu không có dữ liệu, thêm giá trị 0
        }
      }
      setRevenueData(selectedYearRevenueData);
    };

    calculateRevenueByMonthAndYear(orderDelivered);
  }, [orderDelivered, selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
              Doanh thu theo tháng
            </h3>
            <div>
              <select
                className="text-xs font-semibold"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {Object.keys(revenueByYear).map((year) => (
                  <option key={year} value={parseInt(year)}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={ApexOptions}
            series={[{ name: "Doanh thu", data: revenueData }]}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}

export default Chart;
