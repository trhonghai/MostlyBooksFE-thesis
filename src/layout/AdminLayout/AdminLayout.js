import { Children } from "react";

import Sidebar from "~/components/Admin/Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="flex-col min-h-screen bg-white">
      <div className="flex-1 justify-center align-center items-center">
        <div class="bg-gray-100 min-h-screen ">
          <div class="container md:w-5/5 mx-auto">
            <div class="flex flex-col md:flex-row gap-4 ">
              <div class="md:w-1/5 ml-4 mt-4 border rounded-lg">
                <Sidebar />
              </div>
              <div class="md:w-4/5">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
