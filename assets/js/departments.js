/* ===========================================
   FILE RIÊNG - CHỈ CHẠY TRÊN DEPARTMENTS.HTML
   =========================================== */

console.log('✅ departments.js loaded');

// ============================================
// BƯỚC 1: DATABASE
// ============================================
const HOD_DATA = {
    "Design": { name: "Savannah Nguyen", avatar: "assets/img/employee5.jpg" },
    "Development": { name: "Marvin McKinney", avatar: "assets/img/employee7.jpg" },
    "Sales": { name: "Cody Fisher", avatar: "assets/img/employee3.jpg" },
    "PM": { name: "Brooklyn Simmons", avatar: "assets/img/employee8.jpg" },
    "HR": { name: "Kristin Watson", avatar: "assets/img/employee9.jpg" },
    "BA": { name: "Devon Lane", avatar: "assets/img/employee12.jpg" }
};

const DEPARTMENTS_DATABASE = [
  { id: 1, name: "Design", hod: HOD_DATA["Design"], employeeCount: 2, projects: 4, budget: "$120,000", description: "Responsible for UI/UX design and branding assets." },
  { id: 2, name: "Development", hod: HOD_DATA["Development"], employeeCount: 5, projects: 8, budget: "$450,000", description: "Core engineering team building our SaaS products." },
  { id: 3, name: "Sales", hod: HOD_DATA["Sales"], employeeCount: 2, projects: 2, budget: "$200,000", description: "Driving revenue and managing client relationships." },
  { id: 4, name: "Project Management", hod: HOD_DATA["PM"], employeeCount: 1, projects: 6, budget: "$150,000", description: "Ensuring projects are delivered on time and within scope." },
  { id: 5, name: "Human Resources", hod: HOD_DATA["HR"], employeeCount: 1, projects: 3, budget: "$80,000", description: "Managing talent acquisition and employee welfare." },
  { id: 6, name: "Business Analyst", hod: HOD_DATA["BA"], employeeCount: 1, projects: 5, budget: "$95,000", description: "Analyzing business needs and data trends." }
];

// ============================================
// BƯỚC 2: RENDER TABLE
// ============================================

const tableBody = document.getElementById('departments-table-body');
const searchInput = document.getElementById('table-search');

