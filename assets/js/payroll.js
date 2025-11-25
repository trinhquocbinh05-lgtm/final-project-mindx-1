console.log('payroll.js loaded');

const payrollData = [
    {
        id: 1,
        name: "Darlene Robertson",
        department: "Design",
        baseSalary: 5500,
        allowances: 800,
        deductions: 300,
        status: "paid",
        paymentDate: "2024-12-01"
    },
    {
        id: 2,
        name: "Floyd Miles",
        department: "Development",
        baseSalary: 6500,
        allowances: 1000,
        deductions: 400,
        status: "paid",
        paymentDate: "2024-12-01"
    },
    {
        id: 3,
        name: "Cody Fisher",
        department: "Sales",
        baseSalary: 5000,
        allowances: 1200,
        deductions: 250,
        status: "pending",
        paymentDate: null
    },
    {
        id: 4,
        name: "Dianne Russell",
        department: "Sales",
        baseSalary: 5200,
        allowances: 900,
        deductions: 280,
        status: "pending",
        paymentDate: null
    },
    {
        id: 5,
        name: "Sarah Johnson",
        department: "Development",
        baseSalary: 7000,
        allowances: 1100,
        deductions: 450,
        status: "paid",
        paymentDate: "2024-12-01"
    },
    {
        id: 6,
        name: "Mike Chen",
        department: "Design",
        baseSalary: 6000,
        allowances: 950,
        deductions: 350,
        status: "paid",
        paymentDate: "2024-12-01"
    },
    {
        id: 7,
        name: "Emma Wilson",
        department: "Marketing",
        baseSalary: 5800,
        allowances: 850,
        deductions: 320,
        status: "pending",
        paymentDate: null
    },
    {
        id: 8,
        name: "Tom Anderson",
        department: "Development",
        baseSalary: 6800,
        allowances: 1050,
        deductions: 420,
        status: "paid",
        paymentDate: "2024-12-01"
    }
];

let currentFilter = {
    month: '12',
    status: 'all',
    department: 'all'
};

function calculateNetSalary(baseSalary, allowances, deductions) {
    return baseSalary + allowances - deductions;
}

function formatCurrency(amount) {
    return '$' + amount.toLocaleString('en-US');
}

function updateStats() {
    const filteredData = getFilteredData();

    const totalPayroll = filteredData.reduce((sum, emp) =>
        sum + calculateNetSalary(emp.baseSalary, emp.allowances, emp.deductions), 0
    );

    const paidCount = filteredData.filter(emp => emp.status === 'paid').length;
    const pendingCount = filteredData.filter(emp => emp.status === 'pending').length;
    const avgSalary = filteredData.length > 0 ? totalPayroll / filteredData.length : 0;

    document.getElementById('total-payroll').textContent = formatCurrency(totalPayroll);
    document.getElementById('paid-count').textContent = paidCount;
    document.getElementById('pending-count').textContent = pendingCount;
    document.getElementById('avg-salary').textContent = formatCurrency(Math.round(avgSalary));
}

function getFilteredData() {
    return payrollData.filter(emp => {
        const statusMatch = currentFilter.status === 'all' || emp.status === currentFilter.status;
        const deptMatch = currentFilter.department === 'all' ||
            emp.department.toLowerCase() === currentFilter.department;
        return statusMatch && deptMatch;
    });
}

