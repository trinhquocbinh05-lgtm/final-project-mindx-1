/* ===========================================
   FILE RIÊNG - CHỈ CHẠY TRÊN ATTENDANCE.HTML
   =========================================== */

console.log('✅ attendance.js loaded');

// ============================================
// BƯỚC 1: FAKE ATTENDANCE DATABASE
// ============================================

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

const ATTENDANCE_DATABASE = [
    // Dữ liệu hôm nay
    { id: 1, employeeId: "345321231", name: "Darlene Robertson", avatarPath: "/Final_Project/assets/img/employee1.jpg", date: today, checkIn: "08:30", checkOut: "17:35", overtime: "0:05", status: "Present" },
    { id: 2, employeeId: "987890345", name: "Floyd Miles", avatarPath: "/Final_Project/assets/img/employee2.jpg", date: today, checkIn: "08:25", checkOut: "17:30", overtime: "0:00", status: "Present" },
    { id: 3, employeeId: "453367122", name: "Cody Fisher", avatarPath: "/Final_Project/assets/img/employee3.jpg", date: today, checkIn: "08:20", checkOut: "17:50", overtime: "0:20", status: "Present" },
    { id: 4, employeeId: "345321231", name: "Dianne Russell", avatarPath: "/Final_Project/assets/img/employee4.jpg", date: today, checkIn: "--:--", checkOut: "--:--", overtime: "0:00", status: "Absent" },
    { id: 5, employeeId: "453677881", name: "Savannah Nguyen", avatarPath: "/Final_Project/assets/img/employee5.jpg", date: today, checkIn: "08:30", checkOut: "17:30", overtime: "0:00", status: "Present" },
    { id: 6, employeeId: "009918765", name: "Jacob Jones", avatarPath: "/Final_Project/assets/img/employee6.jpg", date: today, checkIn: "09:00", checkOut: "12:00", overtime: "0:00", status: "Half-day" },
    { id: 7, employeeId: "238870122", name: "Marvin McKinney", avatarPath: "/Final_Project/assets/img/employee7.jpg", date: today, checkIn: "--:--", checkOut: "--:--", overtime: "0:00", status: "Leave" },
    
    // Dữ liệu hôm qua
    { id: 8, employeeId: "345321231", name: "Darlene Robertson", avatarPath: "/Final_Project/assets/img/employee1.jpg", date: yesterday, checkIn: "08:28", checkOut: "17:30", overtime: "0:00", status: "Present" },
    { id: 9, employeeId: "987890345", name: "Floyd Miles", avatarPath: "/Final_Project/assets/img/employee2.jpg", date: yesterday, checkIn: "08:30", checkOut: "17:32", overtime: "0:02", status: "Present" },
    { id: 10, employeeId: "453367122", name: "Cody Fisher", avatarPath: "/Final_Project/assets/img/employee3.jpg", date: yesterday, checkIn: "08:25", checkOut: "17:30", overtime: "0:00", status: "Present" },
    { id: 11, employeeId: "345321231", name: "Dianne Russell", avatarPath: "/Final_Project/assets/img/employee4.jpg", date: yesterday, checkIn: "08:35", checkOut: "17:30", overtime: "0:00", status: "Present" }
];


// ============================================
// BƯỚC 2: LẤY CÁC PHẦN TỬ HTML (Đã thêm kiểm tra)
// ============================================

const tableBody = document.getElementById('attendance-table-body');
const searchInput = document.getElementById('table-search');
const datePicker = document.getElementById('attendance-date-picker');

// Cập nhật thông tin phân trang
const showingFrom = document.getElementById('showing-from');
const showingTo = document.getElementById('showing-to');
const totalRecords = document.getElementById('total-records');

// Tự động gán ngày hôm nay cho date picker (NẾU TỒN TẠI)
if(datePicker) {
  datePicker.value = today;
} else {
  console.error("Không tìm thấy #attendance-date-picker");
}

// ============================================
// BƯỚC 3: HÀM RENDER BẢNG CHẤM CÔNG
// ============================================

function renderAttendance(attendanceList) {
  // RÀO CHẮN AN TOÀN: Chỉ chạy nếu tableBody tồn tại
  if (!tableBody) {
    console.error("Lỗi: Không tìm thấy #attendance-table-body. Hàm render() đã dừng.");
    return;
  }
  
  tableBody.innerHTML = ''; // Xóa nội dung cũ
  
  // Cập nhật thông tin phân trang
  if (showingFrom && showingTo && totalRecords) {
    totalRecords.textContent = attendanceList.length;
    showingFrom.textContent = attendanceList.length > 0 ? 1 : 0;
    showingTo.textContent = attendanceList.length;
  }

  // Nếu không có dữ liệu, hiển thị thông báo
  if (attendanceList.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem;">No attendance data found for this selection.</td></tr>`;
    return;
  }
  
  // Duyệt qua từng record và tạo row
  attendanceList.forEach(att => {
    const row = document.createElement('tr');
    let statusClass = '';
    switch(att.status.toLowerCase()) {
      case 'present': statusClass = 'status-present'; break;
      case 'absent': statusClass = 'status-absent'; break;
      case 'leave': statusClass = 'status-leave'; break;
      case 'half-day': statusClass = 'status-halfday'; break;
      default: statusClass = 'status-permanent';
    }
    
    row.innerHTML = `
      <td>
        <div class="employee-info">
          <img src="${att.avatarPath}" alt="${att.name}" class="employee-avatar" 
               onerror="this.src='/Final_Project/assets/img/default.png'">
          <span class="employee-name">${att.name}</span>
        </div>
      </td>
      <td>${att.employeeId}</td>
      <td>${att.date}</td>
      <td>${att.checkIn}</td>
      <td>${att.checkOut}</td>
      <td>${att.overtime}</td>
      <td>
        <span class="status-badge ${statusClass}">${att.status}</span>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// ============================================
// BƯỚC 4: HÀM LỌC TỔNG HỢP (SEARCH VÀ DATE)
// ============================================

function applyFilters() {
  // RÀO CHẮN AN TOÀN: Đảm bảo các input tồn tại
  if (!searchInput || !datePicker) {
      console.error("Không tìm thấy ô search hoặc date picker. Hàm applyFilters() đã dừng.");
      return;
  }

  const searchTerm = searchInput.value.toLowerCase();
  const selectedDate = datePicker.value;
  
  const filteredList = ATTENDANCE_DATABASE.filter(att => {
    const dateMatch = att.date === selectedDate;
    const searchMatch = att.name.toLowerCase().includes(searchTerm) ||
                        att.employeeId.includes(searchTerm);
    return dateMatch && searchMatch;
  });
  
  renderAttendance(filteredList);
}

// ============================================
// BƯỚC 5: GẮN EVENT LISTENERS (Đã thêm kiểm tra)
// ============================================

if (searchInput) {
  searchInput.addEventListener('input', applyFilters);
} else {
  console.error("Không tìm thấy #table-search để gắn event.");
}

if (datePicker) {
  datePicker.addEventListener('input', applyFilters);
} else {
  console.error("Không tìm thấy #attendance-date-picker để gắn event.");
}

// ============================================
// BƯỚC 6: RENDER BAN ĐẦU
// ============================================

// Chỉ chạy render ban đầu NẾU các thành phần đã sẵn sàng
if (tableBody && searchInput && datePicker) {
    applyFilters();
} else {
    console.error("Một hoặc nhiều thành phần HTML chính (tbody, search, datepicker) bị thiếu. Không thể render ban đầu.");
}