import { Children } from "react";

import Sidebar from "~/components/Admin/Sidebar";
import AdminHeader from "./AdminHeader/AdminHeader";
import { useState } from "react";

function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const hanldeSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div class="leading-normal tracking-normal" id="main-body">
      <div class="flex flex-wrap">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div class="w-full pl-0 lg:pl-64 min-h-screen">
          <AdminHeader hanldeSidebar={hanldeSidebar} />

          <div class="p-6  mb-20">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
