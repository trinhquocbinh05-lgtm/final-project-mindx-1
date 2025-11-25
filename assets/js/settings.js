console.log('settings.js loaded');

const settingsData = {
    profile: {
        fullName: 'John Admin',
        email: 'admin@hrms.com',
        phone: '+1 234 567 8900',
        role: 'HR Manager',
        department: 'Human Resources',
        joinDate: '2020-01-15'
    },
    company: {
        name: 'Tech Solutions Inc.',
        email: 'info@techsolutions.com',
        phone: '+1 800 123 4567',
        address: '123 Business St, Suite 500',
        city: 'San Francisco',
        country: 'United States',
        website: 'www.techsolutions.com'
    },
    notifications: {
        emailNotifications: true,
        leaveRequests: true,
        newApplications: true,
        payrollUpdates: false,
        systemAlerts: true
    },
    security: {
        twoFactorAuth: false,
        sessionTimeout: '30',
        passwordExpiry: '90'
    },
    system: {
        language: 'en',
        timezone: 'America/Los_Angeles',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD'
    }
};

let currentTab = 'profile';

const tabContents = {
    profile: () => `
        <div class="settings-section">
            <h2>Profile Settings</h2>
            <p class="section-description">Manage your personal information and preferences</p>

            <div class="profile-avatar-section">
                <div class="profile-avatar-large">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div>
                    <button class="btn-secondary">Upload Photo</button>
                    <p class="help-text">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
            </div>

            <div class="form-grid">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" class="form-input" value="${settingsData.profile.fullName}" id="profile-fullName">
                </div>

                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" class="form-input" value="${settingsData.profile.email}" id="profile-email">
                </div>

                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" class="form-input" value="${settingsData.profile.phone}" id="profile-phone">
                </div>

                <div class="form-group">
                    <label>Role</label>
                    <input type="text" class="form-input" value="${settingsData.profile.role}" readonly>
                </div>

                <div class="form-group">
                    <label>Department</label>
                    <input type="text" class="form-input" value="${settingsData.profile.department}" readonly>
                </div>

                <div class="form-group">
                    <label>Join Date</label>
                    <input type="text" class="form-input" value="${settingsData.profile.joinDate}" readonly>
                </div>
            </div>

            <div class="form-actions">
                <button class="btn-primary" onclick="saveSettings('profile')">Save Changes</button>
                <button class="btn-secondary">Cancel</button>
            </div>
        </div>
    `,

    company: () => `
        <div class="settings-section">
            <h2>Company Information</h2>
            <p class="section-description">Update your company details and contact information</p>

            <div class="form-grid">
                <div class="form-group full-width">
                    <label>Company Name</label>
                    <input type="text" class="form-input" value="${settingsData.company.name}" id="company-name">
                </div>

                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" class="form-input" value="${settingsData.company.email}" id="company-email">
                </div>

                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" class="form-input" value="${settingsData.company.phone}" id="company-phone">
                </div>

                <div class="form-group full-width">
                    <label>Address</label>
                    <input type="text" class="form-input" value="${settingsData.company.address}" id="company-address">
                </div>

                <div class="form-group">
                    <label>City</label>
                    <input type="text" class="form-input" value="${settingsData.company.city}" id="company-city">
                </div>

                <div class="form-group">
                    <label>Country</label>
                    <input type="text" class="form-input" value="${settingsData.company.country}" id="company-country">
                </div>

                <div class="form-group full-width">
                    <label>Website</label>
                    <input type="text" class="form-input" value="${settingsData.company.website}" id="company-website">
                </div>
            </div>

            <div class="form-actions">
                <button class="btn-primary" onclick="saveSettings('company')">Save Changes</button>
                <button class="btn-secondary">Cancel</button>
            </div>
        </div>
    `,

    appearance: () => `
        <div class="settings-section">
            <h2>Appearance Settings</h2>
            <p class="section-description">Customize how the application looks</p>

            <div class="appearance-section">
                <h3>Theme</h3>
                <div class="theme-options">
                    <div class="theme-option" onclick="setTheme('light')">
                        <div class="theme-preview light-preview">
                            <div class="preview-header"></div>
                            <div class="preview-content"></div>
                        </div>
                        <span>Light Mode</span>
                    </div>

                    <div class="theme-option" onclick="setTheme('dark')">
                        <div class="theme-preview dark-preview">
                            <div class="preview-header"></div>
                            <div class="preview-content"></div>
                        </div>
                        <span>Dark Mode</span>
                    </div>
                </div>
            </div>

            <div class="appearance-section">
                <h3>Sidebar</h3>
                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="sidebar-collapsed">
                        <span>Start with sidebar collapsed</span>
                    </label>
                </div>
            </div>
        </div>
    `,

    notifications: () => `
        <div class="settings-section">
            <h2>Notification Preferences</h2>
            <p class="section-description">Choose what notifications you want to receive</p>

            <div class="notification-list">
                <div class="notification-item">
                    <div>
                        <h4>Email Notifications</h4>
                        <p>Receive notifications via email</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" ${settingsData.notifications.emailNotifications ? 'checked' : ''}
                               onchange="toggleNotification('emailNotifications', this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <div class="notification-item">
                    <div>
                        <h4>Leave Requests</h4>
                        <p>Get notified about new leave requests</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" ${settingsData.notifications.leaveRequests ? 'checked' : ''}
                               onchange="toggleNotification('leaveRequests', this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <div class="notification-item">
                    <div>
                        <h4>New Applications</h4>
                        <p>Receive alerts for new job applications</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" ${settingsData.notifications.newApplications ? 'checked' : ''}
                               onchange="toggleNotification('newApplications', this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <div class="notification-item">
                    <div>
                        <h4>Payroll Updates</h4>
                        <p>Stay informed about payroll processing</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" ${settingsData.notifications.payrollUpdates ? 'checked' : ''}
                               onchange="toggleNotification('payrollUpdates', this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <div class="notification-item">
                    <div>
                        <h4>System Alerts</h4>
                        <p>Important system updates and maintenance</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" ${settingsData.notifications.systemAlerts ? 'checked' : ''}
                               onchange="toggleNotification('systemAlerts', this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            </div>
        </div>
    `,

    security: () => `
        <div class="settings-section">
            <h2>Security Settings</h2>
            <p class="section-description">Manage your account security and privacy</p>

            <div class="security-section">
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
                <button class="btn-primary" onclick="enable2FA()">
                    ${settingsData.security.twoFactorAuth ? 'Disable' : 'Enable'} 2FA
                </button>
            </div>

            <div class="security-section">
                <h3>Password</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Current Password</label>
                        <input type="password" class="form-input" placeholder="Enter current password">
                    </div>

                    <div class="form-group">
                        <label>New Password</label>
                        <input type="password" class="form-input" placeholder="Enter new password">
                    </div>

                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="password" class="form-input" placeholder="Confirm new password">
                    </div>
                </div>
                <button class="btn-secondary">Change Password</button>
            </div>

            <div class="security-section">
                <h3>Session Settings</h3>
                <div class="form-group">
                    <label>Session Timeout (minutes)</label>
                    <select class="form-input" id="session-timeout">
                        <option value="15" ${settingsData.security.sessionTimeout === '15' ? 'selected' : ''}>15 minutes</option>
                        <option value="30" ${settingsData.security.sessionTimeout === '30' ? 'selected' : ''}>30 minutes</option>
                        <option value="60" ${settingsData.security.sessionTimeout === '60' ? 'selected' : ''}>1 hour</option>
                        <option value="120" ${settingsData.security.sessionTimeout === '120' ? 'selected' : ''}>2 hours</option>
                    </select>
                </div>
            </div>
        </div>
    `,

    system: () => `
        <div class="settings-section">
            <h2>System Settings</h2>
            <p class="section-description">Configure system-wide preferences</p>

            <div class="form-grid">
                <div class="form-group">
                    <label>Language</label>
                    <select class="form-input" id="system-language">
                        <option value="en" ${settingsData.system.language === 'en' ? 'selected' : ''}>English</option>
                        <option value="vi" ${settingsData.system.language === 'vi' ? 'selected' : ''}>Tiếng Việt</option>
                        <option value="es" ${settingsData.system.language === 'es' ? 'selected' : ''}>Español</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Timezone</label>
                    <select class="form-input" id="system-timezone">
                        <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                        <option value="America/New_York">Eastern Time (US & Canada)</option>
                        <option value="Europe/London">London</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Date Format</label>
                    <select class="form-input" id="system-dateFormat">
                        <option value="MM/DD/YYYY" ${settingsData.system.dateFormat === 'MM/DD/YYYY' ? 'selected' : ''}>MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY" ${settingsData.system.dateFormat === 'DD/MM/YYYY' ? 'selected' : ''}>DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD" ${settingsData.system.dateFormat === 'YYYY-MM-DD' ? 'selected' : ''}>YYYY-MM-DD</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Currency</label>
                    <select class="form-input" id="system-currency">
                        <option value="USD" ${settingsData.system.currency === 'USD' ? 'selected' : ''}>USD ($)</option>
                        <option value="EUR" ${settingsData.system.currency === 'EUR' ? 'selected' : ''}>EUR (€)</option>
                        <option value="GBP" ${settingsData.system.currency === 'GBP' ? 'selected' : ''}>GBP (£)</option>
                        <option value="VND" ${settingsData.system.currency === 'VND' ? 'selected' : ''}>VND (₫)</option>
                    </select>
                </div>
            </div>

            <div class="form-actions">
                <button class="btn-primary" onclick="saveSettings('system')">Save Changes</button>
                <button class="btn-secondary">Reset to Defaults</button>
            </div>
        </div>
    `
};

