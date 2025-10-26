/**
 * Admin Dashboard Controller
 * 
 * Connects the admin UI to real backend APIs
 * Handles all admin operations with Firebase authentication
 */

class AdminDashboard {
    constructor() {
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.usersPerPage = 10;
        this.totalUsers = 0;
        this.filteredUsers = [];
        this.selectedUserIds = new Set();
        this.searchTerm = '';
        this.filters = {
            role: '',
            tier: '',
            status: ''
        };
        this.users = [];
        this.stats = {};
        this.vcs = [];
        this.currentPortfolio = [];
        this.currentVCId = null;
        this.unassignedStartups = [];
        this.init();
    }

    async init() {
        console.log('🚀 Initializing Admin Dashboard...');
        
        // Check authentication
        if (!this.checkAuth()) {
            window.location.href = '/signup.html';
            return;
        }

        // Load initial data
        await this.loadDashboardData();
        
        // Set up auto-refresh
        setInterval(() => this.loadDashboardData(), 30000);
    }

    checkAuth() {
        const token = localStorage.getItem('firebaseToken');
        const userEmail = localStorage.getItem('userEmail');
        
        if (!token || !userEmail) {
            console.log('❌ No authentication found');
            return false;
        }

        console.log('✅ Authenticated as:', userEmail);
        return true;
    }

    async loadDashboardData() {
        console.log('📊 Loading dashboard data...');
        
        try {
            await Promise.all([
                this.loadStats(),
                this.loadUsers(),
                this.loadGTMAnalytics(),
                this.loadVCList(),
                this.loadUnassignedStartups(),
                this.loadAnalytics(),
                this.loadAgentUsage(),
                this.loadBillingData(),
                this.loadSystemData()
            ]);
            
            console.log('✅ Dashboard data loaded');
        } catch (error) {
            console.error('❌ Error loading dashboard:', error);
            this.showError('Failed to load dashboard data');
        }
    }

    async loadStats() {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch('/api/admin/stats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }

            const data = await response.json();
            this.stats = data.stats || {};
            this.updateStatsUI();
        } catch (error) {
            console.error('Error loading stats:', error);
            // Use fallback data
            this.stats = {
                totalUsers: 0,
                activeUsers: 0,
                paidUsers: 0,
                totalAssessments: 0
            };
            this.updateStatsUI();
        }
    }

    updateStatsUI() {
        const elements = {
            totalUsers: document.getElementById('totalUsers'),
            activeSessions: document.getElementById('activeSessions'),
            avgCompletion: document.getElementById('avgCompletion'),
            totalAssessments: document.getElementById('totalAssessments')
        };

        if (elements.totalUsers) {
            elements.totalUsers.textContent = this.stats.totalUsers || '0';
        }
        if (elements.activeSessions) {
            elements.activeSessions.textContent = this.stats.activeUsers || '0';
        }
        if (elements.avgCompletion) {
            elements.avgCompletion.textContent = this.stats.avgCompletion || '0%';
        }
        if (elements.totalAssessments) {
            elements.totalAssessments.textContent = this.stats.totalAssessments || '0';
        }
    }

