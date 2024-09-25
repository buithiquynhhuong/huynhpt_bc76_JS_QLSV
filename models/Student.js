class Student {
  txtMaSV = "";
  txtTenSV = "";
  txtEmail = "";
  txtMatKhau = "";
  txtNgaySinh = "";
  khSv = "";
  txtDiemToan = "";
  txtDiemLy = "";
  txtDiemHoa = "";
  tinhDiemTrungBinh = function () {
    return (
      (this.txtDiemToan * 1 + this.txtDiemLy * 1 + this.txtDiemHoa * 1) / 3
    );
  };
}
