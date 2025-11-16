/* ===========================================
   FILE RIÊNG - CHỈ CHẠY TRÊN EMPLOYEES.HTML
   =========================================== */

console.log('employees.js loaded');

// ============================================
// DATABASE NHÂN VIÊN (LOGIC MỚI)
// ============================================
const DEFAULT_EMPLOYEES_DATABASE = [
  {
    id: 1,
    name: "Darlene Robertson",
    employeeId: "345321231",
    department: "Design",
    designation: "UI/UX Designer",
    type: "Office",
    status: "Permanent",
    avatarPath: "assets/img/employee1.jpg"
  },
  {
    id: 2,
    name: "Floyd Miles",
    employeeId: "987890345",
    department: "Development",
    designation: "PHP Developer",
    type: "Office",
    status: "Permanent",
    avatarPath: "assets/img/employee2.jpg"
  },
  {
    id: 3,
    name: "Cody Fisher",
    employeeId: "453367122",
    department: "Sales",
    designation: "Sales Manager",
    type: "Office",
    status: "Permanent",
    avatarPath: "assets/img/employee3.jpg"
  },
  {
    id: 4,
    name: "Dianne Russell",
    employeeId: "345321231",
    department: "Sales",
    designation: "BDM",
    type: "Remote",
    status: "Permanent",
    avatarPath: "assets/img/employee4.jpg"
  },
  {
    id: 5,
    name: "Savannah Nguyen",
    employeeId: "453677881",
    department: "Design",
    designation: "Design Lead",
    type: "Office",
    status: "Permanent",
    avatarPath: "assets/img/employee5.jpg"
  },
  {
    id: 6,
    name: "Jacob Jones",
    employeeId: "009918765",
    department: "Development",
    designation: "Python Developer",
    type: "Remote",
    status: "Permanent",
    avatarPath: "assets/img/employee6.jpg"
  },
  {
    id: 7,
    name: "Marvin McKinney",
    employeeId: "238870122",
    department: "Development",
    designation: "Sr. UI Developer",
    type: "Remote",
    status: "Permanent",
    avatarPath: "assets/img/employee7.jpg"
  },
  {
    id: 8,
    name: "Brooklyn Simmons",
    employeeId: "124335111",
    department: "PM",
    designation: "Project Manager",
    type: "Office",
    status: "Permanent",
    avatarPath: "assets/img/employee8.jpg"
  },
  {
    id: 9,
    name: "Kristin Watson",
    employeeId: "435540099",
    department: "HR",
    designation: "HR Executive",
    type: "Office",
    status: "Permanent",
    avatarPath: "assets/img/employee9.jpg"
  },
  {
    id: 10,
    name: "Kathryn Murphy",
    employeeId: "009812890",
    department: "Development",
    designation: "React JS Developer",
    type: "Office",
    status: "Permanent",
    avatarPath: "assets/img/employee10.jpg"
  },
  {
    id: 11,
    name: "Arlene McCoy",
    employeeId: "671190345",
    department: "Development",
    designation: "Node JS Developer",
    type: "Office",
    status: "Permanent",
    avatarPath: "assets/img/employee11.jpg"
  },
  {
    id: 12,
    name: "Devon Lane",
    employeeId: "091233412",
    department: "BA",
    designation: "Business Analyst",
    type: "Remote",
    status: "Permanent",
    avatarPath: "assets/img/employee12.jpg"
  }
];

const DB_STORAGE_KEY = 'employeesDB_v1'; 

function saveDatabase() {
  localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(EMPLOYEES_DATABASE));
  console.log('💾 Database đã được lưu vào localStorage');
}

function loadDatabase() {
  const dbString = localStorage.getItem(DB_STORAGE_KEY);
  
  if (dbString) {
    console.log('✅ Tải database từ localStorage');
    return JSON.parse(dbString);
  } else {
    console.log('⚠️ Không tìm thấy database, tải dữ liệu mặc định');
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(DEFAULT_EMPLOYEES_DATABASE));
    return DEFAULT_EMPLOYEES_DATABASE;
  }
}

let EMPLOYEES_DATABASE = loadDatabase();


// ============================================
// TRUY CẬP CÁC PHẦN TỬ DOM
// ============================================

// --- Bảng ---
const tableBody = document.getElementById('employees-table-body');

// --- Tìm kiếm ---
const searchInput = document.getElementById('table-search');