    async loadUsers() {
        try {
            const token = localStorage.getItem('firebaseToken');
            const params = new URLSearchParams();
            
            if (this.currentFilter === 'active') {
                params.append('isActive', 'true');
            } else if (this.currentFilter === 'inactive') {
                params.append('isActive', 'false');
            }

            const response = await fetch(`/api/admin/users?${params}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            this.users = data.users || [];
            this.renderUserTable();
        } catch (error) {
            console.error('Error loading users:', error);
            this.users = [];
            this.renderUserTable();
        }
    }

    renderUserTable() {
        const tbody = document.getElementById('userTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        // Apply filters and search
        this.applyFiltersAndSearch();

        if (this.filteredUsers.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 40px; color: #666;">
                        No users found
                    </td>
                </tr>
            `;
            this.updatePagination();
            return;
        }

        // Calculate pagination
        const startIndex = (this.currentPage - 1) * this.usersPerPage;
        const endIndex = Math.min(startIndex + this.usersPerPage, this.filteredUsers.length);
        const pageUsers = this.filteredUsers.slice(startIndex, endIndex);

        pageUsers.forEach(user => {
            const row = document.createElement('tr');
            const isSelected = this.selectedUserIds.has(user.id);
            
            row.innerHTML = `
                <td>
                    <input type="checkbox"
                           class="user-checkbox"
                           data-user-id="${user.id}"
                           ${isSelected ? 'checked' : ''}
                           onchange="adminDashboard.toggleUserSelection(${user.id})"
                           style="width: 16px; height: 16px; cursor: pointer;">
                </td>
                <td>
                    <div>${user.full_name || user.name || 'N/A'}</div>
                    <div style="color: #666; font-size: 12px;">${user.email}</div>
                </td>
                <td>${user.company || 'N/A'}</td>
                <td>${this.formatDate(user.created_at)}</td>
                <td>
                    <span class="badge badge-${this.getRoleBadgeClass(user.role)}">
                        ${user.role}
                    </span>
                    <span class="badge badge-${this.getTierBadgeClass(user.tier)}" style="margin-left: 4px;">
                        Tier ${user.tier}
                    </span>
                </td>
                <td>
                    <span class="badge ${user.is_active ? 'badge-success' : 'badge-danger'}">
                        ${user.is_active ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td>
                    <div class="actions">
                        <button class="btn-action" onclick="adminDashboard.viewUser(${user.id})">View</button>
                        <button class="btn-action" onclick="adminDashboard.editUser(${user.id})">Edit</button>
                        ${user.is_active ?
                            `<button class="btn-action" onclick="adminDashboard.deactivateUser(${user.id})">Deactivate</button>` :
                            `<button class="btn-action" onclick="adminDashboard.activateUser(${user.id})">Activate</button>`
                        }
                        <button class="btn-action danger" onclick="adminDashboard.deleteUser(${user.id}, '${user.email}')">Delete</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });

        this.updatePagination();
    }

    applyFiltersAndSearch() {
        this.filteredUsers = this.users.filter(user => {
            // Search filter
            if (this.searchTerm) {
                const searchLower = this.searchTerm.toLowerCase();
                const matchesSearch =
                    (user.full_name && user.full_name.toLowerCase().includes(searchLower)) ||
                    (user.name && user.name.toLowerCase().includes(searchLower)) ||
                    (user.email && user.email.toLowerCase().includes(searchLower)) ||
                    (user.company && user.company.toLowerCase().includes(searchLower));
                
                if (!matchesSearch) return false;
            }

            // Role filter
            if (this.filters.role && user.role !== this.filters.role) {
                return false;
            }

            // Tier filter
            if (this.filters.tier !== '' && user.tier !== parseInt(this.filters.tier)) {
                return false;
            }

            // Status filter
            if (this.filters.status) {
                const isActive = this.filters.status === 'active';
                if (user.is_active !== isActive) {
                    return false;
                }
            }

            return true;
        });

        this.totalUsers = this.filteredUsers.length;
    }

    updatePagination() {
        const totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
        const startIndex = (this.currentPage - 1) * this.usersPerPage + 1;
        const endIndex = Math.min(this.currentPage * this.usersPerPage, this.totalUsers);

        // Update info text
        const infoEl = document.getElementById('paginationInfo');
        if (infoEl) {
            infoEl.textContent = `Showing ${startIndex}-${endIndex} of ${this.totalUsers} users`;
        }

        // Update buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }
        if (nextBtn) {
            nextBtn.disabled = this.currentPage >= totalPages;
        }

        // Update page numbers
        const pageNumbersEl = document.getElementById('pageNumbers');
        if (pageNumbersEl) {
            pageNumbersEl.innerHTML = '';
            
            for (let i = 1; i <= totalPages; i++) {
                if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                    const btn = document.createElement('button');
                    btn.className = 'btn-action';
                    btn.textContent = i;
                    btn.onclick = () => this.goToPage(i);
                    
                    if (i === this.currentPage) {
                        btn.style.background = '#FF5500';
                        btn.style.color = '#fff';
                    }
                    
                    pageNumbersEl.appendChild(btn);
                } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                    const span = document.createElement('span');
                    span.textContent = '...';
                    span.style.padding = '0 8px';
                    span.style.color = '#666';
                    pageNumbersEl.appendChild(span);
                }
            }
        }
    }

    goToPage(page) {
        this.currentPage = page;
        this.renderUserTable();
    }

    searchUsers() {
        const searchInput = document.getElementById('userSearch');
        this.searchTerm = searchInput ? searchInput.value : '';
        this.currentPage = 1;
        this.renderUserTable();
    }

    filterUsers() {
        const roleFilter = document.getElementById('roleFilter');
        const tierFilter = document.getElementById('tierFilter');
        const statusFilter = document.getElementById('statusFilter');

        this.filters.role = roleFilter ? roleFilter.value : '';
        this.filters.tier = tierFilter ? tierFilter.value : '';
        this.filters.status = statusFilter ? statusFilter.value : '';
        
        this.currentPage = 1;
        this.renderUserTable();
    }

    toggleUserSelection(userId) {
        if (this.selectedUserIds.has(userId)) {
            this.selectedUserIds.delete(userId);
        } else {
            this.selectedUserIds.add(userId);
        }
        this.updateSelectAllCheckbox();
    }

    toggleSelectAll() {
        const selectAllCheckbox = document.getElementById('selectAll');
        const isChecked = selectAllCheckbox ? selectAllCheckbox.checked : false;

        if (isChecked) {
            // Select all visible users
            this.filteredUsers.forEach(user => this.selectedUserIds.add(user.id));
        } else {
            // Deselect all
            this.selectedUserIds.clear();
        }

        this.renderUserTable();
    }

    updateSelectAllCheckbox() {
        const selectAllCheckbox = document.getElementById('selectAll');
        if (!selectAllCheckbox) return;

        const visibleUserIds = this.filteredUsers.map(u => u.id);
        const allVisibleSelected = visibleUserIds.every(id => this.selectedUserIds.has(id));
        
        selectAllCheckbox.checked = allVisibleSelected && visibleUserIds.length > 0;
    }

    bulkOperations() {
        if (this.selectedUserIds.size === 0) {
            this.showError('Please select at least one user');
            return;
        }

        const modal = document.getElementById('bulkModal');
        const selectedCount = document.getElementById('selectedCount');
        
        if (modal) {
            modal.style.display = 'flex';
        }
        if (selectedCount) {
            selectedCount.textContent = this.selectedUserIds.size;
        }
    }

    closeBulkModal() {
        const modal = document.getElementById('bulkModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    async bulkChangeRole() {
        const newRole = prompt('Enter new role for selected users:\n\nadmin, user, vc, st6_partner');
        
        if (!newRole || !['admin', 'user', 'vc', 'st6_partner'].includes(newRole)) {
            if (newRole) this.showError('Invalid role');
            return;
        }

        if (!confirm(`Change role to "${newRole}" for ${this.selectedUserIds.size} users?`)) {
            return;
        }

        try {
            const token = localStorage.getItem('firebaseToken');
            const promises = Array.from(this.selectedUserIds).map(userId =>
                fetch(`/api/admin/users/${userId}/role`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ role: newRole })
                })
            );

            await Promise.all(promises);
            this.showSuccess(`Role updated for ${this.selectedUserIds.size} users`);
            this.selectedUserIds.clear();
            this.closeBulkModal();
            await this.loadUsers();
        } catch (error) {
            console.error('Error in bulk role change:', error);
            this.showError('Failed to update roles');
        }
    }

    async bulkChangeTier() {
        const newTier = prompt('Enter new tier for selected users (0-3):');
        const tier = parseInt(newTier);
        
        if (isNaN(tier) || tier < 0 || tier > 3) {
            if (newTier) this.showError('Invalid tier (must be 0-3)');
            return;
        }

        if (!confirm(`Change tier to ${tier} for ${this.selectedUserIds.size} users?`)) {
            return;
        }

        try {
            const token = localStorage.getItem('firebaseToken');
            const promises = Array.from(this.selectedUserIds).map(userId =>
                fetch(`/api/admin/users/${userId}/tier`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ tier })
                })
            );

            await Promise.all(promises);
            this.showSuccess(`Tier updated for ${this.selectedUserIds.size} users`);
            this.selectedUserIds.clear();
            this.closeBulkModal();
            await this.loadUsers();
        } catch (error) {
            console.error('Error in bulk tier change:', error);
            this.showError('Failed to update tiers');
        }
    }

    async bulkDeactivate() {
        if (!confirm(`Deactivate ${this.selectedUserIds.size} users?`)) {
            return;
        }

        try {
            const token = localStorage.getItem('firebaseToken');
            const promises = Array.from(this.selectedUserIds).map(userId =>
                fetch(`/api/admin/users/${userId}/deactivate`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            );

            await Promise.all(promises);
            this.showSuccess(`${this.selectedUserIds.size} users deactivated`);
            this.selectedUserIds.clear();
            this.closeBulkModal();
            await this.loadUsers();
        } catch (error) {
            console.error('Error in bulk deactivate:', error);
            this.showError('Failed to deactivate users');
        }
    }

    async bulkDelete() {
        if (!confirm(`⚠️ PERMANENTLY DELETE ${this.selectedUserIds.size} users?\n\nThis action cannot be undone!`)) {
            return;
        }

        try {
            const token = localStorage.getItem('firebaseToken');
            const promises = Array.from(this.selectedUserIds).map(userId =>
                fetch(`/api/admin/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            );

            await Promise.all(promises);
            this.showSuccess(`${this.selectedUserIds.size} users deleted`);
            this.selectedUserIds.clear();
            this.closeBulkModal();
            await this.loadUsers();
        } catch (error) {
            console.error('Error in bulk delete:', error);
            this.showError('Failed to delete users');
        }
    }

    getRoleBadgeClass(role) {
        const classes = {
            'admin': 'danger',
            'vc': 'warning',
            'st6_partner': 'warning',
            'user': 'success'
        };
        return classes[role] || 'success';
    }

    getTierBadgeClass(tier) {
        if (tier >= 2) return 'success';
        if (tier >= 1) return 'warning';
        return 'danger';
    }

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    async loadGTMAnalytics() {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch('/api/admin/analytics/gtm-scores?days=30', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch GTM analytics');
            }

            const data = await response.json();
            this.renderBlockChart(data.blockSummary || []);
        } catch (error) {
            console.error('Error loading GTM analytics:', error);
            this.renderBlockChart([]);
        }
    }

