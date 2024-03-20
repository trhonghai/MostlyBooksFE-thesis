export const formatPrice = (price) => {
    // Chia giá tiền thành các nhóm ba số
    const parts = price.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    // Kết hợp lại các phần và thêm "đ" vào cuối
    return parts.join(".") + " đ";
  };