// --- Modal Thêm/Sửa ---
const employeeModal = document.getElementById('employee-modal');
const modalTitle = document.getElementById('modal-title');
const employeeForm = document.getElementById('employee-form');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const addEmployeeBtn = document.getElementById('add-employee-btn');
const employeeIdHidden = document.getElementById('employee-id-hidden');
const modalFullName = document.getElementById('modal-full-name');
const modalEmployeeId = document.getElementById('modal-employee-id');
const modalDepartment = document.getElementById('modal-department');
const modalDesignation = document.getElementById('modal-designation');
const modalType = document.getElementById('modal-type');
const modalStatus = document.getElementById('modal-status');

// --- Modal Lọc ---
const filterModal = document.getElementById('filter-modal');
const filterBtn = document.getElementById('filter-btn');
const filterForm = document.getElementById('filter-form');
const filterCancelBtn = document.getElementById('filter-cancel-btn');
const filterResetBtn = document.getElementById('filter-reset-btn');
const filterDepartment = document.getElementById('filter-department');
const filterType = document.getElementById('filter-type');
const filterStatus = document.getElementById('filter-status');

// --- THAY ĐỔI MỚI: Thêm DOM cho Modal Xóa ---
const deleteModal = document.getElementById('delete-modal');
const deleteEmployeeName = document.getElementById('delete-employee-name');
const deleteCancelBtn = document.getElementById('delete-cancel-btn');
const deleteConfirmBtn = document.getElementById('delete-confirm-btn');
// --- Hết thay đổi ---

// --- Biến trạng thái ---
let currentEditId = null; 
let idPendingDelete = null; // --- THAY ĐỔI MỚI: Biến tạm để lưu ID chờ xóa ---