    renderBlockChart(blockData) {
        const chartContainer = document.getElementById('blockChart');
        if (!chartContainer) return;

        chartContainer.innerHTML = '';

        if (blockData.length === 0) {
            chartContainer.innerHTML = '<div style="text-align: center; color: #666; padding: 40px;">No data available</div>';
            return;
        }

        blockData.forEach(block => {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = `${(block.averageScore || 0) * 2.5}px`;
            bar.innerHTML = `<div class="chart-label">Block ${block.blockId}</div>`;
            bar.title = `Block ${block.blockId}: ${block.averageScore}% (${block.totalAssessments} assessments)`;
            chartContainer.appendChild(bar);
        });
    }

    switchTab(tab) {
        this.currentFilter = tab;
        
        // Update tab UI
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
        
        // Reload users with filter
        this.loadUsers();
    }

    async viewUser(userId) {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch(`/api/admin/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }

            const data = await response.json();
            this.showUserModal(data.user);
        } catch (error) {
            console.error('Error viewing user:', error);
            this.showError('Failed to load user details');
        }
    }

    showUserModal(user) {
        // Create modal HTML
        const modalHTML = `
            <div id="userModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 9999;">
                <div style="background: #111; border: 1px solid #333; border-radius: 12px; padding: 32px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <h2 style="color: #FF5500; font-size: 24px; margin: 0;">User Details</h2>
                        <button onclick="document.getElementById('userModal').remove()" style="background: #333; border: none; color: #fff; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Close</button>
                    </div>
                    
                    <div style="margin-bottom: 24px;">
                        <h3 style="color: #888; font-size: 12px; text-transform: uppercase; margin-bottom: 8px;">Basic Information</h3>
                        <div style="background: #0a0a0a; padding: 16px; border-radius: 8px;">
                            <p style="margin: 8px 0;"><strong>Name:</strong> ${user.full_name || user.name || 'N/A'}</p>
                            <p style="margin: 8px 0;"><strong>Email:</strong> ${user.email}</p>
                            <p style="margin: 8px 0;"><strong>Company:</strong> ${user.company || 'N/A'}</p>
                            <p style="margin: 8px 0;"><strong>Role:</strong> <span class="badge badge-${this.getRoleBadgeClass(user.role)}">${user.role}</span></p>
                            <p style="margin: 8px 0;"><strong>Tier:</strong> <span class="badge badge-${this.getTierBadgeClass(user.tier)}">Tier ${user.tier}</span></p>
                            <p style="margin: 8px 0;"><strong>Status:</strong> <span class="badge ${user.is_active ? 'badge-success' : 'badge-danger'}">${user.is_active ? 'Active' : 'Inactive'}</span></p>
                            <p style="margin: 8px 0;"><strong>Created:</strong> ${this.formatDate(user.created_at)}</p>
                            <p style="margin: 8px 0;"><strong>Last Login:</strong> ${user.last_login ? this.formatDate(user.last_login) : 'Never'}</p>
                        </div>
                    </div>
                    
                    ${user.gtmScores ? `
                    <div style="margin-bottom: 24px;">
                        <h3 style="color: #888; font-size: 12px; text-transform: uppercase; margin-bottom: 8px;">GTM Performance</h3>
                        <div style="background: #0a0a0a; padding: 16px; border-radius: 8px;">
                            <p style="margin: 8px 0;"><strong>Overall Average:</strong> ${user.gtmScores.overallAverage}%</p>
                            <p style="margin: 8px 0;"><strong>Completed Subcomponents:</strong> ${user.gtmScores.totalSubcomponents}</p>
                            ${user.gtmScores.blockScores && user.gtmScores.blockScores.length > 0 ? `
                                <p style="margin: 8px 0;"><strong>Block Scores:</strong></p>
                                <ul style="margin: 8px 0; padding-left: 20px;">
                                    ${user.gtmScores.blockScores.map(b => `<li>Block ${b.blockId}: ${b.averageScore}% (${b.completedSubcomponents} completed)</li>`).join('')}
                                </ul>
                            ` : ''}
                        </div>
                    </div>
                    ` : ''}
                    
                    ${user.tags && user.tags.length > 0 ? `
                    <div style="margin-bottom: 24px;">
                        <h3 style="color: #888; font-size: 12px; text-transform: uppercase; margin-bottom: 8px;">Tags</h3>
                        <div style="background: #0a0a0a; padding: 16px; border-radius: 8px;">
                            ${user.tags.map(t => `<span class="badge badge-warning" style="margin-right: 8px;">${t.tag}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    ${user.notes && user.notes.length > 0 ? `
                    <div style="margin-bottom: 24px;">
                        <h3 style="color: #888; font-size: 12px; text-transform: uppercase; margin-bottom: 8px;">Admin Notes</h3>
                        <div style="background: #0a0a0a; padding: 16px; border-radius: 8px;">
                            ${user.notes.map(n => `
                                <div style="margin-bottom: 12px; padding: 12px; background: #111; border-radius: 6px;">
                                    <p style="margin: 0 0 8px 0;">${n.note}</p>
                                    <p style="margin: 0; font-size: 12px; color: #666;">By ${n.created_by_name || n.created_by_email} on ${this.formatDate(n.created_at)}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    async editUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        const newRole = prompt(`Change role for ${user.email}:\n\nCurrent: ${user.role}\n\nEnter new role (admin, user, vc, st6_partner):`, user.role);
        
        if (!newRole || newRole === user.role) return;

        if (!['admin', 'user', 'vc', 'st6_partner'].includes(newRole)) {
            this.showError('Invalid role');
            return;
        }

        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch(`/api/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: newRole })
            });

            if (!response.ok) {
                throw new Error('Failed to update role');
            }

            this.showSuccess(`Role updated to ${newRole}`);
            await this.loadUsers();
        } catch (error) {
            console.error('Error updating role:', error);
            this.showError('Failed to update role');
        }
    }

    async deactivateUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        if (!confirm(`Deactivate user ${user.email}?`)) return;

        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch(`/api/admin/users/${userId}/deactivate`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to deactivate user');
            }

            this.showSuccess('User deactivated');
            await this.loadUsers();
        } catch (error) {
            console.error('Error deactivating user:', error);
            this.showError('Failed to deactivate user');
        }
    }

    async activateUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch(`/api/admin/users/${userId}/activate`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to activate user');
            }

            this.showSuccess('User activated');
            await this.loadUsers();
        } catch (error) {
            console.error('Error activating user:', error);
            this.showError('Failed to activate user');
        }
    }

    async deleteUser(userId, email) {
        if (!confirm(`⚠️ PERMANENTLY DELETE user ${email}?\n\nThis action cannot be undone!`)) {
            return;
        }

        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            this.showSuccess('User deleted');
            await this.loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            this.showError('Failed to delete user');
        }
    }

    async exportUsers() {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch('/api/admin/users/export', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    role: null,
                    tier: null,
                    status: null
                })
            });

            if (!response.ok) {
                throw new Error('Failed to export users');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `scaleops6-users-${Date.now()}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            this.showSuccess('Users exported successfully');
        } catch (error) {
            console.error('Error exporting users:', error);
            this.showError('Failed to export users');
        }
    }

    async refreshBlockData() {
        await this.loadGTMAnalytics();
        this.showSuccess('Block data refreshed');
    }

    showError(message) {
        // Simple alert for now - can be enhanced with toast notifications
        alert('❌ ' + message);
    }

    showSuccess(message) {
        // Simple alert for now - can be enhanced with toast notifications
        alert('✅ ' + message);
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.clear();
            window.location.href = '/signup.html';
        }
    }

    // ========================================
    // VC PORTFOLIO MANAGEMENT METHODS
    // ========================================

    async loadVCList() {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch('/api/admin/vc/list', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch VCs');
            }

            const data = await response.json();
            this.vcs = data.vcs || [];
            this.renderVCSelector();
            
            // Update total VCs count
            const totalVCsEl = document.getElementById('totalVCs');
            if (totalVCsEl) {
                totalVCsEl.textContent = this.vcs.length;
            }
        } catch (error) {
            console.error('Error loading VCs:', error);
            this.vcs = [];
            this.renderVCSelector();
        }
    }

    renderVCSelector() {
        const selector = document.getElementById('vcSelector');
        if (!selector) return;

        selector.innerHTML = '<option value="">-- Select a VC --</option>';
        
        this.vcs.forEach(vc => {
            const option = document.createElement('option');
            option.value = vc.id;
            option.textContent = `${vc.full_name || vc.email} (${vc.assignedStartups || 0} startups)`;
            selector.appendChild(option);
        });
    }

    async loadVCPortfolio() {
        const selector = document.getElementById('vcSelector');
        const vcId = selector?.value;
        
        if (!vcId) {
            this.clearPortfolioDisplay();
            return;
        }

        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch(`/api/admin/vc/${vcId}/portfolio`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch portfolio');
            }

            const data = await response.json();
            this.currentPortfolio = data.portfolio || [];
            this.currentVCId = vcId;
            this.renderPortfolio();
            this.updateVCInfo();
            
            // Show assign button
            const assignBtn = document.getElementById('showAssignBtn');
            if (assignBtn) {
                assignBtn.style.display = 'block';
            }
        } catch (error) {
            console.error('Error loading portfolio:', error);
            this.showError('Failed to load portfolio');
            this.clearPortfolioDisplay();
        }
    }

