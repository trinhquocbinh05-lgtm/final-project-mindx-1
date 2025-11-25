console.log('jobs.js loaded');

const jobsData = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        department: "Development",
        type: "Full Time",
        location: "Remote",
        salary: "$80k - $120k",
        applicants: 45,
        status: "active",
        postedDate: "2024-11-15",
        description: "We're looking for an experienced Frontend Developer to join our team.",
        requirements: ["5+ years React experience", "TypeScript proficiency", "UI/UX knowledge"],
        responsibilities: ["Build responsive web applications", "Collaborate with designers", "Code reviews"]
    },
    {
        id: 2,
        title: "UI/UX Designer",
        department: "Design",
        type: "Full Time",
        location: "Hybrid",
        salary: "$60k - $90k",
        applicants: 32,
        status: "active",
        postedDate: "2024-11-20",
        description: "Seeking a creative UI/UX Designer with strong portfolio.",
        requirements: ["3+ years experience", "Figma expert", "User research skills"],
        responsibilities: ["Design user interfaces", "Create wireframes", "User testing"]
    },
    {
        id: 3,
        title: "Sales Manager",
        department: "Sales",
        type: "Full Time",
        location: "Office",
        salary: "$70k - $100k",
        applicants: 28,
        status: "active",
        postedDate: "2024-11-10",
        description: "Lead our sales team and drive revenue growth.",
        requirements: ["5+ years sales experience", "Team management", "CRM knowledge"],
        responsibilities: ["Manage sales team", "Develop strategies", "Client relationships"]
    },
    {
        id: 4,
        title: "Backend Developer",
        department: "Development",
        type: "Full Time",
        location: "Remote",
        salary: "$75k - $110k",
        applicants: 52,
        status: "active",
        postedDate: "2024-11-18",
        description: "Join our backend team to build scalable APIs.",
        requirements: ["Node.js expertise", "Database design", "AWS experience"],
        responsibilities: ["API development", "Database optimization", "System architecture"]
    },
    {
        id: 5,
        title: "Marketing Specialist",
        department: "Marketing",
        type: "Part Time",
        location: "Remote",
        salary: "$40k - $60k",
        applicants: 18,
        status: "active",
        postedDate: "2024-11-22",
        description: "Help us grow our brand through digital marketing.",
        requirements: ["2+ years marketing", "SEO/SEM knowledge", "Content creation"],
        responsibilities: ["Campaign management", "Social media", "Analytics"]
    },
    {
        id: 6,
        title: "DevOps Engineer",
        department: "Development",
        type: "Contract",
        location: "Remote",
        salary: "$90k - $130k",
        applicants: 23,
        status: "closed",
        postedDate: "2024-10-15",
        description: "Manage our infrastructure and deployment pipelines.",
        requirements: ["Docker/Kubernetes", "CI/CD pipelines", "Cloud platforms"],
        responsibilities: ["Infrastructure management", "Automation", "Monitoring"]
    }
];

let currentFilters = {
    department: 'all',
    type: 'all',
    status: 'all'
};

function updateStats() {
    const filteredJobs = getFilteredJobs();
    const activeJobs = filteredJobs.filter(j => j.status === 'active').length;
    const totalApplicants = filteredJobs.reduce((sum, j) => sum + j.applicants, 0);
    const pendingReview = Math.floor(totalApplicants * 0.6);
    const hiredCount = 3;

    document.getElementById('active-jobs').textContent = activeJobs;
    document.getElementById('total-applicants').textContent = totalApplicants;
    document.getElementById('pending-review').textContent = pendingReview;
    document.getElementById('hired-count').textContent = hiredCount;
}

