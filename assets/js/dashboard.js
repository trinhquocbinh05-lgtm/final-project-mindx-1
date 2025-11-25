console.log('dashboard.js loaded');

// Mock data for dashboard
const dashboardData = {
    stats: {
        totalEmployees: 12,
        departments: 6,
        onTimeToday: 92,
        onTimeCount: 11,
        newHires: 3,
        onLeave: 2,
        avgAttendance: 94.5
    },
    recentActivities: [
        { type: 'join', name: 'Sarah Johnson', action: 'joined the company', time: '2 hours ago', dept: 'Development' },
        { type: 'leave', name: 'Mike Chen', action: 'submitted leave request', time: '3 hours ago', dept: 'Design' },
        { type: 'complete', name: 'Emma Wilson', action: 'completed onboarding', time: '5 hours ago', dept: 'Sales' },
        { type: 'birthday', name: 'David Brown', action: 'birthday today', time: 'Today', dept: 'Marketing' },
        { type: 'promotion', name: 'Lisa Anderson', action: 'promoted to Senior Dev', time: '1 day ago', dept: 'Development' }
    ],
    upcomingBirthdays: [
        { name: 'David Brown', date: 'Today', dept: 'Marketing', avatar: 'assets/img/employee1.jpg' },
        { name: 'Anna Lee', date: 'Tomorrow', dept: 'Design', avatar: 'assets/img/employee2.jpg' },
        { name: 'Tom Wilson', date: 'Dec 28', dept: 'Sales', avatar: 'assets/img/employee3.jpg' }
    ],
    departmentStats: [
        { name: 'Development', employees: 4, color: '#7c3aed', percentage: 33 },
        { name: 'Design', employees: 3, color: '#3b82f6', percentage: 25 },
        { name: 'Sales', employees: 2, color: '#10b981', percentage: 17 },
        { name: 'Marketing', employees: 2, color: '#f59e0b', percentage: 17 },
        { name: 'HR', employees: 1, color: '#ef4444', percentage: 8 }
    ],
    attendanceTrend: [
        { day: 'Mon', percentage: 95 },
        { day: 'Tue', percentage: 92 },
        { day: 'Wed', percentage: 94 },
        { day: 'Thu', percentage: 96 },
        { day: 'Fri', percentage: 91 },
        { day: 'Sat', percentage: 88 },
        { day: 'Sun', percentage: 85 }
    ],
    onLeaveToday: [
        { name: 'John Doe', reason: 'Sick Leave', dept: 'Development' },
        { name: 'Jane Smith', reason: 'Vacation', dept: 'Marketing' }
    ]
};

// Render Quick Stats
function renderQuickStats() {
    const container = document.getElementById('quick-stats');
    if (!container) return;

    const stats = dashboardData.stats;

    container.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon" style="background-color: #ede9fe;">
                <svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            </div>
            <div class="stat-content">
                <h3>Total Employees</h3>
                <p class="stat-value">${stats.totalEmployees}</p>
                <span class="stat-change positive">+${stats.newHires} this month</span>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon" style="background-color: #dbeafe;">
                <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
            </div>
            <div class="stat-content">
                <h3>Departments</h3>
                <p class="stat-value">${stats.departments}</p>
                <span class="stat-change neutral">Active teams</span>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon" style="background-color: #d1fae5;">
                <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
            </div>
            <div class="stat-content">
                <h3>Attendance Today</h3>
                <p class="stat-value">${stats.onTimeToday}%</p>
                <span class="stat-change positive">${stats.onTimeCount}/${stats.totalEmployees} present</span>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon" style="background-color: #fef3c7;">
                <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
            </div>
            <div class="stat-content">
                <h3>On Leave</h3>
                <p class="stat-value">${stats.onLeave}</p>
                <span class="stat-change neutral">employees today</span>
            </div>
        </div>
    `;
}

// Render Recent Activities
function renderRecentActivities() {
    const container = document.getElementById('recent-activities');
    if (!container) return;

    const activityIcons = {
        join: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>',
        leave: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
        complete: '<polyline points="20 6 9 17 4 12"></polyline>',
        birthday: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line>',
        promotion: '<polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline>'
    };

    const activityColors = {
        join: '#10b981',
        leave: '#f59e0b',
        complete: '#7c3aed',
        birthday: '#ec4899',
        promotion: '#3b82f6'
    };

    const activitiesHTML = dashboardData.recentActivities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon" style="background-color: ${activityColors[activity.type]}20; color: ${activityColors[activity.type]};">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${activityIcons[activity.type]}
                </svg>
            </div>
            <div class="activity-content">
                <p><strong>${activity.name}</strong> ${activity.action}</p>
                <span class="activity-meta">${activity.dept} • ${activity.time}</span>
            </div>
        </div>
    `).join('');

    container.innerHTML = activitiesHTML;
}