    // ========================================
    // GTM ANALYTICS METHODS
    // ========================================

    async loadAnalytics() {
        const timeRange = document.getElementById('analyticsTimeRange')?.value || 30;
        
        try {
            const token = localStorage.getItem('firebaseToken');
            
            // Load all analytics data
            await Promise.all([
                this.loadAnalyticsOverview(timeRange),
                this.loadTopPerformers(),
                this.loadMostImproved(timeRange),
                this.loadHeatmap()
            ]);
            
            console.log('✅ Analytics loaded');
        } catch (error) {
            console.error('Error loading analytics:', error);
            this.showError('Failed to load analytics');
        }
    }

    async loadAnalyticsOverview(days = 30) {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch(`/api/admin/analytics/gtm-scores?days=${days}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch analytics overview');
            }

            const data = await response.json();
            this.updateAnalyticsOverview(data);
        } catch (error) {
            console.error('Error loading analytics overview:', error);
        }
    }

    updateAnalyticsOverview(data) {
        const platformAvg = document.getElementById('platformAverage');
        const totalAssessments = document.getElementById('totalAssessmentsAnalytics');
        const activeUsers = document.getElementById('activeUsersAnalytics');
        const completionRate = document.getElementById('completionRate');

        if (platformAvg) {
            platformAvg.textContent = `${data.platformAverage || 0}%`;
        }
        if (totalAssessments) {
            totalAssessments.textContent = data.totalAssessments || 0;
        }
        if (activeUsers) {
            activeUsers.textContent = data.activeUsers || 0;
        }
        if (completionRate) {
            completionRate.textContent = `${data.completionRate || 0}%`;
        }
    }

    async loadTopPerformers() {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch('/api/admin/analytics/top-performers?limit=10', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch top performers');
            }

            const data = await response.json();
            this.renderTopPerformers(data.topPerformers || []);
        } catch (error) {
            console.error('Error loading top performers:', error);
            this.renderTopPerformers([]);
        }
    }

    renderTopPerformers(performers) {
        const tbody = document.getElementById('topPerformersBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (performers.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: #666;">
                        No performance data available
                    </td>
                </tr>
            `;
            return;
        }

        performers.forEach((user, index) => {
            const row = document.createElement('tr');
            const rankEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
            
            row.innerHTML = `
                <td style="text-align: center; font-size: 20px;">${rankEmoji || (index + 1)}</td>
                <td>
                    <div>${user.full_name || user.name || 'N/A'}</div>
                    <div style="color: #666; font-size: 12px;">${user.email}</div>
                </td>
                <td>${user.company || 'N/A'}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="flex: 1; background: #222; border-radius: 4px; height: 8px; overflow: hidden;">
                            <div style="width: ${user.overallScore}%; height: 100%; background: ${this.getScoreColor(user.overallScore)}; transition: width 0.3s;"></div>
                        </div>
                        <span style="font-weight: 600; color: ${this.getScoreColor(user.overallScore)};">${user.overallScore}%</span>
                    </div>
                </td>
                <td>${user.completedSubcomponents || 0} / 96</td>
                <td>
                    <span class="badge badge-${this.getTierBadgeClass(user.tier)}">
                        Tier ${user.tier}
                    </span>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    async loadMostImproved(days = 30) {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch(`/api/admin/analytics/most-improved?days=${days}&limit=10`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch most improved');
            }

            const data = await response.json();
            this.renderMostImproved(data.mostImproved || []);
        } catch (error) {
            console.error('Error loading most improved:', error);
            this.renderMostImproved([]);
        }
    }

    renderMostImproved(users) {
        const tbody = document.getElementById('mostImprovedBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (users.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 40px; color: #666;">
                        No improvement data available
                    </td>
                </tr>
            `;
            return;
        }

        users.forEach(user => {
            const row = document.createElement('tr');
            const improvement = user.currentScore - user.previousScore;
            const improvementPercent = user.previousScore > 0 ? ((improvement / user.previousScore) * 100).toFixed(1) : 0;
            
            row.innerHTML = `
                <td>
                    <div>${user.full_name || user.name || 'N/A'}</div>
                    <div style="color: #666; font-size: 12px;">${user.email}</div>
                </td>
                <td>${user.company || 'N/A'}</td>
                <td>
                    <span style="color: #888;">${user.previousScore}%</span>
                </td>
                <td>
                    <span style="color: ${this.getScoreColor(user.currentScore)}; font-weight: 600;">${user.currentScore}%</span>
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: #4CAF50; font-weight: 600;">+${improvement}%</span>
                        <span style="color: #666; font-size: 12px;">(+${improvementPercent}%)</span>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    async loadHeatmap() {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch('/api/admin/analytics/heatmap', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch heatmap');
            }

            const data = await response.json();
            this.renderHeatmap(data.heatmap || []);
        } catch (error) {
            console.error('Error loading heatmap:', error);
            this.renderHeatmap([]);
        }
    }

    renderHeatmap(heatmapData) {
        const container = document.getElementById('heatmapContainer');
        if (!container) return;

        if (heatmapData.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No heatmap data available</div>';
            return;
        }

        // Group by block
        const blockMap = {};
        heatmapData.forEach(item => {
            if (!blockMap[item.blockId]) {
                blockMap[item.blockId] = [];
            }
            blockMap[item.blockId].push(item);
        });

        let html = '<div style="display: flex; flex-direction: column; gap: 4px;">';
        
        // Render each block row
        for (let blockId = 1; blockId <= 16; blockId++) {
            const blockData = blockMap[blockId] || [];
            const avgScore = blockData.length > 0 
                ? blockData.reduce((sum, item) => sum + (item.averageScore || 0), 0) / blockData.length 
                : 0;
            
            html += `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 80px; color: #888; font-size: 12px; text-align: right;">Block ${blockId}</div>
                    <div style="flex: 1; display: flex; gap: 2px;">
            `;
            
            // Render cells for each user
            const maxCells = 20; // Show up to 20 users
            for (let i = 0; i < maxCells; i++) {
                const userScore = blockData[i]?.averageScore || null;
                const bgColor = userScore === null ? '#333' : 
                               userScore >= 80 ? '#4CAF50' :
                               userScore >= 50 ? '#FF9800' : '#f44336';
                
                html += `
                    <div style="flex: 1; height: 24px; background: ${bgColor}; border-radius: 2px; cursor: pointer;" 
                         title="${userScore !== null ? `Score: ${userScore}%` : 'No data'}">
                    </div>
                `;
            }
            
            html += `
                    </div>
                    <div style="width: 60px; color: ${this.getScoreColor(avgScore)}; font-size: 12px; font-weight: 600; text-align: right;">
                        ${avgScore.toFixed(0)}%
                    </div>
                </div>
            `;
        }
        
        html += '</div>';
        container.innerHTML = html;
    }

    async exportAnalytics() {
        try {
            const timeRange = document.getElementById('analyticsTimeRange')?.value || 30;
            const token = localStorage.getItem('firebaseToken');
            
            const response = await fetch(`/api/admin/analytics/export?days=${timeRange}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to export analytics');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `gtm-analytics-${Date.now()}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            this.showSuccess('Analytics exported successfully');
        } catch (error) {
            console.error('Error exporting analytics:', error);
            this.showError('Failed to export analytics');
        }
    }

    // ========================================
    // AGENT MONITORING METHODS
    // ========================================

    async loadAgentUsage() {
        const timeRange = document.getElementById('agentTimeRange')?.value || 30;
        
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch(`/api/admin/analytics/agent-usage?days=${timeRange}&limit=50`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch agent usage');
            }

            const data = await response.json();
            this.updateAgentStats(data);
            this.renderAgentLogs(data.logs || []);
            this.renderPopularAgents(data.popularAgents || []);
        } catch (error) {
            console.error('Error loading agent usage:', error);
            this.renderAgentLogs([]);
            this.renderPopularAgents([]);
        }
    }

    updateAgentStats(data) {
        const totalInvocations = document.getElementById('totalInvocations');
        const successRate = document.getElementById('successRate');
        const totalDeliverables = document.getElementById('totalDeliverables');
        const avgResponseTime = document.getElementById('avgResponseTime');

        if (totalInvocations) {
            totalInvocations.textContent = data.totalInvocations || 0;
        }
        if (successRate) {
            successRate.textContent = `${data.successRate || 0}%`;
        }
        if (totalDeliverables) {
            totalDeliverables.textContent = data.totalDeliverables || 0;
        }
        if (avgResponseTime) {
            avgResponseTime.textContent = `${data.avgResponseTime || 0}ms`;
        }
    }

    renderAgentLogs(logs) {
        const tbody = document.getElementById('agentLogsBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (logs.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: #666;">
                        No agent activity found
                    </td>
                </tr>
            `;
            return;
        }

        logs.forEach(log => {
            const row = document.createElement('tr');
            const statusBadge = log.status === 'success' ? 'badge-success' : 'badge-danger';
            
            row.innerHTML = `
                <td>${this.formatDateTime(log.timestamp)}</td>
                <td>
                    <div>${log.user_name || 'N/A'}</div>
                    <div style="color: #666; font-size: 12px;">${log.user_email}</div>
                </td>
                <td>${log.agent_name || 'N/A'}</td>
                <td>Block ${log.block_id || 'N/A'}</td>
                <td>
                    <span class="badge ${statusBadge}">
                        ${log.status || 'unknown'}
                    </span>
                </td>
                <td>${log.duration || 0}ms</td>
            `;
            tbody.appendChild(row);
        });
    }

    renderPopularAgents(agents) {
        const container = document.getElementById('popularAgentsChart');
        if (!container) return;

        container.innerHTML = '';

        if (agents.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No agent data available</div>';
            return;
        }

        const maxCount = Math.max(...agents.map(a => a.count));

        agents.forEach((agent, index) => {
            const percentage = (agent.count / maxCount) * 100;
            
            const div = document.createElement('div');
            div.style.cssText = 'display: flex; align-items: center; gap: 12px;';
            
            div.innerHTML = `
                <div style="width: 200px; color: #888; font-size: 14px; text-align: right;">${agent.agent_name}</div>
                <div style="flex: 1; background: #222; border-radius: 4px; height: 24px; overflow: hidden;">
                    <div style="width: ${percentage}%; height: 100%; background: #FF5500; display: flex; align-items: center; padding: 0 8px; transition: width 0.3s;">
                        <span style="color: #fff; font-size: 12px; font-weight: 600;">${agent.count}</span>
                    </div>
                </div>
                <div style="width: 80px; color: #666; font-size: 12px; text-align: right;">${agent.successRate}% success</div>
            `;
            
            container.appendChild(div);
        });
    }

    formatDateTime(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    async exportAgentLogs() {
        try {
            const timeRange = document.getElementById('agentTimeRange')?.value || 30;
            const token = localStorage.getItem('firebaseToken');
            
            const response = await fetch(`/api/admin/analytics/agent-usage/export?days=${timeRange}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to export agent logs');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `agent-logs-${Date.now()}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            this.showSuccess('Agent logs exported successfully');
        } catch (error) {
            console.error('Error exporting agent logs:', error);
            this.showError('Failed to export agent logs');
        }
    }

    // ========================================
    // BILLING & STRIPE METHODS
    // ========================================

    async loadBillingData() {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch('/api/admin/billing', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch billing data');
            }

            const data = await response.json();
            
            // Update stats with actual billing data
            const stats = data.stats || {};
            this.updateBillingStats({
                totalRevenue: (stats.totalRevenue || 0) / 100, // Convert cents to dollars
                paidUsers: stats.paidUsers || 0,
                trialUsers: stats.unpaidUsers || 0,
                churnRate: 0 // Calculate if needed
            });
            
            this.renderBillingTable(data.users || []);
        } catch (error) {
            console.error('Error loading billing data:', error);
            this.renderBillingTable([]);
        }
    }