function getFilteredJobs() {
    return jobsData.filter(job => {
        const deptMatch = currentFilters.department === 'all' ||
            job.department.toLowerCase() === currentFilters.department;
        const typeMatch = currentFilters.type === 'all' ||
            job.type.toLowerCase().replace(' ', '-') === currentFilters.type;
        const statusMatch = currentFilters.status === 'all' ||
            job.status === currentFilters.status;
        return deptMatch && typeMatch && statusMatch;
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

function renderJobsGrid() {
    const grid = document.getElementById('jobs-grid');
    if (!grid) return;

    const filteredJobs = getFilteredJobs();

    if (filteredJobs.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <h3>No jobs found</h3>
                <p>Try adjusting your filters or post a new job</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredJobs.map(job => `
        <div class="job-card ${job.status === 'closed' ? 'job-closed' : ''}" onclick="viewJobDetails(${job.id})">
            <div class="job-card-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <div class="job-meta">
                        <span class="job-department">${job.department}</span>
                        <span class="job-separator">•</span>
                        <span class="job-location">${job.location}</span>
                        <span class="job-separator">•</span>
                        <span class="job-posted">${formatDate(job.postedDate)}</span>
                    </div>
                </div>
                <span class="status-badge ${job.status === 'active' ? 'status-active' : 'status-inactive'}">
                    ${job.status === 'active' ? 'Active' : 'Closed'}
                </span>
            </div>

            <p class="job-description">${job.description}</p>

            <div class="job-tags">
                <span class="job-tag">${job.type}</span>
                <span class="job-tag">${job.salary}</span>
            </div>

            <div class="job-card-footer">
                <div class="applicants-count">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>${job.applicants} applicants</span>
                </div>
                <button class="btn-view" onclick="event.stopPropagation(); viewJobDetails(${job.id})">
                    View Details
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    updateStats();
}

function viewJobDetails(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;

    const modal = document.getElementById('job-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div class="job-details">
            <div class="job-details-header">
                <div>
                    <h2>${job.title}</h2>
                    <div class="job-meta">
                        <span>${job.department}</span>
                        <span class="job-separator">•</span>
                        <span>${job.type}</span>
                        <span class="job-separator">•</span>
                        <span>${job.location}</span>
                    </div>
                </div>
                <span class="status-badge ${job.status === 'active' ? 'status-active' : 'status-inactive'}">
                    ${job.status === 'active' ? 'Active' : 'Closed'}
                </span>
            </div>

            <div class="job-details-grid">
                <div class="detail-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <div>
                        <span class="detail-label">Salary Range</span>
                        <span class="detail-value">${job.salary}</span>
                    </div>
                </div>

                <div class="detail-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <div>
                        <span class="detail-label">Applicants</span>
                        <span class="detail-value">${job.applicants}</span>
                    </div>
                </div>

                <div class="detail-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                    </svg>
                    <div>
                        <span class="detail-label">Posted</span>
                        <span class="detail-value">${formatDate(job.postedDate)}</span>
                    </div>
                </div>
            </div>

            <div class="job-section">
                <h3>Description</h3>
                <p>${job.description}</p>
            </div>

            <div class="job-section">
                <h3>Requirements</h3>
                <ul class="job-list">
                    ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>

            <div class="job-section">
                <h3>Responsibilities</h3>
                <ul class="job-list">
                    ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-actions">
                ${job.status === 'active' ? `
                    <button class="btn-primary" onclick="viewApplicants(${job.id})">
                        View Applicants (${job.applicants})
                    </button>
                    <button class="btn-secondary" onclick="closeJob(${job.id})">Close Job</button>
                ` : `
                    <button class="btn-primary" onclick="reopenJob(${job.id})">Reopen Job</button>
                `}
                <button class="btn-secondary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function viewApplicants(jobId) {
    alert(`This would show applicants for job ID: ${jobId}\nFeature coming soon!`);
}

function closeJob(jobId) {
    if (confirm('Are you sure you want to close this job posting?')) {
        const job = jobsData.find(j => j.id === jobId);
        if (job) {
            job.status = 'closed';
            renderJobsGrid();
            closeModal();
        }
    }
}

function reopenJob(jobId) {
    if (confirm('Reopen this job posting?')) {
        const job = jobsData.find(j => j.id === jobId);
        if (job) {
            job.status = 'active';
            renderJobsGrid();
            closeModal();
        }
    }
}

function closeModal() {
    const modal = document.getElementById('job-modal');
    modal.classList.remove('active');
}

function setupEventListeners() {
    document.getElementById('department-filter')?.addEventListener('change', (e) => {
        currentFilters.department = e.target.value;
        renderJobsGrid();
    });

    document.getElementById('type-filter')?.addEventListener('change', (e) => {
        currentFilters.type = e.target.value;
        renderJobsGrid();
    });

    document.getElementById('status-filter')?.addEventListener('change', (e) => {
        currentFilters.status = e.target.value;
        renderJobsGrid();
    });

    document.getElementById('add-job-btn')?.addEventListener('click', () => {
        alert('Add new job form would open here!\nFeature coming soon.');
    });

    document.getElementById('close-modal-btn')?.addEventListener('click', closeModal);

    document.getElementById('job-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'job-modal') {
            closeModal();
        }
    });
}

function initJobs() {
    renderJobsGrid();
    setupEventListeners();
    console.log('✅ Jobs page initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initJobs);
} else {
    initJobs();
}