// Render Department Distribution
function renderDepartmentStats() {
    const container = document.getElementById('department-stats');
    if (!container) return;

    const statsHTML = dashboardData.departmentStats.map(dept => `
        <div class="dept-stat-item">
            <div class="dept-stat-header">
                <span class="dept-name">${dept.name}</span>
                <span class="dept-count">${dept.employees}</span>
            </div>
            <div class="dept-stat-bar">
                <div class="dept-stat-fill" style="width: ${dept.percentage}%; background-color: ${dept.color};"></div>
            </div>
        </div>
    `).join('');

    container.innerHTML = statsHTML;
}

// Render Attendance Trend Chart
function renderAttendanceTrend() {
    const container = document.getElementById('attendance-chart');
    if (!container) return;

    const maxHeight = 120;
    const barsHTML = dashboardData.attendanceTrend.map(day => {
        const height = (day.percentage / 100) * maxHeight;
        return `
            <div class="chart-bar-container">
                <div class="chart-bar" style="height: ${height}px;" data-value="${day.percentage}%"></div>
                <span class="chart-label">${day.day}</span>
            </div>
        `;
    }).join('');

    container.innerHTML = barsHTML;
}

// Render Upcoming Birthdays
function renderUpcomingBirthdays() {
    const container = document.getElementById('upcoming-birthdays');
    if (!container) return;

    const birthdaysHTML = dashboardData.upcomingBirthdays.map(person => `
        <div class="birthday-item">
            <div class="birthday-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </div>
            <div class="birthday-info">
                <p class="birthday-name">${person.name}</p>
                <span class="birthday-dept">${person.dept}</span>
            </div>
            <div class="birthday-date">${person.date}</div>
        </div>
    `).join('');

    container.innerHTML = birthdaysHTML;
}

// Render On Leave Today
function renderOnLeave() {
    const container = document.getElementById('on-leave-list');
    if (!container) return;

    if (dashboardData.onLeaveToday.length === 0) {
        container.innerHTML = '<p style="color: var(--c-text-secondary); text-align: center; padding: 2rem;">No employees on leave today</p>';
        return;
    }

    const leaveHTML = dashboardData.onLeaveToday.map(person => `
        <div class="leave-item">
            <div class="leave-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            </div>
            <div class="leave-info">
                <p class="leave-name">${person.name}</p>
                <span class="leave-reason">${person.reason} • ${person.dept}</span>
            </div>
        </div>
    `).join('');

    container.innerHTML = leaveHTML;
}

// Initialize Dashboard
function initDashboard() {
    renderQuickStats();
    renderRecentActivities();
    renderDepartmentStats();
    renderAttendanceTrend();
    renderUpcomingBirthdays();
    renderOnLeave();

    // Add greeting based on time
    const greetingEl = document.getElementById('greeting-message');
    if (greetingEl) {
        const hour = new Date().getHours();
        let greeting = 'Good morning';
        if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
        if (hour >= 17) greeting = 'Good evening';

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userName = currentUser ? currentUser.fullName.split(' ')[0] : 'User';

        greetingEl.textContent = `${greeting}, ${userName}!`;
    }

    console.log('✅ Dashboard initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}