    updateBillingStats(data) {
        const totalRevenue = document.getElementById('totalRevenue');
        const paidUsers = document.getElementById('paidUsers');
        const trialUsers = document.getElementById('trialUsers');
        const churnRate = document.getElementById('churnRate');

        if (totalRevenue) {
            totalRevenue.textContent = `$${(data.totalRevenue || 0).toLocaleString()}`;
        }
        if (paidUsers) {
            paidUsers.textContent = data.paidUsers || 0;
        }
        if (trialUsers) {
            trialUsers.textContent = data.trialUsers || 0;
        }
        if (churnRate) {
            churnRate.textContent = `${data.churnRate || 0}%`;
        }
    }

    renderBillingTable(users) {
        const tbody = document.getElementById('billingTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (users.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: #666;">
                        No billing data available
                    </td>
                </tr>
            `;
            return;
        }

        users.forEach(user => {
            const row = document.createElement('tr');
            const hasPaid = user.has_paid === 1 || user.has_paid === true;
            const statusBadge = hasPaid ? 'badge-success' : 'badge-warning';
            const statusText = hasPaid ? 'Paid' : 'Unpaid';
            
            row.innerHTML = `
                <td>
                    <div>${user.name || 'N/A'}</div>
                    <div style="color: #666; font-size: 12px;">${user.email}</div>
                </td>
                <td>
                    ${user.stripe_customer_id ?
                        `<a href="https://dashboard.stripe.com/customers/${user.stripe_customer_id}" target="_blank" style="color: #FF5500; text-decoration: none;">${user.stripe_customer_id.substring(0, 20)}...</a>` :
                        '<span style="color: #666;">Not created</span>'
                    }
                </td>
                <td>
                    <span class="badge badge-success">
                        $1.00 One-time
                    </span>
                </td>
                <td>
                    <span class="badge ${statusBadge}">
                        ${statusText}
                    </span>
                </td>
                <td>${user.payment_date ? this.formatDate(user.payment_date) : 'N/A'}</td>
                <td>
                    <div class="actions">
                        ${user.stripe_customer_id ?
                            `<button class="btn-action" onclick="adminDashboard.openStripePortal('${user.stripe_customer_id}')">Stripe Portal</button>` :
                            ''
                        }
                        ${!hasPaid ?
                            `<button class="btn-action" onclick="adminDashboard.sendPaymentReminder(${user.id})">Send Reminder</button>` :
                            ''
                        }
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    getSubscriptionBadgeClass(status) {
        const classes = {
            'paid': 'badge-success',
            'trial': 'badge-warning',
            'cancelled': 'badge-danger',
            'past_due': 'badge-danger',
            'free': 'badge-danger'
        };
        return classes[status] || 'badge-danger';
    }

    async sendPaymentReminder(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        if (!confirm(`Send payment reminder to ${user.email}?`)) return;

        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch(`/api/admin/billing/${userId}/send-reminder`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to send reminder');
            }

            this.showSuccess('Payment reminder sent');
        } catch (error) {
            console.error('Error sending reminder:', error);
            this.showError('Failed to send payment reminder');
        }
    }

    openStripePortal(customerId) {
        window.open(`https://dashboard.stripe.com/customers/${customerId}`, '_blank');
    }

    async overrideTier(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        const newTier = prompt(`Override tier for ${user.email}:\n\nCurrent: Tier ${user.tier}\n\nEnter new tier (0-3):`, user.tier);
        const tier = parseInt(newTier);
        
        if (isNaN(tier) || tier < 0 || tier > 3) {
            if (newTier) this.showError('Invalid tier (must be 0-3)');
            return;
        }

        const reason = prompt('Reason for tier override (required):');
        if (!reason) {
            this.showError('Reason is required for tier override');
            return;
        }

        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch(`/api/admin/users/${userId}/tier`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tier, reason })
            });

            if (!response.ok) {
                throw new Error('Failed to override tier');
            }

            this.showSuccess(`Tier overridden to ${tier}`);
            await this.loadBillingData();
            await this.loadUsers();
        } catch (error) {
            console.error('Error overriding tier:', error);
            this.showError('Failed to override tier');
        }
    }

    async viewBillingHistory(userId) {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch(`/api/admin/billing/${userId}/history`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch billing history');
            }

            const data = await response.json();
            this.showBillingHistoryModal(data.user, data.history || []);
        } catch (error) {
            console.error('Error viewing billing history:', error);
            this.showError('Failed to load billing history');
        }
    }

    showBillingHistoryModal(user, history) {
        const modalHTML = `
            <div id="billingHistoryModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 9999;">
                <div style="background: #111; border: 1px solid #333; border-radius: 12px; padding: 32px; max-width: 800px; width: 90%; max-height: 80vh; overflow-y: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <h2 style="color: #FF5500; font-size: 24px; margin: 0;">Billing History - ${user.email}</h2>
                        <button onclick="document.getElementById('billingHistoryModal').remove()" style="background: #333; border: none; color: #fff; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Close</button>
                    </div>
                    
                    ${history.length > 0 ? `
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Invoice</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${history.map(h => `
                                    <tr>
                                        <td>${this.formatDate(h.date)}</td>
                                        <td>$${h.amount}</td>
                                        <td><span class="badge ${h.status === 'paid' ? 'badge-success' : 'badge-danger'}">${h.status}</span></td>
                                        <td>${h.invoice_url ? `<a href="${h.invoice_url}" target="_blank" style="color: #FF5500;">View PDF</a>` : 'N/A'}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    ` : '<div style="text-align: center; padding: 40px; color: #666;">No billing history found</div>'}
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    async refreshBillingData() {
        await this.loadBillingData();
        this.showSuccess('Billing data refreshed');
    }

    // ========================================
    // SYSTEM CONTROLS METHODS
    // ========================================

    async loadSystemData() {
        try {
            const token = localStorage.getItem('firebaseToken');
            
            await Promise.all([
                this.loadSystemHealth(),
                this.loadAuditLog(),
                this.loadLoginHistory()
            ]);
        } catch (error) {
            console.error('Error loading system data:', error);
        }
    }

    async loadSystemHealth() {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch('/api/admin/system/health', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch system health');
            }

            const data = await response.json();
            this.updateSystemHealth(data);
        } catch (error) {
            console.error('Error loading system health:', error);
        }
    }

    updateSystemHealth(data) {
        const dbSize = document.getElementById('dbSize');
        const apiResponseTime = document.getElementById('apiResponseTime');
        const errorRate = document.getElementById('errorRate');
        const activeSessions = document.getElementById('activeSessionsSystem');

        if (dbSize) {
            dbSize.textContent = `${data.databaseSize || 0} MB`;
        }
        if (apiResponseTime) {
            apiResponseTime.textContent = `${data.avgResponseTime || 0}ms`;
        }
        if (errorRate) {
            errorRate.textContent = `${data.errorRate || 0}%`;
        }
        if (activeSessions) {
            activeSessions.textContent = data.activeSessions || 0;
        }
    }

    async loadAuditLog() {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch('/api/admin/audit-log?limit=50', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch audit log');
            }

            const data = await response.json();
            this.renderAuditLog(data.actions || []);
        } catch (error) {
            console.error('Error loading audit log:', error);
            this.renderAuditLog([]);
        }
    }

    renderAuditLog(actions) {
        const tbody = document.getElementById('auditLogBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (actions.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 40px; color: #666;">
                        No audit log entries found
                    </td>
                </tr>
            `;
            return;
        }

        actions.forEach(action => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${this.formatDateTime(action.timestamp)}</td>
                <td>
                    <div>${action.admin_name || 'N/A'}</div>
                    <div style="color: #666; font-size: 12px;">${action.admin_email}</div>
                </td>
                <td>
                    <span class="badge badge-warning">${action.action_type}</span>
                </td>
                <td>
                    ${action.target_user_email || 'N/A'}
                </td>
                <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${action.action_details || ''}">
                    ${action.action_details || 'N/A'}
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    async loadLoginHistory() {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch('/api/admin/system/login-history?limit=50', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch login history');
            }

            const data = await response.json();
            this.renderLoginHistory(data.logins || []);
        } catch (error) {
            console.error('Error loading login history:', error);
            this.renderLoginHistory([]);
        }
    }

    renderLoginHistory(logins) {
        const tbody = document.getElementById('loginHistoryBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (logins.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 40px; color: #666;">
                        No login history found
                    </td>
                </tr>
            `;
            return;
        }

        logins.forEach(login => {
            const row = document.createElement('tr');
            const statusBadge = login.success ? 'badge-success' : 'badge-danger';
            
            row.innerHTML = `
                <td>${this.formatDateTime(login.timestamp)}</td>
                <td>
                    <div>${login.user_name || 'N/A'}</div>
                    <div style="color: #666; font-size: 12px;">${login.user_email}</div>
                </td>
                <td>${login.ip_address || 'N/A'}</td>
                <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${login.user_agent || ''}">
                    ${login.user_agent || 'N/A'}
                </td>
                <td>
                    <span class="badge ${statusBadge}">
                        ${login.success ? 'Success' : 'Failed'}
                    </span>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    async refreshSystemData() {
        await this.loadSystemData();
        this.showSuccess('System data refreshed');
    }

    renderPortfolio() {
        const tbody = document.getElementById('portfolioTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (this.currentPortfolio.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: #666;">
                        No startups assigned to this VC yet
                    </td>
                </tr>
            `;
            
            const statusEl = document.getElementById('portfolioStatus');
            if (statusEl) {
                statusEl.textContent = 'No startups assigned yet';
            }
            return;
        }

        const statusEl = document.getElementById('portfolioStatus');
        if (statusEl) {
            statusEl.textContent = `Showing ${this.currentPortfolio.length} assigned startup(s)`;
        }

        this.currentPortfolio.forEach(startup => {
            const row = document.createElement('tr');
            const gtmScore = startup.gtmScores?.overallAverage || 0;
            const completedBlocks = startup.gtmScores?.totalSubcomponents || 0;
            
            row.innerHTML = `
                <td>
                    <div>${startup.full_name || 'N/A'}</div>
                    <div style="color: #666; font-size: 12px;">${startup.company || 'No company'}</div>
                </td>
                <td>${startup.email}</td>
                <td>
                    <span class="badge badge-${this.getTierBadgeClass(startup.tier)}">
                        Tier ${startup.tier}
                    </span>
                </td>
                <td>${this.formatDate(startup.assigned_at)}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="flex: 1; background: #222; border-radius: 4px; height: 8px; overflow: hidden;">
                            <div style="width: ${gtmScore}%; height: 100%; background: ${this.getScoreColor(gtmScore)}; transition: width 0.3s;"></div>
                        </div>
                        <span style="font-weight: 600; color: ${this.getScoreColor(gtmScore)};">${gtmScore}%</span>
                    </div>
                    <div style="color: #666; font-size: 12px; margin-top: 4px;">${completedBlocks} subcomponents</div>
                </td>
                <td>
                    <div class="actions">
                        <button class="btn-action" onclick="adminDashboard.viewUser(${startup.id})">View</button>
                        <button class="btn-action danger" onclick="adminDashboard.removeAssignment(${startup.assignment_id})">Remove</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    getScoreColor(score) {
        if (score >= 80) return '#4CAF50';
        if (score >= 50) return '#FF9800';
        return '#f44336';
    }

    updateVCInfo() {
        const vcInfo = document.getElementById('vcInfo');
        const vcPortfolioCount = document.getElementById('vcPortfolioCount');
        
        if (vcInfo && vcPortfolioCount) {
            vcInfo.style.display = 'block';
            vcPortfolioCount.textContent = this.currentPortfolio.length;
        }
    }

    clearPortfolioDisplay() {
        const tbody = document.getElementById('portfolioTableBody');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: #666;">
                        Select a VC to view their portfolio
                    </td>
                </tr>
            `;
        }

        const vcInfo = document.getElementById('vcInfo');
        if (vcInfo) {
            vcInfo.style.display = 'none';
        }

        const assignBtn = document.getElementById('showAssignBtn');
        if (assignBtn) {
            assignBtn.style.display = 'none';
        }

        const statusEl = document.getElementById('portfolioStatus');
        if (statusEl) {
            statusEl.textContent = 'Select a VC to view their portfolio';
        }

        this.currentPortfolio = [];
        this.currentVCId = null;
    }

    async loadUnassignedStartups() {
        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch('/api/admin/vc/startups/unassigned', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch unassigned startups');
            }

            const data = await response.json();
            this.unassignedStartups = data.startups || [];
            
            // Update unassigned count
            const unassignedEl = document.getElementById('unassignedStartups');
            if (unassignedEl) {
                unassignedEl.textContent = this.unassignedStartups.length;
            }
            
            this.renderStartupList();
        } catch (error) {
            console.error('Error loading unassigned startups:', error);
            this.unassignedStartups = [];
            this.renderStartupList();
        }
    }

    renderStartupList() {
        const startupList = document.getElementById('startupList');
        if (!startupList) return;

        startupList.innerHTML = '';

        if (this.unassignedStartups.length === 0) {
            startupList.innerHTML = '<div style="color: #666; text-align: center; padding: 20px;">No unassigned startups available</div>';
            return;
        }

        this.unassignedStartups.forEach(startup => {
            const div = document.createElement('div');
            div.style.cssText = 'padding: 8px; border-bottom: 1px solid #222; display: flex; align-items: center; gap: 12px;';
            
            div.innerHTML = `
                <input type="checkbox" id="startup_${startup.id}" value="${startup.id}" style="width: 16px; height: 16px; cursor: pointer;">
                <label for="startup_${startup.id}" style="flex: 1; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: 500;">${startup.full_name || startup.email}</div>
                        <div style="color: #666; font-size: 12px;">${startup.email} • ${startup.company || 'No company'}</div>
                    </div>
                    <span class="badge badge-${this.getTierBadgeClass(startup.tier)}">Tier ${startup.tier}</span>
                </label>
            `;
            
            startupList.appendChild(div);
        });
    }

    async toggleAssignmentInterface() {
        const interface_ = document.getElementById('assignmentInterface');
        if (!interface_) return;

        if (interface_.style.display === 'none') {
            // Show interface
            if (!this.currentVCId) {
                this.showError('Please select a VC first');
                return;
            }
            
            await this.loadUnassignedStartups();
            interface_.style.display = 'block';
        } else {
            // Hide interface
            interface_.style.display = 'none';
            document.getElementById('assignmentNotes').value = '';
            
            // Uncheck all checkboxes
            const checkboxes = document.querySelectorAll('#startupList input[type="checkbox"]');
            checkboxes.forEach(cb => cb.checked = false);
        }
    }

    async assignSelectedStartups() {
        if (!this.currentVCId) {
            this.showError('No VC selected');
            return;
        }

        // Get selected startup IDs
        const checkboxes = document.querySelectorAll('#startupList input[type="checkbox"]:checked');
        const startupIds = Array.from(checkboxes).map(cb => parseInt(cb.value));

        if (startupIds.length === 0) {
            this.showError('Please select at least one startup');
            return;
        }

        const notes = document.getElementById('assignmentNotes')?.value || '';

        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch('/api/admin/vc/assign', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    vcUserId: parseInt(this.currentVCId),
                    startupUserIds: startupIds,
                    notes: notes
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to assign startups');
            }

            this.showSuccess(`${startupIds.length} startup(s) assigned successfully`);
            
            // Refresh data
            await this.loadVCPortfolio();
            await this.loadUnassignedStartups();
            await this.toggleAssignmentInterface();
        } catch (error) {
            console.error('Error assigning startups:', error);
            this.showError(error.message || 'Failed to assign startups');
        }
    }

    async removeAssignment(assignmentId) {
        if (!confirm('Remove this startup from the VC portfolio?')) {
            return;
        }

        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch(`/api/admin/vc/assign/${assignmentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to remove assignment');
            }

            this.showSuccess('Assignment removed successfully');
            
            // Refresh portfolio
            await this.loadVCPortfolio();
            await this.loadUnassignedStartups();
        } catch (error) {
            console.error('Error removing assignment:', error);
            this.showError('Failed to remove assignment');
        }
    }

    async exportVCPortfolio() {
        if (!this.currentVCId) {
            this.showError('Please select a VC first');
            return;
        }

        try {
            const token = localStorage.getItem('firebaseToken');
            const response = await fetch(`/api/admin/vc/${this.currentVCId}/portfolio/export`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to export portfolio');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `vc-portfolio-${this.currentVCId}-${Date.now()}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            this.showSuccess('Portfolio exported successfully');
        } catch (error) {
            console.error('Error exporting portfolio:', error);
            this.showError('Failed to export portfolio');
        }
    }
}

