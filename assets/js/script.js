// --- CƠ SỞ DỮ LIỆU GIẢ (FAKE DATABASE) ---
const FAKE_DATABASE = [
  {
    id: 1,
    fullName: "Admin",
    email: "admin@gmail.com",
    password: "0937858582",
    role: "HR Manager",
    avatarPath: "/Final_Project/assets/img/admin.jpg" // Đường dẫn ảnh
  },
  {
    id: 2,
    fullName: "Okilele",
    email: "user@gmail.com",
    password: "123456789",
    role: "Employee",
    avatarPath: "/Final_Project/assets/img/user.png"
  },
  {
    id: 3,
    fullName: "Trinh Quoc Binh",
    email: "trinhquocbinh05@gmail.com",
    password: "987654321",
    role: "Developer",
    avatarPath: "/Final_Project/assets/img/binh.png"
  },
  {
    id: 4,
    fullName: "Mindx",
    email: "mindx@gmail.com",
    password: "mindx",
    role: "Instructor",
    avatarPath: "/Final_Project/assets/img/mindx.jpg"
  }
];
// ------------------------------------------



//Khai báp các biến cục bộ được dùng
//Biến cho PHẦN 1: LOGIC CHUYỂN PANEL
const mainContainer = document.getElementById("main-container"); //Truy cập vào HTML tìm phần từ nào có Id="main-container" sau đó lưu vào một hằng số tên là mainContainer
const toSignupLink = document.getElementById("to-signup-link");
const toLoginLink = document.getElementById("to-login-link");

//Biến cho PHẦN 2: LOGIC KIỂM TRA MẬT KHẨU
const signupForm = document.getElementById("signup-form");
const passwordInput = document.getElementById("signup-password");
const confirmPasswordInput = document.getElementById("confirm-password");
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("signup-email");

//Biến cho phần 4: LOGIC ĐĂNG NHẬP
const loginForm = document.getElementById("login-form");
const emailLogin = document.getElementById("login-email");
const passwordLogin = document.getElementById("login-password");
const toggleLoginPasswordBtn = document.getElementById("toggle-login-password");
const loginPasswordIcon = toggleLoginPasswordBtn.querySelector("i"); // Tìm thẻ i bên trong "toggleLoginPasswordBtn"

//Biến cho phần SIGN UP
const toggleSignUpPasswordBtn = document.getElementById(
  "toggle-signup-password"
);
const toggleSignUpConfirmBtn = document.getElementById(
  "toggle-signup-confirmpassword"
);
const signupPasswordIcon = toggleSignUpPasswordBtn.querySelector("i");
const signupConfirmIcon = toggleSignUpConfirmBtn.querySelector("i");

//Biến cho PHẦN 3: LOGIC CHUYỂN ĐỔI MODE
const loginToggle = document.getElementById("login-theme-toggle");
const signupToggle = document.getElementById("signup-theme-toggle");
const body = document.body;

// --- PHẦN 1: LOGIC CHUYỂN PANEL ---

toSignupLink.addEventListener("click", () => {
  mainContainer.classList.add("right-panel-active");
  loginForm.reset();
}); //Thêm người lắng nghe sự kiện
toLoginLink.addEventListener("click", () => {
  mainContainer.classList.remove("right-panel-active");
  signupForm.reset();
});

// --- PHẦN 2: LOGIC KIỂM TRA MẬT KHẨU ---

// --- PHẦN 2: LOGIC ĐĂNG KÝ (SIGN UP) ---

signupForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn chặn form tải lại trang

  // 1. Lấy tất cả giá trị từ các ô input
  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // 2. Kiểm tra mật khẩu có khớp không
  if (password !== confirmPassword) {
    alert("Mật khẩu xác nhận không khớp. Vui lòng thử lại!");
    return; // Dừng hàm nếu mật khẩu không khớp
  }

  // 3. Kiểm tra xem email đã tồn tại trong FAKE_DATABASE chưa
  const existingUser = FAKE_DATABASE.find((user) => user.email === email);

  if (existingUser) {
    alert("Email này đã được sử dụng. Vui lòng chọn email khác!");
    return; // Dừng hàm nếu email đã tồn tại
  }

  // 4. Nếu mọi thứ đều ổn, tạo người dùng mới
  const newId = FAKE_DATABASE.length + 1; // Tạo ID mới (cách đơn giản)
  const newUser = {
    id: newId,
    fullName: fullName,
    email: email,
    password: password, // Lưu ý: Trong dự án thật, bạn PHẢI mã hóa mật khẩu này
    role: "Employee", // Gán vai trò mặc định
    avatarPath: "/Final_Project/assets/img/user.png", // Gán ảnh đại diện mặc định
  };

  // 5. Thêm người dùng mới vào "cơ sở dữ liệu"
  FAKE_DATABASE.push(newUser);

  // 6. Thông báo thành công và xử lý giao diện
  alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");

  // In ra console để kiểm tra (bạn có thể xóa sau này)
  console.log("Người dùng mới đã được thêm:", newUser);
  console.log("FAKE_DATABASE đã được cập nhật:", FAKE_DATABASE);

  // Xóa trống form đăng ký
  signupForm.reset();

  // Tự động chuyển sang panel đăng nhập
  mainContainer.classList.remove("right-panel-active");
});
// --- PHẦN 3: LOGIC CHUYỂN ĐỔI THEME VỚI 2 CÔNG TẮC ---

