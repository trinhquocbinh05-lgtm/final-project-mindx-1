console.log('leaves.js loaded');

const leavesData = [
    {
        id: 1,
        employeeName: "Darlene Robertson",
        department: "Design",
        leaveType: "sick",
        startDate: "2024-12-20",
        endDate: "2024-12-22",
        days: 3,
        reason: "Medical appointment and recovery",
        status: "pending",
        appliedDate: "2024-12-15"
    },
    {
        id: 2,
        employeeName: "Floyd Miles",
        department: "Development",
        leaveType: "vacation",
        startDate: "2024-12-25",
        endDate: "2024-12-30",
        days: 6,
        reason: "Family vacation",
        status: "approved",
        appliedDate: "2024-11-20",
        approvedBy: "HR Manager",
        approvedDate: "2024-11-22"
    },
    {
        id: 3,
        employeeName: "Cody Fisher",
        department: "Sales",
        leaveType: "personal",
        startDate: "2024-12-18",
        endDate: "2024-12-18",
        days: 1,
        reason: "Personal matter",
        status: "approved",
        appliedDate: "2024-12-10",
        approvedBy: "HR Manager",
        approvedDate: "2024-12-11"
    },
    {
        id: 4,
        employeeName: "Dianne Russell",
        department: "Sales",
        leaveType: "emergency",
        startDate: "2024-12-16",
        endDate: "2024-12-17",
        days: 2,
        reason: "Family emergency",
        status: "rejected",
        appliedDate: "2024-12-15",
        rejectedBy: "HR Manager",
        rejectedDate: "2024-12-15",
        rejectionReason: "Insufficient notice period"
    },
    {
        id: 5,
        employeeName: "Sarah Johnson",
        department: "Development",
        leaveType: "sick",
        startDate: "2024-12-19",
        endDate: "2024-12-20",
        days: 2,
        reason: "Flu symptoms",
        status: "pending",
        appliedDate: "2024-12-18"
    },
    {
        id: 6,
        employeeName: "Mike Chen",
        department: "Design",
        leaveType: "vacation",
        startDate: "2025-01-02",
        endDate: "2025-01-05",
        days: 4,
        reason: "New Year holiday extension",
        status: "pending",
        appliedDate: "2024-12-10"
    },
    {
        id: 7,
        employeeName: "Emma Wilson",
        department: "Marketing",
        leaveType: "personal",
        startDate: "2024-12-23",
        endDate: "2024-12-24",
        days: 2,
        reason: "Moving to new apartment",
        status: "approved",
        appliedDate: "2024-12-05",
        approvedBy: "HR Manager",
        approvedDate: "2024-12-06"
    }
];

let currentFilter = {
    status: 'all',
    type: 'all',
    employee: 'all'
};

let currentCalendarDate = new Date();

function getLeaveTypeLabel(type) {
    const labels = {
        sick: 'Sick Leave',
        vacation: 'Vacation',
        personal: 'Personal',
        emergency: 'Emergency'
    };
    return labels[type] || type;
}