function renderDepartments(departmentList) {
  if (!tableBody) return;
  tableBody.innerHTML = ''; 
  
  if (departmentList.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 2rem;">No departments found.</td></tr>`;
    return;
  }
  
  departmentList.forEach(dept => {
    const row = document.createElement('tr');
    
    // Head of Department
    const hodHtml = `
      <div class="employee-info">
        <img src="${dept.hod.avatar}" alt="${dept.hod.name}" class="employee-avatar"
             onerror="this.src='assets/img/default.png'">
        <span class="employee-name">${dept.hod.name}</span>
      </div>
    `;

    // Department Name
    const deptNameHtml = `
      <div class="employee-info">
        <span class="employee-name" style="font-weight: 600; font-size: 0.95rem;">${dept.name}</span>
      </div>
    `;
    
    // Action Buttons (Đã thêm class 'view', 'edit', 'delete')
    row.innerHTML = `
      <td>${deptNameHtml}</td>
      <td>${hodHtml}</td>
      <td>
        <span class="status-badge status-present" style="background:#e0e7ff; color:#4338ca;">
            ${dept.employeeCount} Members
        </span>
      </td>
      <td>
        <div class="action-buttons">
          <button class="btn-icon view" onclick="viewDepartment(${dept.id})" title="View Details">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
          <button class="btn-icon edit" onclick="editDepartment(${dept.id})" title="Edit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          <button class="btn-icon delete" onclick="deleteDepartment(${dept.id})" title="Delete">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// ============================================
// BƯỚC 3: MODAL LOGIC
// ============================================

// View Department Detail
function viewDepartment(deptId) {
  const dept = DEPARTMENTS_DATABASE.find(d => d.id === deptId);
  if (!dept) return;

  const modal = document.getElementById('department-modal');
  const modalBody = document.getElementById('modal-body');
  document.getElementById('modal-title').textContent = 'Department Details';

  modalBody.innerHTML = `
    <div class="department-details">
      <div class="dept-header">
        <div class="dept-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <div class="dept-title">
          <h3>${dept.name}</h3>
          <p>Managed by ${dept.hod.name}</p>
        </div>
      </div>

      <div class="detail-section">
        <h4>About</h4>
        <p style="line-height: 1.6; color: var(--c-text-secondary);">${dept.description}</p>
      </div>

      <div class="detail-section">
        <h4>Department Head</h4>
        <div class="hod-card">
          <img src="${dept.hod.avatar}" alt="${dept.hod.name}" class="hod-avatar" onerror="this.src='assets/img/default.png'">
          <div class="hod-info">
            <span class="hod-name">${dept.hod.name}</span>
            <span class="hod-role">Head of ${dept.name}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h4>Key Metrics</h4>
        <div class="stats-grid">
          <div class="stat-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
            <div>
                <span class="stat-label">Employees</span>
                <span class="stat-value">${dept.employeeCount}</span>
            </div>
          </div>
          <div class="stat-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            <div>
                <span class="stat-label">Budget</span>
                <span class="stat-value">${dept.budget}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-actions">
        <button class="btn-primary" onclick="editDepartment(${dept.id})">Edit</button>
        <button class="btn-secondary" onclick="closeModal()">Close</button>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

// Edit Department
function editDepartment(deptId) {
  const dept = DEPARTMENTS_DATABASE.find(d => d.id === deptId);
  if (!dept) return;

  const modal = document.getElementById('department-modal');
  const modalBody = document.getElementById('modal-body');
  document.getElementById('modal-title').textContent = 'Edit Department';

  modalBody.innerHTML = `
    <div class="department-edit-form">
      <div class="form-group">
        <label>Department Name</label>
        <input type="text" id="edit-name" class="form-input" value="${dept.name}">
      </div>
      
      <div class="form-group">
        <label>Description</label>
        <textarea id="edit-desc" class="form-input" rows="3" style="width:100%; border-radius:8px; padding:0.75rem; border:1px solid var(--c-border); background:var(--c-surface); color:var(--c-text-primary);">${dept.description}</textarea>
      </div>

      <div class="modal-actions">
        <button class="btn-primary" onclick="saveEdit(${dept.id})">Save Changes</button>
        <button class="btn-secondary" onclick="closeModal()">Cancel</button>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

// Save Logic
function saveEdit(deptId) {
    const dept = DEPARTMENTS_DATABASE.find(d => d.id === deptId);
    if(dept) {
        const newName = document.getElementById('edit-name').value;
        const newDesc = document.getElementById('edit-desc').value;
        dept.name = newName;
        dept.description = newDesc;
        renderDepartments(DEPARTMENTS_DATABASE);
        closeModal();
        alert('Department updated successfully!');
    }
}

// Delete Logic
function deleteDepartment(deptId) {
    if(confirm('Are you sure you want to delete this department?')) {
        const index = DEPARTMENTS_DATABASE.findIndex(d => d.id === deptId);
        if (index > -1) {
            DEPARTMENTS_DATABASE.splice(index, 1);
            renderDepartments(DEPARTMENTS_DATABASE);
        }
    }
}

function closeModal() {
    document.getElementById('department-modal').classList.remove('active');
}

// Helpers
if (document.getElementById('close-modal-btn')) {
    document.getElementById('close-modal-btn').addEventListener('click', closeModal);
}
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase();
        const filtered = DEPARTMENTS_DATABASE.filter(d => d.name.toLowerCase().includes(term) || d.hod.name.toLowerCase().includes(term));
        renderDepartments(filtered);
    });
}

// Init
if (tableBody) {
    renderDepartments(DEPARTMENTS_DATABASE);
}