// ============================================
// HÀM RENDER BẢNG (Không thay đổi)
// ============================================
function renderEmployees(employees) {
  tableBody.innerHTML = '';
  
  if (employees.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2rem;">No employees found.</td></tr>`;
    return;
  }
  
  employees.forEach(emp => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="employee-info">
          <img src="${emp.avatarPath}" alt="${emp.name}" class="employee-avatar" 
               onerror="this.src='assets/img/user.png'">
          <span class="employee-name">${emp.name}</span>
        </div>
      </td>
      <td>${emp.employeeId}</td>
      <td>${emp.department}</td>
      <td>${emp.designation}</td>
      <td>${emp.type}</td>
      <td><span class="status-badge status-permanent">${emp.status}</span></td>
      <td>
        <div class="action-buttons">
          <button class="action-btn btn-edit" data-id="${emp.id}" title="Edit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="action-btn btn-delete" data-id="${emp.id}" title="Delete">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// ============================================
// HÀM LỌC VÀ TÌM KIẾM (TRUNG TÂM) (Không thay đổi)
// ============================================
function applyFiltersAndSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const deptValue = filterDepartment.value;
  const typeValue = filterType.value;
  const statusValue = filterStatus.value;
  
  let filteredData = EMPLOYEES_DATABASE;
  
  if (deptValue) {
    filteredData = filteredData.filter(emp => emp.department === deptValue);
  }
  if (typeValue) {
    filteredData = filteredData.filter(emp => emp.type === typeValue);
  }
  if (statusValue) {
    filteredData = filteredData.filter(emp => emp.status === statusValue);
  }
  
  if (searchTerm) {
    filteredData = filteredData.filter(emp => {
      return emp.name.toLowerCase().includes(searchTerm) ||
             emp.employeeId.includes(searchTerm) ||
             emp.department.toLowerCase().includes(searchTerm) ||
             emp.designation.toLowerCase().includes(searchTerm);
    });
  }
  
  renderEmployees(filteredData);
}

// ============================================
// LOGIC MODAL: THÊM / SỬA NHÂN VIÊN (CRUD)
// ============================================
function openEmployeeModal(mode, employeeId = null) {
  employeeModal.classList.add('active'); 
  
  if (mode === 'add') {
    modalTitle.textContent = 'Add New Employee';
    employeeForm.reset(); 
    currentEditId = null;
  } else if (mode === 'edit') {
    modalTitle.textContent = 'Edit Employee';
    currentEditId = employeeId;
    
    const employee = EMPLOYEES_DATABASE.find(emp => emp.id === employeeId);
    if (employee) {
      modalFullName.value = employee.name;
      modalEmployeeId.value = employee.employeeId;
      modalDepartment.value = employee.department;
      modalDesignation.value = employee.designation;
      modalType.value = employee.type;
      modalStatus.value = employee.status;
    }
  }
}

function closeEmployeeModal() {
  employeeModal.classList.remove('active'); 
}

addEmployeeBtn.addEventListener('click', () => {
  openEmployeeModal('add');
});

modalCancelBtn.addEventListener('click', closeEmployeeModal);

employeeForm.addEventListener('submit', (e) => {
  e.preventDefault(); 
  
  const employeeData = {
    name: modalFullName.value,
    employeeId: modalEmployeeId.value,
    department: modalDepartment.value,
    designation: modalDesignation.value,
    type: modalType.value,
    status: modalStatus.value,
    avatarPath: "assets/img/user.png" 
  };

  if (currentEditId === null) {
    employeeData.id = Date.now(); 
    EMPLOYEES_DATABASE.push(employeeData); 
    console.log('✅ Added new employee:', employeeData);
  } else {
    const index = EMPLOYEES_DATABASE.findIndex(emp => emp.id === currentEditId);
    if (index !== -1) {
      const oldData = EMPLOYEES_DATABASE[index];
      EMPLOYEES_DATABASE[index] = { ...oldData, ...employeeData, id: currentEditId, avatarPath: oldData.avatarPath };
      console.log('✅ Updated employee:', EMPLOYEES_DATABASE[index]);
    }
  }
  
  saveDatabase(); 
  applyFiltersAndSearch(); 
  closeEmployeeModal(); 
});

// ============================================
// LOGIC SỬA / XÓA (EVENT DELEGATION)
// ============================================

// --- THAY ĐỔI MỚI: Tách logic modal xóa ra ---
function openDeleteModal(id, name) {
  idPendingDelete = id; // Lưu ID của người sắp bị xóa
  deleteEmployeeName.textContent = name; // Hiển thị tên
  deleteModal.classList.add('active'); // Mở modal
}

function closeDeleteModal() {
  idPendingDelete = null; // Reset ID
  deleteModal.classList.remove('active'); // Đóng modal
}
// --- Hết thay đổi ---

tableBody.addEventListener('click', (e) => {
  // Sửa
  const editBtn = e.target.closest('.btn-edit');
  if (editBtn) {
    const idToEdit = parseInt(editBtn.dataset.id); 
    openEmployeeModal('edit', idToEdit);
    return; 
  }
  
  // --- THAY ĐỔI MỚI: Logic nút Xóa ---
  // Xóa
  const deleteBtn = e.target.closest('.btn-delete');
  if (deleteBtn) {
    const idToDelete = parseInt(deleteBtn.dataset.id);
    const employee = EMPLOYEES_DATABASE.find(emp => emp.id === idToDelete);
    
    // Thay vì gọi confirm(), chúng ta gọi modal
    if (employee) {
      openDeleteModal(idToDelete, employee.name);
    }
  }
  // --- Hết thay đổi ---
});

// --- THAY ĐỔI MỚI: Thêm sự kiện cho các nút trong Modal Xóa ---
// Nút "Cancel"
deleteCancelBtn.addEventListener('click', closeDeleteModal);

// Nút "Delete" (Nút xác nhận xóa)
deleteConfirmBtn.addEventListener('click', () => {
  if (idPendingDelete !== null) {
    // Lấy logic xóa từ bên trên
    EMPLOYEES_DATABASE = EMPLOYEES_DATABASE.filter(emp => emp.id !== idPendingDelete);
    
    saveDatabase(); // Lưu lại database
    
    applyFiltersAndSearch(); // Render lại bảng
    console.log('🗑️ Deleted employee with id:', idPendingDelete);
    
    closeDeleteModal(); // Đóng modal sau khi xóa
  }
});
// --- Hết thay đổi ---


// ============================================
// LOGIC MODAL: LỌC (FILTER) (Không thay đổi)
// ============================================
function populateFilterDropdowns() {
  const departments = [...new Set(EMPLOYEES_DATABASE.map(emp => emp.department))];
  filterDepartment.innerHTML = '<option value="">All Departments</option>'; 
  
  departments.sort().forEach(dept => {
    const option = document.createElement('option');
    option.value = dept;
    option.textContent = dept;
    filterDepartment.appendChild(option);
  });
  console.log('Populated filter dropdowns.');
}

filterBtn.addEventListener('click', () => {
  filterModal.classList.add('active');
});

filterCancelBtn.addEventListener('click', () => {
  filterModal.classList.remove('active');
});

filterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  applyFiltersAndSearch(); 
  filterModal.classList.remove('active'); 
});

filterResetBtn.addEventListener('click', () => {
  filterForm.reset(); 
  applyFiltersAndSearch(); 
  filterModal.classList.remove('active'); 
});

// ============================================
// LOGIC TÌM KIẾM (SEARCH) (Không thay đổi)
// ============================================
searchInput.addEventListener('input', applyFiltersAndSearch);

// ============================================
// KHỞI TẠO KHI TẢI TRANG (Không thay đổi)
// ============================================
populateFilterDropdowns(); 
renderEmployees(EMPLOYEES_DATABASE); 
console.log('✅ Initial render complete.');