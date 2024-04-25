import {
  faLocationDot,
  faLocation,
  faMobileAlt,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MailIcon } from "~/components/icons";

function Contact() {
  return (
    <div class="my-6">
      <div class="grid sm:grid-cols-2  p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
        <div>
          <div class="">
            <ul class="mt-3">
              <li class="flex items-center">
                <div class="border-2 border-[#FFD16B] h-10 w-10 rounded-full flex items-center justify-center ">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-[#FFD16B]"
                  />
                </div>
                <a href="javascript:void(0)" class="text-gray-600 text-sm ml-3">
                  <span className="text-left">
                    KDC 91B - An Khánh - Ninh Kiều - Cần Thơ
                  </span>
                </a>
              </li>
            </ul>
            <ul class="mt-3">
              <li class="flex items-center">
                <div class="border-2 border-[#FFD16B] h-10 w-10 rounded-full flex items-center justify-center ">
                  <MailIcon />
                </div>
                <a href="javascript:void(0)" class="text-gray-600 text-sm ml-3">
                  <span>mostlybookshop@gmail.com</span>
                </a>
              </li>
            </ul>
            <ul class="mt-3">
              <li class="flex items-center">
                <div class="border-2 border-[#FFD16B] h-10 w-10 rounded-full flex items-center justify-center ">
                  <FontAwesomeIcon
                    icon={faMobileAlt}
                    className="text-[#FFD16B]"
                  />
                </div>
                <a href="javascript:void(0)" class="text-gray-600 text-sm ml-3">
                  <span>0935115443</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <form class="ml-auo space-y-4">
          <h2 class="text-xl font-semibold">LIÊN HỆ</h2>
          <input
            type="text"
            placeholder="Nhập vào họ và tên"
            class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          />
          <input
            type="email"
            placeholder="Nhập vào email"
            class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          />

          <textarea
            placeholder="Nội dung"
            rows="6"
            class="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"
          ></textarea>
          <button
            type="button"
            class="text-white bg-[#FFD16B] hover:bg-[#FBA31A] font-semibold rounded-md text-sm px-4 py-2.5 w-full"
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
