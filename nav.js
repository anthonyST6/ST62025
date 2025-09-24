// Shared navigation component for all pages
function createNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Check if user is logged in
    const sessionId = localStorage.getItem('sessionId');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const isGuest = localStorage.getItem('isGuest') === 'true';
    
    // Navigation HTML
    const navHTML = `
        <nav id="mainNav" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(180deg, #1a1a1a 0%, #111111 100%);
            border-bottom: 2px solid #FF5500;
            padding: 20px 0;
            z-index: 10000;
            box-shadow: 0 2px 20px rgba(0,0,0,0.5);
            min-height: 100px;
            display: flex;
            align-items: center;
        ">
            <div style="
                width: 100%;
                max-width: 1440px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
            ">
                <!-- Logo on the left - clickable to return home -->
                <a href="/" style="
                    display: inline-block;
                    text-decoration: none;
                ">
                    <img src="/Official_ScaleOps6_Logo.png" alt="ScaleOps6" style="
                        height: 60px;
                        width: auto;
                        object-fit: contain;
                        cursor: pointer;
                        transition: opacity 0.3s ease;
                    " onmouseover="this.style.opacity='0.8';"
                       onmouseout="this.style.opacity='1';">
                </a>
                
                <!-- Main Navigation Links in the center -->
                <div style="
                    display: flex;
                    gap: 25px;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                ">
                    <a href="/" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" style="
                        color: ${currentPage === 'index.html' ? '#FF5500' : '#ccc'};
                        text-decoration: none;
                        font-size: 14px;
                        font-weight: 500;
                        transition: color 0.3s ease;
                        position: relative;
                    ">
                        Dashboard
                    </a>
                    
                    ${sessionId && !isGuest ? `
                        <a href="/admin.html" class="nav-link ${currentPage === 'admin.html' ? 'active' : ''}" style="
                            color: ${currentPage === 'admin.html' ? '#FF5500' : '#ccc'};
                            text-decoration: none;
                            font-size: 14px;
                            font-weight: 500;
                            transition: color 0.3s ease;
                        ">
                            Admin
                        </a>
                    ` : ''}
                    
                    <a href="#" onclick="showAnalytics()" class="nav-link" style="
                        color: #ccc;
                        text-decoration: none;
                        font-size: 14px;
                        font-weight: 500;
                        transition: color 0.3s ease;
                    ">
                        Analytics
                    </a>
                    
                    <a href="#" onclick="showHelp()" class="nav-link" style="
                        color: #ccc;
                        text-decoration: none;
                        font-size: 14px;
                        font-weight: 500;
                        transition: color 0.3s ease;
                    ">
                        Help
                    </a>
                </div>
                
                <!-- User Section -->
                <div style="display: flex; align-items: center; gap: 20px;">
                    ${sessionId ? `
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <div style="
                                display: flex;
                                flex-direction: column;
                                align-items: flex-end;
                            ">
                                <span style="
                                    color: white;
                                    font-size: 14px;
                                    font-weight: 500;
                                ">${isGuest ? 'Guest User' : userName || 'User'}</span>
                                ${!isGuest && userEmail ? `
                                    <span style="
                                        color: #666;
                                        font-size: 12px;
                                    ">${userEmail}</span>
                                ` : ''}
                            </div>
                            
                            <button onclick="logout()" style="
                                padding: 8px 16px;
                                background: transparent;
                                color: #FF5500;
                                border: 1px solid #FF5500;
                                border-radius: 6px;
                                cursor: pointer;
                                font-size: 13px;
                                font-weight: 500;
                                transition: all 0.3s ease;
                            " onmouseover="this.style.background='#FF5500'; this.style.color='white';" 
                               onmouseout="this.style.background='transparent'; this.style.color='#FF5500';">
                                Logout
                            </button>
                        </div>
                    ` : `
                        <a href="/login.html" style="
                            padding: 8px 20px;
                            background: #FF5500;
                            color: white;
                            text-decoration: none;
                            border-radius: 6px;
                            font-size: 13px;
                            font-weight: 600;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.background='#d64d2d';" 
                           onmouseout="this.style.background='#FF5500';">
                            Login
                        </a>
                    `}
                    
                    <!-- Powered by ScaleTeam6 -->
                    <div style="
                        margin-left: 30px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 8px 16px;
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 25px;
                        border: 1px solid rgba(255, 85, 0, 0.3);
                    ">
                        <span style="
                            color: #999;
                            font-size: 12px;
                            font-weight: 500;
                            letter-spacing: 0.5px;
                        ">powered by</span>
                        <img src="/scaleteam6_logo.png" alt="ScaleTeam6" style="
                            height: 24px;
                            width: auto;
                            object-fit: contain;
                        ">
                    </div>
                </div>
            </div>
            
            <!-- Quick Stats Bar -->
            ${sessionId && !isGuest ? `
                <div style="
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid #333;
                    display: flex;
                    gap: 30px;
                    font-size: 12px;
                ">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: #666;">Overall Progress:</span>
                        <span style="color: #FF5500; font-weight: 600;">73%</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: #666;">Completed Blocks:</span>
                        <span style="color: #4CAF50; font-weight: 600;">8/16</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: #666;">Active Phase:</span>
                        <span style="color: #FF9800; font-weight: 600;">Go-To Market</span>
                    </div>
                </div>
            ` : ''}
        </nav>
        
        <!-- Spacer to push content below fixed nav -->
        <div style="height: ${sessionId && !isGuest ? '140px' : '120px'};"></div>
    `;
    
    // Insert navigation at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // Add hover effects to nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        if (!link.classList.contains('active')) {
            link.addEventListener('mouseenter', () => {
                link.style.color = '#FF5500';
            });
            link.addEventListener('mouseleave', () => {
                link.style.color = '#ccc';
            });
        }
    });
}

// Global functions
function logout() {
    localStorage.clear();
    window.location.href = '/login.html';
}

function showAnalytics() {
    // Check if user is logged in
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
        alert('Please login to view analytics');
        window.location.href = '/login.html';
        return;
    }
    
    // In a real app, this would navigate to an analytics page
    alert('Analytics Dashboard - Coming Soon!\n\nThis will show:\n• Progress trends\n• Time spent per block\n• Completion predictions\n• Comparative benchmarks');
}

function showHelp() {
    alert('ScaleOps6 Help\n\n' +
          '📊 Dashboard: View and assess all 16 blocks\n' +
          '📝 Blocks: Click any block to see details\n' +
          '✅ Assessments: Complete questionnaires to update scores\n' +
          '👤 Admin: Manage users and view platform analytics\n' +
          '📈 Analytics: Track your progress over time\n\n' +
          'Need more help? Contact support@st6.com');
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createNavigation);
} else {
    createNavigation();
}