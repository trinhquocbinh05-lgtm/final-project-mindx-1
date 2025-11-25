console.log('candidates.js loaded');

const candidatesData = [
    {
        id: 1,
        name: "Alex Thompson",
        position: "Senior Frontend Developer",
        email: "alex.t@email.com",
        phone: "+1 234 567 8901",
        stage: "applied",
        appliedDate: "2024-12-15",
        experience: "5 years",
        skills: ["React", "TypeScript", "Node.js"],
        resume: "resume-alex.pdf",
        rating: 0
    },
    {
        id: 2,
        name: "Sarah Martinez",
        position: "UI/UX Designer",
        email: "sarah.m@email.com",
        phone: "+1 234 567 8902",
        stage: "screening",
        appliedDate: "2024-12-10",
        experience: "4 years",
        skills: ["Figma", "Adobe XD", "User Research"],
        resume: "resume-sarah.pdf",
        rating: 4
    },
    {
        id: 3,
        name: "Michael Chen",
        position: "Backend Developer",
        email: "m.chen@email.com",
        phone: "+1 234 567 8903",
        stage: "interview",
        appliedDate: "2024-12-08",
        experience: "6 years",
        skills: ["Python", "Django", "PostgreSQL"],
        resume: "resume-michael.pdf",
        rating: 5,
        interviewDate: "2024-12-20"
    },
    {
        id: 4,
        name: "Emma Wilson",
        position: "Marketing Specialist",
        email: "emma.w@email.com",
        phone: "+1 234 567 8904",
        stage: "offer",
        appliedDate: "2024-12-05",
        experience: "3 years",
        skills: ["SEO", "Content Marketing", "Analytics"],
        resume: "resume-emma.pdf",
        rating: 5
    },
    {
        id: 5,
        name: "James Brown",
        position: "Sales Manager",
        email: "james.b@email.com",
        phone: "+1 234 567 8905",
        stage: "hired",
        appliedDate: "2024-11-20",
        experience: "7 years",
        skills: ["Sales Strategy", "CRM", "Team Leadership"],
        resume: "resume-james.pdf",
        rating: 5,
        hiredDate: "2024-12-18"
    },
    {
        id: 6,
        name: "Lisa Anderson",
        position: "Senior Frontend Developer",
        email: "lisa.a@email.com",
        phone: "+1 234 567 8906",
        stage: "applied",
        appliedDate: "2024-12-16",
        experience: "4 years",
        skills: ["Vue.js", "JavaScript", "CSS"],
        resume: "resume-lisa.pdf",
        rating: 0
    },
    {
        id: 7,
        name: "David Kim",
        position: "DevOps Engineer",
        email: "david.k@email.com",
        phone: "+1 234 567 8907",
        stage: "screening",
        appliedDate: "2024-12-12",
        experience: "5 years",
        skills: ["Docker", "Kubernetes", "AWS"],
        resume: "resume-david.pdf",
        rating: 4
    },
    {
        id: 8,
        name: "Sophie Taylor",
        position: "UI/UX Designer",
        email: "sophie.t@email.com",
        phone: "+1 234 567 8908",
        stage: "interview",
        appliedDate: "2024-12-09",
        experience: "3 years",
        skills: ["Sketch", "Prototyping", "UI Design"],
        resume: "resume-sophie.pdf",
        rating: 4,
        interviewDate: "2024-12-22"
    }
];

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getStageColor(stage) {
    const colors = {
        applied: '#3b82f6',
        screening: '#f59e0b',
        interview: '#7c3aed',
        offer: '#10b981',
        hired: '#059669'
    };
    return colors[stage] || '#6b7280';
}

