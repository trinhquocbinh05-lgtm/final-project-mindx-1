/* ===========================================
   FILE RIÊNG - CHỈ CHẠY TRÊN DEPARTMENTS.HTML
   =========================================== */

console.log('✅ departments.js loaded');

// ============================================
// BƯỚC 1: FAKE DEPARTMENTS DATABASE
// ============================================

// (Chúng ta có thể lấy HOD từ database nhân viên)
// (Đây là dữ liệu rút gọn từ file employees.js của bạn)
const HOD_DATA = {
    "Design": { name: "Savannah Nguyen", avatar: "/Final_Project/assets/img/employee5.jpg" },
    "Development": { name: "Marvin McKinney", avatar: "/Final_Project/assets/img/employee7.jpg" },
    "Sales": { name: "Cody Fisher", avatar: "/Final_Project/assets/img/employee3.jpg" },
    "PM": { name: "Brooklyn Simmons", avatar: "/Final_Project/assets/img/employee8.jpg" },
    "HR": { name: "Kristin Watson", avatar: "/Final_Project/assets/img/employee9.jpg" },
    "BA": { name: "Devon Lane", avatar: "/Final_Project/assets/img/employee12.jpg" }
};

const DEPARTMENTS_DATABASE = [
  { id: 1, name: "Design", hod: HOD_DATA["Design"], employeeCount: 2 },
  { id: 2, name: "Development", hod: HOD_DATA["Development"], employeeCount: 5 },
  { id: 3, name: "Sales", hod: HOD_DATA["Sales"], employeeCount: 2 },
  { id: 4, name: "Project Management", hod: HOD_DATA["PM"], employeeCount: 1 },
  { id: 5, name: "Human Resources", hod: HOD_DATA["HR"], employeeCount: 1 },
  { id: 6, name: "Business Analyst", hod: HOD_DATA["BA"], employeeCount: 1 }
];

// ============================================
// BƯỚC 2: LẤY CÁC PHẦN TỬ HTML
// ============================================

const tableBody = document.getElementById('departments-table-body');
const searchInput = document.getElementById('table-search');

// ============================================
// BƯỚC 3: HÀM RENDER BẢNG PHÒNG BAN
// ============================================

function renderDepartments(departmentList) {
  if (!tableBody) {
    console.error("Lỗi: Không tìm thấy #departments-table-body");
    return;
  }
  
  tableBody.innerHTML = ''; // Xóa nội dung cũ
  
  if (departmentList.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 2rem;">No departments found.</td></tr>`;
    return;
  }
  
  departmentList.forEach(dept => {
    const row = document.createElement('tr');
    
    // Tạo HTML cho ô Head of Department (HOD)
    const hodHtml = `
      <div class="employee-info">
        <img src="${dept.hod.avatar}" alt="${dept.hod.name}" class="employee-avatar"
             onerror="this.src='/Final_Project/assets/img/default.png'">
        <span class="employee-name">${dept.hod.name}</span>
      </div>
    `;

    // Tạo HTML cho ô Department Name (thêm icon)
    const deptNameHtml = `
      <div class="employee-info">
        <span class="employee-name" style="font-weight: 600;">${dept.name}</span>
      </div>
    `;
    
    row.innerHTML = `
      <td>${deptNameHtml}</td>
      <td>${hodHtml}</td>
      <td>${dept.employeeCount}</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn" title="View">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <button class="action-btn" title="Edit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// ============================================
// BƯỚC 4: HÀM LỌC (SEARCH)
// ============================================

function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  
  const filteredList = DEPARTMENTS_DATABASE.filter(dept => {
    return dept.name.toLowerCase().includes(searchTerm) ||
           dept.hod.name.toLowerCase().includes(searchTerm);
  });
  
  renderDepartments(filteredList);
}

// ============================================
// BƯỚC 5: GẮN EVENT LISTENERS
// ============================================

if (searchInput) {
  searchInput.addEventListener('input', applyFilters);
}

// ============================================
// BƯỚC 6: RENDER BAN ĐẦU
// ============================================

if (tableBody) {
  renderDepartments(DEPARTMENTS_DATABASE);
}