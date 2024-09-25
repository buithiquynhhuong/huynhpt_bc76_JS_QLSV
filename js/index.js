let arrSinhVien = [];
const min = 4;
const max = 10;

// Lấy dữ liệu từ form
function getFormData() {
  let arrayField = document.querySelectorAll(
    "#formQLSV input, #formQLSV select",
  );
  let sinhVien = new Student();
  let flag = true;
  for (let filed of arrayField) {
    let { value, id } = filed;
    sinhVien[id] = value;

    // truy cập tới thẻ cha gần nhất của thẻ input
    let notiTag = filed.parentElement.querySelector("span");
    if (checkEmptyValue(notiTag, value) === false) {
      flag = false;
    } else {
      // truy xuất đến các thuộc tính data-validation của thẻ input

      // cách 1 khi chưa biết set data-validation
      // if (id === "txtMatKhau" && !checkMinMaxValue(notiTag, value, min, max)) {
      //   flag = false;
      // }
      // if (id === "txtEmail" && !checkEmailValue(notiTag, value)) {
      //   flag = false;
      // }

      // cách 2 khi biết set data-validation
      let dataValidation = filed.getAttribute("data-validation");
      if (dataValidation === "email" && !checkEmailValue(notiTag, value)) {
        flag = false;
      }
      if (
        dataValidation === "matKhau" &&
        !checkMinMaxValue(notiTag, value, min, max)
      ) {
        flag = false;
      }
      if (dataValidation === "matKhau" && !checkPasswordValue(notiTag, value)) {
        flag = false;
      }
    }
  }
  return flag ? sinhVien : null;
}

// Thêm sinh viên
document.getElementById("formQLSV").onsubmit = function (event) {
  event.preventDefault(); // Chặn sự kiện submit mặc định của form
  let sinhVien = getFormData(); // Lấy dữ liệu từ form
  if (sinhVien) {
    arrSinhVien.push(sinhVien); // Thêm sinh viên vào mảng
    renderSinhVien();
    setLocalStorage("arrSinhVien", arrSinhVien);
    event.target.reset(); // Reset form sau khi thêm
  }
};

// Hiển thị sinh viên
function renderSinhVien(arr = arrSinhVien) {
  let content = "";
  arr.forEach((sv) => {
    sv = Object.assign(new Student(), sv); // Chuyển đổi lại đối tượng sinh viên từ localStorage vì đầu vào không có method nên tạo lại để có thể sử dụng method
    let { txtMaSV, txtTenSV, txtEmail, txtNgaySinh, khSv } = sv;
    content += `
      <tr>
        <td>${txtMaSV}</td>
        <td>${txtTenSV}</td>
        <td>${txtEmail}</td>
        <td>${txtNgaySinh}</td>
        <td>${khSv}</td>
        <td>${sv.tinhDiemTrungBinh() ? sv.tinhDiemTrungBinh().toFixed(2) : 0}</td>
        <td>
          <button class="btn btn-danger" onclick="xoaSinhVien('${txtMaSV}')">Xóa</button>
          <button class="btn btn-info" onclick="suaSinhVien('${txtMaSV}')">Sửa</button>
        </td>
      </tr>
    `;
  });
  document.getElementById("tbodySinhVien").innerHTML = content;
}

// Tải dữ liệu từ localStorage khi load trang
window.onload = function () {
  let dataLocal = getLocalStorage("arrSinhVien");
  if (dataLocal) arrSinhVien = dataLocal;
  renderSinhVien(dataLocal);
};

// Local storage
function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
  let dataString = localStorage.getItem(key);
  return dataString ? JSON.parse(dataString) : null;
}

// Xóa sinh viên
function xoaSinhVien(maSV) {
  arrSinhVien = arrSinhVien.filter((sv) => sv.txtMaSV !== maSV); // Lọc sinh viên cần xóa
  renderSinhVien(); // Hiển thị lại danh sách sau khi xóa
  setLocalStorage("arrSinhVien", arrSinhVien); // Lưu lại mảng sinh viên đã xóa vào localStorage
}

// Lấy thông tin sinh viên cần sửa
function suaSinhVien(maSV) {
  let sinhVien = arrSinhVien.find((sv) => sv.txtMaSV === maSV);
  if (sinhVien) {
    let arrayField = document.querySelectorAll(
      "#formQLSV input, #formQLSV select",
    );
    arrayField.forEach((filed) => {
      filed.value = sinhVien[filed.id]; // Gán giá trị vào input và select
      if (filed.id === "txtMaSV") filed.disabled = true; // Không cho phép sửa mã sinh viên
    });
  } else {
    alert("Vui lòng thử lại");
  }
}

// Cập nhật sinh viên
document.getElementById("btnUpdate").onclick = function () {
  let sinhVien = getFormData(); // Lấy dữ liệu sinh viên từ form
  if (!sinhVien) return; // Nếu không có dữ liệu thì thoát hàm
  arrSinhVien = arrSinhVien.map((sv) =>
    sv.txtMaSV === sinhVien.txtMaSV ? sinhVien : sv,
  );
  renderSinhVien(); // Hiển thị lại danh sách sinh viên
  setLocalStorage("arrSinhVien", arrSinhVien); // Lưu vào localStorage
  document.getElementById("formQLSV").reset(); // Reset form sau khi cập nhật
};

// tìm kiếm sinh viên
document.getElementById("txtSearch").oninput = function (event) {
  let keyword = event.target.value.trim().toLowerCase();
  let newKeyword = removeVietnameseTones(keyword);
  let arrSearch = arrSinhVien.filter((sv) => {
    let newTenSV = removeVietnameseTones(sv.txtTenSV.trim().toLowerCase());
    return newTenSV.includes(newKeyword);
  });
  renderSinhVien(arrSearch);
};