// Initialize dashboard when DOM is ready
let adminDashboard;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        adminDashboard = new AdminDashboard();
    });
} else {
    adminDashboard = new AdminDashboard();
}

// Global functions for onclick handlers
function switchTab(tab) {
    if (adminDashboard) {
        adminDashboard.switchTab(tab);
    }
}

function exportUsers() {
    if (adminDashboard) {
        adminDashboard.exportUsers();
    }
}

function refreshBlockData() {
    if (adminDashboard) {
        adminDashboard.refreshBlockData();
    }
}

function logout() {
    if (adminDashboard) {
        adminDashboard.logout();
    }
}

function loadVCPortfolio() {
    if (adminDashboard) {
        adminDashboard.loadVCPortfolio();
    }
}

function searchUsers() {
    if (adminDashboard) {
        adminDashboard.searchUsers();
    }
}

function filterUsers() {
    if (adminDashboard) {
        adminDashboard.filterUsers();
    }
}

function toggleSelectAll() {
    if (adminDashboard) {
        adminDashboard.toggleSelectAll();
    }
}

function previousPage() {
    if (adminDashboard && adminDashboard.currentPage > 1) {
        adminDashboard.currentPage--;
        adminDashboard.renderUserTable();
    }
}

function nextPage() {
    if (adminDashboard) {
        const totalPages = Math.ceil(adminDashboard.totalUsers / adminDashboard.usersPerPage);
        if (adminDashboard.currentPage < totalPages) {
            adminDashboard.currentPage++;
            adminDashboard.renderUserTable();
        }
    }
}