function renderCandidateCard(candidate) {
    const stageColor = getStageColor(candidate.stage);

    return `
        <div class="candidate-card" onclick="viewCandidateDetails(${candidate.id})" draggable="true" ondragstart="handleDragStart(event, ${candidate.id})">
            <div class="candidate-avatar" style="background: linear-gradient(135deg, ${stageColor}, ${stageColor}99);">
                <span>${candidate.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div class="candidate-info">
                <h4 class="candidate-name">${candidate.name}</h4>
                <p class="candidate-position">${candidate.position}</p>
                <div class="candidate-meta">
                    <span>${candidate.experience}</span>
                    <span class="meta-separator">•</span>
                    <span>${formatDate(candidate.appliedDate)}</span>
                </div>
                <div class="candidate-skills">
                    ${candidate.skills.slice(0, 3).map(skill =>
                        `<span class="skill-tag">${skill}</span>`
                    ).join('')}
                </div>
                ${candidate.rating > 0 ? `
                    <div class="candidate-rating">
                        ${'★'.repeat(candidate.rating)}${'☆'.repeat(5 - candidate.rating)}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function updateStageCounts() {
    const stages = ['applied', 'screening', 'interview', 'offer', 'hired'];
    stages.forEach(stage => {
        const count = candidatesData.filter(c => c.stage === stage).length;
        const countEl = document.getElementById(`${stage}-count`);
        if (countEl) countEl.textContent = count;
    });
}

function renderPipeline() {
    const stages = ['applied', 'screening', 'interview', 'offer', 'hired'];

    stages.forEach(stage => {
        const container = document.getElementById(`${stage}-cards`);
        if (!container) return;

        const stageCandidates = candidatesData.filter(c => c.stage === stage);

        if (stageCandidates.length === 0) {
            container.innerHTML = `
                <div class="empty-pipeline">
                    <p>No candidates</p>
                </div>
            `;
        } else {
            container.innerHTML = stageCandidates.map(c => renderCandidateCard(c)).join('');
        }
    });

    updateStageCounts();
}

function viewCandidateDetails(candidateId) {
    const candidate = candidatesData.find(c => c.id === candidateId);
    if (!candidate) return;

    const modal = document.getElementById('candidate-modal');
    const modalBody = document.getElementById('modal-body');

    const stageColor = getStageColor(candidate.stage);

    modalBody.innerHTML = `
        <div class="candidate-details">
            <div class="candidate-details-header">
                <div class="candidate-avatar-large" style="background: linear-gradient(135deg, ${stageColor}, ${stageColor}99);">
                    <span>${candidate.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div class="candidate-header-info">
                    <h2>${candidate.name}</h2>
                    <p class="candidate-position-large">${candidate.position}</p>
                    <div class="candidate-stage-badge" style="background-color: ${stageColor}20; color: ${stageColor};">
                        ${candidate.stage.charAt(0).toUpperCase() + candidate.stage.slice(1)}
                    </div>
                </div>
            </div>

            <div class="candidate-details-grid">
                <div class="detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <div>
                        <span class="detail-label">Email</span>
                        <span class="detail-value">${candidate.email}</span>
                    </div>
                </div>

                <div class="detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <div>
                        <span class="detail-label">Phone</span>
                        <span class="detail-value">${candidate.phone}</span>
                    </div>
                </div>

                <div class="detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <div>
                        <span class="detail-label">Experience</span>
                        <span class="detail-value">${candidate.experience}</span>
                    </div>
                </div>

                <div class="detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                    </svg>
                    <div>
                        <span class="detail-label">Applied Date</span>
                        <span class="detail-value">${formatDate(candidate.appliedDate)}</span>
                    </div>
                </div>
            </div>

            <div class="candidate-section">
                <h3>Skills</h3>
                <div class="skills-grid">
                    ${candidate.skills.map(skill =>
                        `<span class="skill-badge">${skill}</span>`
                    ).join('')}
                </div>
            </div>

            <div class="candidate-section">
                <h3>Rating</h3>
                <div class="rating-stars">
                    ${[1, 2, 3, 4, 5].map(star => `
                        <span class="rating-star ${star <= candidate.rating ? 'active' : ''}"
                              onclick="updateRating(${candidate.id}, ${star})">★</span>
                    `).join('')}
                </div>
            </div>

            ${candidate.interviewDate ? `
                <div class="candidate-section">
                    <h3>Interview Scheduled</h3>
                    <p>${formatDate(candidate.interviewDate)}</p>
                </div>
            ` : ''}

            <div class="candidate-section">
                <h3>Move to Stage</h3>
                <div class="stage-actions">
                    ${candidate.stage !== 'applied' ? '<button class="btn-stage" onclick="moveToStage(' + candidate.id + ', \'applied\')">Applied</button>' : ''}
                    ${candidate.stage !== 'screening' ? '<button class="btn-stage" onclick="moveToStage(' + candidate.id + ', \'screening\')">Screening</button>' : ''}
                    ${candidate.stage !== 'interview' ? '<button class="btn-stage" onclick="moveToStage(' + candidate.id + ', \'interview\')">Interview</button>' : ''}
                    ${candidate.stage !== 'offer' ? '<button class="btn-stage" onclick="moveToStage(' + candidate.id + ', \'offer\')">Offer</button>' : ''}
                    ${candidate.stage !== 'hired' ? '<button class="btn-stage btn-stage-hired" onclick="moveToStage(' + candidate.id + ', \'hired\')">Hired</button>' : ''}
                </div>
            </div>

            <div class="modal-actions">
                <button class="btn-secondary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function updateRating(candidateId, rating) {
    const candidate = candidatesData.find(c => c.id === candidateId);
    if (candidate) {
        candidate.rating = rating;
        viewCandidateDetails(candidateId);
    }
}

function moveToStage(candidateId, newStage) {
    const candidate = candidatesData.find(c => c.id === candidateId);
    if (candidate) {
        candidate.stage = newStage;
        if (newStage === 'hired') {
            candidate.hiredDate = new Date().toISOString().split('T')[0];
        }
        renderPipeline();
        closeModal();
    }
}

function closeModal() {
    const modal = document.getElementById('candidate-modal');
    modal.classList.remove('active');
}

function handleDragStart(event, candidateId) {
    event.dataTransfer.setData('candidateId', candidateId);
    event.target.style.opacity = '0.5';
}

function setupDragAndDrop() {
    const stages = document.querySelectorAll('.pipeline-cards');

    stages.forEach(stageEl => {
        stageEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            stageEl.classList.add('drag-over');
        });

        stageEl.addEventListener('dragleave', () => {
            stageEl.classList.remove('drag-over');
        });

        stageEl.addEventListener('drop', (e) => {
            e.preventDefault();
            stageEl.classList.remove('drag-over');

            const candidateId = parseInt(e.dataTransfer.getData('candidateId'));
            const newStage = stageEl.id.replace('-cards', '');

            moveToStage(candidateId, newStage);
        });
    });

    document.addEventListener('dragend', (e) => {
        e.target.style.opacity = '1';
    });
}

function setupEventListeners() {
    document.getElementById('close-modal-btn')?.addEventListener('click', closeModal);

    document.getElementById('candidate-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'candidate-modal') {
            closeModal();
        }
    });

    document.getElementById('add-candidate-btn')?.addEventListener('click', () => {
        alert('Add new candidate form would open here!\nFeature coming soon.');
    });
}

function initCandidates() {
    renderPipeline();
    setupDragAndDrop();
    setupEventListeners();
    console.log('✅ Candidates page initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCandidates);
} else {
    initCandidates();
}
