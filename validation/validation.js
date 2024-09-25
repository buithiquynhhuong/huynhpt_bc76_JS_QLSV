function checkEmptyValue(noti, value) {
  if (value === "") {
    noti.innerHTML = "Không được để trống";
    return false;
  } else {
    noti.innerHTML = "";
    return true;
  }
}

function checkMinMaxValue(noti, value, min, max) {
  if (value < min || value > max) {
    noti.innerHTML = `Giá trị từ ${min} đến ${max}`;
    return false;
  } else {
    noti.innerHTML = "";
    return true;
  }
}

function checkEmailValue(noti, value) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regexEmail.test(value)) {
    noti.innerHTML = "Email không hợp lệ";
    return false;
  }
  noti.innerHTML = "";
  return true;
}

function checkPasswordValue(noti, value) {
  let regexPassword = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
  if (!regexPassword.test(value)) {
    noti.innerHTML = "Mật khẩu phải chứa một ký tự in hoa và 1 ký tự đặc biệt";
    return false;
  }
  noti.innerHTML = "";
  return true;
}