// Hàm để áp dụng theme và cập nhật trạng thái của CẢ HAI công tắc
const applyTheme = (theme) => {
  if (theme === "light") {
    body.classList.add("light-mode");
    loginToggle.classList.add("light-mode-active");
    signupToggle.classList.add("light-mode-active");
  } else {
    body.classList.remove("light-mode");
    loginToggle.classList.remove("light-mode-active");
    signupToggle.classList.remove("light-mode-active");
  }
};

// Hàm xử lý chung khi một trong hai công tắc được click
const handleToggleClick = () => {
  const isLightMode = body.classList.contains("light-mode");
  const newTheme = isLightMode ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
};

// Gắn sự kiện click cho cả hai công tắc
loginToggle.addEventListener("click", handleToggleClick);
signupToggle.addEventListener("click", handleToggleClick);

// Khi trang vừa tải xong, kiểm tra theme đã lưu
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark"; // Mặc định là dark mode
  applyTheme(savedTheme);
});

//---Phần 4: ẨN HIỆN PASSWORD---//
//---Ẩn hiện cho phần LOGIN---
toggleLoginPasswordBtn.addEventListener("click", () => {
  // Kiểm tra xem ô có password hay không tại ô Password
  const isPassword = passwordLogin.type === "password";
  if (isPassword) {
    passwordLogin.type = "text";
  } else {
    passwordLogin.type = "password";
  }
  loginPasswordIcon.classList.toggle("fa-eye-slash");
  loginPasswordIcon.classList.toggle("fa-eye");
});
//---Ẩn hiện cho phần Signup Password---
toggleSignUpPasswordBtn.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  if (isPassword) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
  signupPasswordIcon.classList.toggle("fa-eye-slash");
  signupPasswordIcon.classList.toggle("fa-eye");
});

//--- Ẩn hiện cho phần Signup Confirm Password
toggleSignUpConfirmBtn.addEventListener("click", () => {
  const isPassword = confirmPasswordInput.type === "password";
  if (isPassword) {
    confirmPasswordInput.type = "text";
  } else {
    confirmPasswordInput.type = "password";
  }
  signupConfirmIcon.classList.toggle("fa-eye-slash");
  signupConfirmIcon.classList.toggle("fa-eye");
});

//--Phần 5: Logic đăng nhập--//
//Tránh tải lại trang
loginForm.addEventListener('submit', (Event) => {
  Event.preventDefault();
  
  const emailLoginValue = emailLogin.value;
  const passwordLoginValue = passwordLogin.value;
  
  // Tìm user trong database
  const foundUser = FAKE_DATABASE.find((user) => user.email === emailLoginValue);
  
  if (foundUser) {
    if (passwordLoginValue === foundUser.password) {
      
      // ========================================
      // BƯỚC QUAN TRỌNG: LƯU USER VÀO localStorage
      // ========================================
      
      // Tạo object chứa thông tin user (KHÔNG lưu password vì lý do bảo mật)
      const userInfo = {
        id: foundUser.id,
        fullName: foundUser.fullName,
        email: foundUser.email,
        role: foundUser.role,
        avatarPath: foundUser.avatarPath,
        loginTime: new Date().toISOString() // Thời gian đăng nhập
      };
      
      // Lưu vào localStorage dưới dạng JSON string
      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      
      // Log để kiểm tra (xóa khi production)
      console.log(' Đăng nhập thành công! User info:', userInfo);
      
      // Hiển thị thông báo
      alert("Đăng nhập thành công! Chào mừng " + foundUser.fullName + "!");
      
      // Chuyển hướng đến Dashboard
      window.location.href = "dashboard.html";
      
    } else {
      alert("Mật khẩu không đúng. Vui lòng thử lại!");
    }
  } else {
    alert("Email không tồn tại. Vui lòng kiểm tra lại!");
  }
});
//Kiểm tra mật khẩu
 