function renderTab(tabName) {
    const content = document.getElementById('tab-content');
    if (!content) return;

    content.innerHTML = tabContents[tabName]();
    currentTab = tabName;

    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
}

function setTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');

    if (theme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        if (themeToggle) themeToggle.classList.add('dark-mode-active');
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        if (themeToggle) themeToggle.classList.remove('dark-mode-active');
    }

    localStorage.setItem('theme', theme);
    alert(`Theme changed to ${theme} mode!`);
}

function toggleNotification(key, value) {
    settingsData.notifications[key] = value;
    console.log('Notification setting updated:', key, value);
}

function enable2FA() {
    settingsData.security.twoFactorAuth = !settingsData.security.twoFactorAuth;
    alert(settingsData.security.twoFactorAuth ?
        '2FA has been enabled!' :
        '2FA has been disabled!');
    renderTab('security');
}

function saveSettings(section) {
    if (section === 'profile') {
        settingsData.profile.fullName = document.getElementById('profile-fullName')?.value || settingsData.profile.fullName;
        settingsData.profile.email = document.getElementById('profile-email')?.value || settingsData.profile.email;
        settingsData.profile.phone = document.getElementById('profile-phone')?.value || settingsData.profile.phone;
    } else if (section === 'company') {
        settingsData.company.name = document.getElementById('company-name')?.value || settingsData.company.name;
        settingsData.company.email = document.getElementById('company-email')?.value || settingsData.company.email;
        settingsData.company.phone = document.getElementById('company-phone')?.value || settingsData.company.phone;
        settingsData.company.address = document.getElementById('company-address')?.value || settingsData.company.address;
        settingsData.company.city = document.getElementById('company-city')?.value || settingsData.company.city;
        settingsData.company.country = document.getElementById('company-country')?.value || settingsData.company.country;
        settingsData.company.website = document.getElementById('company-website')?.value || settingsData.company.website;
    } else if (section === 'system') {
        settingsData.system.language = document.getElementById('system-language')?.value || settingsData.system.language;
        settingsData.system.timezone = document.getElementById('system-timezone')?.value || settingsData.system.timezone;
        settingsData.system.dateFormat = document.getElementById('system-dateFormat')?.value || settingsData.system.dateFormat;
        settingsData.system.currency = document.getElementById('system-currency')?.value || settingsData.system.currency;
    }

    alert('Settings saved successfully!');
    console.log('Settings saved:', settingsData);
}

function setupEventListeners() {
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            renderTab(tabName);
        });
    });
}

function initSettings() {
    renderTab('profile');
    setupEventListeners();
    console.log('✅ Settings page initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSettings);
} else {
    initSettings();
}