function renderPayrollTable() {
    const tbody = document.getElementById('payroll-table-body');
    if (!tbody) return;

    const filteredData = getFilteredData();

    if (filteredData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 3rem; color: var(--c-text-secondary);">
                    No payroll data found for the selected filters
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredData.map(emp => {
        const netSalary = calculateNetSalary(emp.baseSalary, emp.allowances, emp.deductions);
        const statusClass = emp.status === 'paid' ? 'status-active' : 'status-warning';
        const statusText = emp.status === 'paid' ? 'Paid' : 'Pending';

        return `
            <tr>
                <td>
                    <div class="employee-cell">
                        <div class="employee-avatar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <span class="employee-name">${emp.name}</span>
                    </div>
                </td>
                <td>${emp.department}</td>
                <td>${formatCurrency(emp.baseSalary)}</td>
                <td class="text-success">${formatCurrency(emp.allowances)}</td>
                <td class="text-danger">${formatCurrency(emp.deductions)}</td>
                <td><strong>${formatCurrency(netSalary)}</strong></td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="viewPayrollDetails(${emp.id})" title="View Details">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        ${emp.status === 'pending' ? `
                            <button class="btn-icon btn-icon-success" onclick="markAsPaid(${emp.id})" title="Mark as Paid">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </button>
                        ` : `
                            <button class="btn-icon btn-icon-success" disabled title="Already Paid">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </button>
                        `}
                        <button class="btn-icon btn-icon-primary" onclick="downloadPayslip(${emp.id})" title="Download Payslip">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                        </button>
                        <button class="btn-icon btn-icon-warning" onclick="editPayroll(${emp.id})" title="Edit Payroll">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    updateStats();
}

function viewPayrollDetails(empId) {
    const emp = payrollData.find(e => e.id === empId);
    if (!emp) return;

    const netSalary = calculateNetSalary(emp.baseSalary, emp.allowances, emp.deductions);
    const modal = document.getElementById('payroll-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div class="payroll-details">
            <div class="detail-section">
                <h3>Employee Information</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Name:</span>
                        <span class="detail-value">${emp.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Department:</span>
                        <span class="detail-value">${emp.department}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Status:</span>
                        <span class="status-badge ${emp.status === 'paid' ? 'status-active' : 'status-warning'}">
                            ${emp.status === 'paid' ? 'Paid' : 'Pending'}
                        </span>
                    </div>
                    ${emp.paymentDate ? `
                        <div class="detail-item">
                            <span class="detail-label">Payment Date:</span>
                            <span class="detail-value">${emp.paymentDate}</span>
                        </div>
                    ` : ''}
                </div>
            </div>

            <div class="detail-section">
                <h3>Salary Breakdown</h3>
                <div class="salary-breakdown">
                    <div class="breakdown-item">
                        <span>Base Salary</span>
                        <span class="breakdown-amount">${formatCurrency(emp.baseSalary)}</span>
                    </div>
                    <div class="breakdown-item positive">
                        <span>Allowances</span>
                        <span class="breakdown-amount">+ ${formatCurrency(emp.allowances)}</span>
                    </div>
                    <div class="breakdown-item negative">
                        <span>Deductions</span>
                        <span class="breakdown-amount">- ${formatCurrency(emp.deductions)}</span>
                    </div>
                    <div class="breakdown-item total">
                        <span><strong>Net Salary</strong></span>
                        <span class="breakdown-amount"><strong>${formatCurrency(netSalary)}</strong></span>
                    </div>
                </div>
            </div>

            <div class="modal-actions">
                ${emp.status === 'pending' ? `
                    <button class="btn-primary" onclick="markAsPaid(${emp.id}); closeModal();">
                        Mark as Paid
                    </button>
                ` : ''}
                <button class="btn-secondary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function markAsPaid(empId) {
    const emp = payrollData.find(e => e.id === empId);
    if (emp && confirm(`Mark salary as paid for ${emp.name}?`)) {
        emp.status = 'paid';
        emp.paymentDate = new Date().toISOString().split('T')[0];
        renderPayrollTable();

        showNotification('success', `Payment marked as paid for ${emp.name}`);
    }
}

function downloadPayslip(empId) {
    const emp = payrollData.find(e => e.id === empId);
    if (!emp) return;

    const netSalary = calculateNetSalary(emp.baseSalary, emp.allowances, emp.deductions);

    const payslipData = `
========================================
              PAYSLIP
========================================

Employee Name: ${emp.name}
Department: ${emp.department}
Payment Date: ${emp.paymentDate || 'Pending'}
Status: ${emp.status === 'paid' ? 'PAID' : 'PENDING'}

----------------------------------------
SALARY BREAKDOWN
----------------------------------------

Base Salary:      ${formatCurrency(emp.baseSalary)}
Allowances:     + ${formatCurrency(emp.allowances)}
Deductions:     - ${formatCurrency(emp.deductions)}
----------------------------------------
Net Salary:       ${formatCurrency(netSalary)}
========================================

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([payslipData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Payslip_${emp.name.replace(/\s+/g, '_')}_${currentFilter.month}_2024.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showNotification('success', `Payslip downloaded for ${emp.name}`);
}

function editPayroll(empId) {
    const emp = payrollData.find(e => e.id === empId);
    if (!emp) return;

    const modal = document.getElementById('payroll-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.textContent = 'Edit Payroll';

    modalBody.innerHTML = `
        <div class="payroll-edit-form">
            <div class="form-section">
                <h3>Employee: ${emp.name}</h3>
                <p class="form-subtitle">Department: ${emp.department}</p>
            </div>

            <div class="form-group">
                <label for="edit-base-salary">Base Salary</label>
                <input type="number" id="edit-base-salary" value="${emp.baseSalary}" class="form-input" />
            </div>

            <div class="form-group">
                <label for="edit-allowances">Allowances</label>
                <input type="number" id="edit-allowances" value="${emp.allowances}" class="form-input" />
            </div>

            <div class="form-group">
                <label for="edit-deductions">Deductions</label>
                <input type="number" id="edit-deductions" value="${emp.deductions}" class="form-input" />
            </div>

            <div class="net-salary-preview">
                <span>Net Salary:</span>
                <span id="preview-net-salary">${formatCurrency(calculateNetSalary(emp.baseSalary, emp.allowances, emp.deductions))}</span>
            </div>

            <div class="modal-actions">
                <button class="btn-primary" onclick="savePayrollEdit(${emp.id})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Save Changes
                </button>
                <button class="btn-secondary" onclick="closeModal()">Cancel</button>
            </div>
        </div>
    `;

    const updatePreview = () => {
        const base = parseFloat(document.getElementById('edit-base-salary').value) || 0;
        const allow = parseFloat(document.getElementById('edit-allowances').value) || 0;
        const deduct = parseFloat(document.getElementById('edit-deductions').value) || 0;
        const net = calculateNetSalary(base, allow, deduct);
        document.getElementById('preview-net-salary').textContent = formatCurrency(net);
    };

    document.getElementById('edit-base-salary')?.addEventListener('input', updatePreview);
    document.getElementById('edit-allowances')?.addEventListener('input', updatePreview);
    document.getElementById('edit-deductions')?.addEventListener('input', updatePreview);

    modal.classList.add('active');
}

function savePayrollEdit(empId) {
    const emp = payrollData.find(e => e.id === empId);
    if (!emp) return;

    const baseSalary = parseFloat(document.getElementById('edit-base-salary').value);
    const allowances = parseFloat(document.getElementById('edit-allowances').value);
    const deductions = parseFloat(document.getElementById('edit-deductions').value);

    if (isNaN(baseSalary) || isNaN(allowances) || isNaN(deductions)) {
        alert('Please enter valid numbers for all fields');
        return;
    }

    emp.baseSalary = baseSalary;
    emp.allowances = allowances;
    emp.deductions = deductions;

    closeModal();
    renderPayrollTable();
    showNotification('success', `Payroll updated for ${emp.name}`);
}

function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${type === 'success' ?
                    '<polyline points="20 6 9 17 4 12"></polyline>' :
                    '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
                }
            </svg>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function closeModal() {
    const modal = document.getElementById('payroll-modal');
    modal.classList.remove('active');
}

function setupEventListeners() {
    document.getElementById('month-filter')?.addEventListener('change', (e) => {
        currentFilter.month = e.target.value;
        renderPayrollTable();
    });

    document.getElementById('status-filter')?.addEventListener('change', (e) => {
        currentFilter.status = e.target.value;
        renderPayrollTable();
    });

    document.getElementById('dept-filter')?.addEventListener('change', (e) => {
        currentFilter.department = e.target.value;
        renderPayrollTable();
    });

    document.getElementById('close-modal-btn')?.addEventListener('click', closeModal);

    document.getElementById('payroll-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'payroll-modal') {
            closeModal();
        }
    });

    document.getElementById('process-payroll-btn')?.addEventListener('click', () => {
        const pendingCount = payrollData.filter(emp => emp.status === 'pending').length;
        if (pendingCount === 0) {
            alert('No pending payments to process!');
            return;
        }

        if (confirm(`Process payroll for ${pendingCount} employee(s)?`)) {
            payrollData.forEach(emp => {
                if (emp.status === 'pending') {
                    emp.status = 'paid';
                    emp.paymentDate = new Date().toISOString().split('T')[0];
                }
            });
            renderPayrollTable();
            alert('Payroll processed successfully!');
        }
    });
}

function initPayroll() {
    renderPayrollTable();
    setupEventListeners();
    console.log('✅ Payroll page initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPayroll);
} else {
    initPayroll();
}