function loadAnalytics() {
    if (adminDashboard) {
        adminDashboard.loadAnalytics();
    }
}

function exportAnalytics() {
    if (adminDashboard) {
        adminDashboard.exportAnalytics();
    }
}

function refreshBillingData() {
    if (adminDashboard) {
        adminDashboard.refreshBillingData();
    }
}

function refreshSystemData() {
    if (adminDashboard) {
        adminDashboard.refreshSystemData();
    }
}

function loadAgentUsage() {
    if (adminDashboard) {
        adminDashboard.loadAgentUsage();
    }
}

function exportAgentLogs() {
    if (adminDashboard) {
        adminDashboard.exportAgentLogs();
    }
}

function bulkOperations() {
    if (adminDashboard) {
        adminDashboard.bulkOperations();
    }
}

function closeBulkModal() {
    if (adminDashboard) {
        adminDashboard.closeBulkModal();
    }
}

function bulkChangeRole() {
    if (adminDashboard) {
        adminDashboard.bulkChangeRole();
    }
}

function bulkChangeTier() {
    if (adminDashboard) {
        adminDashboard.bulkChangeTier();
    }
}

function bulkDeactivate() {
    if (adminDashboard) {
        adminDashboard.bulkDeactivate();
    }
}

function bulkDelete() {
    if (adminDashboard) {
        adminDashboard.bulkDelete();
    }
}
function toggleAssignmentInterface() {
    if (adminDashboard) {
        adminDashboard.toggleAssignmentInterface();
    }
}

function assignSelectedStartups() {
    if (adminDashboard) {
        adminDashboard.assignSelectedStartups();
    }
}

function exportVCPortfolio() {
    if (adminDashboard) {
        adminDashboard.exportVCPortfolio();
    }
}