export const formatPrice = (price) => {
  // Kiểm tra nếu price là undefined hoặc null
  if (price === undefined || price === null) {
    return "0 đ"; // hoặc giá trị mặc định khác bạn muốn
  }

  // Chia giá tiền thành các nhóm ba số
  const parts = price.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Kết hợp lại các phần và thêm "đ" vào cuối
  return parts.join(".") + " đ";
};