function getLeaveTypeColor(type) {
    const colors = {
        sick: '#ef4444',
        vacation: '#3b82f6',
        personal: '#f59e0b',
        emergency: '#7c3aed'
    };
    return colors[type] || '#6b7280';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function updateStats() {
    const filteredLeaves = getFilteredLeaves();

    const totalLeaves = filteredLeaves.length;
    const pendingLeaves = filteredLeaves.filter(l => l.status === 'pending').length;
    const approvedLeaves = filteredLeaves.filter(l => l.status === 'approved').length;
    const rejectedLeaves = filteredLeaves.filter(l => l.status === 'rejected').length;

    document.getElementById('total-leaves').textContent = totalLeaves;
    document.getElementById('pending-leaves').textContent = pendingLeaves;
    document.getElementById('approved-leaves').textContent = approvedLeaves;
    document.getElementById('rejected-leaves').textContent = rejectedLeaves;
}

function getFilteredLeaves() {
    return leavesData.filter(leave => {
        const statusMatch = currentFilter.status === 'all' || leave.status === currentFilter.status;
        const typeMatch = currentFilter.type === 'all' || leave.leaveType === currentFilter.type;
        const employeeMatch = currentFilter.employee === 'all' || leave.employeeName === currentFilter.employee;
        return statusMatch && typeMatch && employeeMatch;
    });
}

function populateEmployeeFilter() {
    const employeeFilter = document.getElementById('employee-filter');
    if (!employeeFilter) return;

    const uniqueEmployees = [...new Set(leavesData.map(l => l.employeeName))].sort();

    employeeFilter.innerHTML = '<option value="all">All Employees</option>' +
        uniqueEmployees.map(emp => `<option value="${emp}">${emp}</option>`).join('');
}

function renderLeavesTable() {
    const tbody = document.getElementById('leaves-table-body');
    if (!tbody) return;

    const filteredLeaves = getFilteredLeaves();

    if (filteredLeaves.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 3rem; color: var(--c-text-secondary);">
                    No leave requests found for the selected filters
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredLeaves.map(leave => {
        const statusClasses = {
            pending: 'status-warning',
            approved: 'status-active',
            rejected: 'status-inactive'
        };

        const statusClass = statusClasses[leave.status] || 'status-warning';
        const typeColor = getLeaveTypeColor(leave.leaveType);

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
                        <div>
                            <span class="employee-name">${leave.employeeName}</span>
                            <span class="employee-dept">${leave.department}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="leave-type-badge" style="background-color: ${typeColor}20; color: ${typeColor};">
                        ${getLeaveTypeLabel(leave.leaveType)}
                    </span>
                </td>
                <td>${formatDate(leave.startDate)}</td>
                <td>${formatDate(leave.endDate)}</td>
                <td><strong>${leave.days} ${leave.days > 1 ? 'days' : 'day'}</strong></td>
                <td class="leave-reason">${leave.reason}</td>
                <td><span class="status-badge ${statusClass}">${leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="viewLeaveDetails(${leave.id})" title="View Details">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        ${leave.status === 'pending' ? `
                            <button class="btn-icon btn-icon-success" onclick="approveLeave(${leave.id})" title="Approve">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </button>
                            <button class="btn-icon btn-icon-danger" onclick="rejectLeave(${leave.id})" title="Reject">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    updateStats();
}

function viewLeaveDetails(leaveId) {
    const leave = leavesData.find(l => l.id === leaveId);
    if (!leave) return;

    const modal = document.getElementById('leave-modal');
    const modalBody = document.getElementById('modal-body');
    const typeColor = getLeaveTypeColor(leave.leaveType);

    modalBody.innerHTML = `
        <div class="leave-details">
            <div class="leave-header">
                <div class="leave-type-icon" style="background-color: ${typeColor}20; color: ${typeColor};">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                    </svg>
                </div>
                <div>
                    <h3>${getLeaveTypeLabel(leave.leaveType)}</h3>
                    <span class="status-badge ${
                        leave.status === 'pending' ? 'status-warning' :
                        leave.status === 'approved' ? 'status-active' : 'status-inactive'
                    }">
                        ${leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                    </span>
                </div>
            </div>

            <div class="detail-section">
                <h4>Employee Information</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Name:</span>
                        <span class="detail-value">${leave.employeeName}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Department:</span>
                        <span class="detail-value">${leave.department}</span>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h4>Leave Details</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Start Date:</span>
                        <span class="detail-value">${formatDate(leave.startDate)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">End Date:</span>
                        <span class="detail-value">${formatDate(leave.endDate)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Duration:</span>
                        <span class="detail-value">${leave.days} ${leave.days > 1 ? 'days' : 'day'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Applied Date:</span>
                        <span class="detail-value">${formatDate(leave.appliedDate)}</span>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h4>Reason</h4>
                <p class="leave-reason-text">${leave.reason}</p>
            </div>

            ${leave.status === 'approved' ? `
                <div class="detail-section approval-section">
                    <h4>Approval Details</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Approved By:</span>
                            <span class="detail-value">${leave.approvedBy}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Approved Date:</span>
                            <span class="detail-value">${formatDate(leave.approvedDate)}</span>
                        </div>
                    </div>
                </div>
            ` : ''}

            ${leave.status === 'rejected' ? `
                <div class="detail-section rejection-section">
                    <h4>Rejection Details</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="detail-label">Rejected By:</span>
                            <span class="detail-value">${leave.rejectedBy}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Rejected Date:</span>
                            <span class="detail-value">${formatDate(leave.rejectedDate)}</span>
                        </div>
                    </div>
                    <p class="rejection-reason"><strong>Reason:</strong> ${leave.rejectionReason}</p>
                </div>
            ` : ''}

            <div class="modal-actions">
                ${leave.status === 'pending' ? `
                    <button class="btn-primary" onclick="approveLeave(${leave.id}); closeModal();">
                        Approve Leave
                    </button>
                    <button class="btn-danger" onclick="rejectLeave(${leave.id}); closeModal();">
                        Reject Leave
                    </button>
                ` : ''}
                <button class="btn-secondary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function approveLeave(leaveId) {
    const leave = leavesData.find(l => l.id === leaveId);
    if (leave && confirm(`Approve leave request for ${leave.employeeName}?`)) {
        leave.status = 'approved';
        leave.approvedBy = 'HR Manager';
        leave.approvedDate = new Date().toISOString().split('T')[0];
        renderLeavesTable();
    }
}

function rejectLeave(leaveId) {
    const leave = leavesData.find(l => l.id === leaveId);
    if (leave) {
        const reason = prompt('Please provide a reason for rejection:');
        if (reason) {
            leave.status = 'rejected';
            leave.rejectedBy = 'HR Manager';
            leave.rejectedDate = new Date().toISOString().split('T')[0];
            leave.rejectionReason = reason;
            renderLeavesTable();
        }
    }
}

function closeModal() {
    const modal = document.getElementById('leave-modal');
    modal.classList.remove('active');
}

function renderCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;

    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    document.getElementById('current-month-year').textContent =
        currentCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const prevDaysInMonth = prevLastDay.getDate();

    let html = '';

    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        html += `<div class="calendar-day-header">${day}</div>`;
    });

    for (let i = startDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day other-month">
            <div class="calendar-day-number">${prevDaysInMonth - i}</div>
        </div>`;
    }

    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        const dateString = currentDate.toISOString().split('T')[0];

        const isToday = today.getDate() === day &&
                        today.getMonth() === month &&
                        today.getFullYear() === year;

        const leavesOnDay = leavesData.filter(leave => {
            const start = new Date(leave.startDate);
            const end = new Date(leave.endDate);
            return currentDate >= start && currentDate <= end;
        });

        html += `<div class="calendar-day ${isToday ? 'today' : ''}">
            <div class="calendar-day-number">${day}</div>
            ${leavesOnDay.map(leave => `
                <div class="calendar-leave-item ${leave.status}"
                     onclick="viewLeaveDetails(${leave.id}); closeCalendar();"
                     title="${leave.employeeName} - ${getLeaveTypeLabel(leave.leaveType)}">
                    ${leave.employeeName.split(' ')[0]}
                </div>
            `).join('')}
        </div>`;
    }

    const remainingDays = 42 - (startDay + daysInMonth);
    for (let day = 1; day <= remainingDays; day++) {
        html += `<div class="calendar-day other-month">
            <div class="calendar-day-number">${day}</div>
        </div>`;
    }

    calendarGrid.innerHTML = html;
}

function showCalendar() {
    renderCalendar();
    document.getElementById('calendar-modal').classList.add('active');
}

function closeCalendar() {
    document.getElementById('calendar-modal').classList.remove('active');
}

function setupEventListeners() {
    document.getElementById('status-filter')?.addEventListener('change', (e) => {
        currentFilter.status = e.target.value;
        renderLeavesTable();
    });

    document.getElementById('type-filter')?.addEventListener('change', (e) => {
        currentFilter.type = e.target.value;
        renderLeavesTable();
    });

    document.getElementById('employee-filter')?.addEventListener('change', (e) => {
        currentFilter.employee = e.target.value;
        renderLeavesTable();
    });

    document.getElementById('calendar-view-btn')?.addEventListener('click', showCalendar);

    document.getElementById('prev-month')?.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('next-month')?.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar();
    });

    document.getElementById('close-calendar-btn')?.addEventListener('click', closeCalendar);

    document.getElementById('calendar-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'calendar-modal') {
            closeCalendar();
        }
    });

    document.getElementById('add-leave-btn')?.addEventListener('click', () => {
        alert('Leave request form would open here!\nFeature coming soon.');
    });

    document.getElementById('close-modal-btn')?.addEventListener('click', closeModal);

    document.getElementById('leave-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'leave-modal') {
            closeModal();
        }
    });
}

function initLeaves() {
    populateEmployeeFilter();
    renderLeavesTable();
    setupEventListeners();
    console.log('✅ Leaves page initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLeaves);
} else {
    initLeaves();
}
