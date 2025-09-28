# ScaleOps6 Platform - Complete HTML Page Inventory

## Application Structure Overview
The ScaleOps6 platform contains **122 HTML files** organized in a hierarchical structure with the following categories:

---

## 1. MAIN NAVIGATION PAGES (4 files)

### 1.1 index.html
- **Purpose**: Main dashboard/landing page
- **Links to**:
  - All 5 phase pages (phase-1 through phase-5)
  - Block detail pages via JavaScript navigation (`block-detail.html?id=X`)
  - Login page (via nav.js)
  - Admin page (via nav.js)

### 1.2 login.html  
- **Purpose**: User authentication
- **Links to**:
  - index.html (after successful login)
  - Guest access to index.html

### 1.3 admin.html
- **Purpose**: Administrative dashboard
- **Links to**:
  - index.html (Dashboard)
  - login.html (logout)

### 1.4 block-detail.html
- **Purpose**: Dynamic block detail viewer
- **Links to**:
  - index.html (back navigation)
  - Subcomponent detail pages (`subcomponent-detail.html?id=X`)
  - Phase pages (dynamically based on block)

---

## 2. PHASE PAGES (5 files)

### 2.1 phase-1-idea-market-fit.html
- **Links to**:
  - index.html (back button)
  - block-detail.html?id=1 (Block 1: Mission Discovery)
  - block-detail.html?id=2 (Block 2: Customer Insights)
  - block-detail.html?id=3 (Block 3: Strategic Prioritization)
  - block-detail.html?id=4 (Block 4: Prototype Launch)

### 2.2 phase-2-product-market-fit.html
- **Links to**:
  - index.html (back button)
  - block-detail.html?id=5 (Block 5: Early Adopter Wins)
  - block-detail.html?id=6 (Block 6: Customer Engagement Flywheel)
  - block-detail.html?id=7 (Block 7: Quantifiable Impact)
  - block-detail.html?id=8 (Block 8: Customer Success Expansion)

### 2.3 phase-3-go-to-market.html
- **Links to**:
  - index.html (back button)
  - block-detail.html?id=9 (Block 9: Proof Execution)
  - block-detail.html?id=10 (Block 10: Sales Team Empowerment)
  - block-detail.html?id=11 (Block 11: High Performance Teams)
  - block-detail.html?id=12 (Block 12: Retention Systems)

### 2.4 phase-4-scaling-impact.html
- **Links to**:
  - index.html (back button)
  - block-detail.html?id=13 (Block 13: Market Domination Strategies)

### 2.5 phase-5-scale.html
- **Links to**:
  - index.html (back button)
  - block-detail.html?id=14 (Block 14: Operational Infrastructure)
  - block-detail.html?id=15 (Block 15: Leadership Expansion)
  - block-detail.html?id=16 (Block 16: Global & Expansion Opportunities)

---

## 3. BLOCK DETAIL PAGES (16 files)

Each block page contains navigation to:
- index.html (Dashboard)
- Its 6 subcomponent pages (A through F)

### Phase 1 Blocks:
- **block-1-mission-discovery.html** → Links to subcomponents 1A-1F
- **block-2-customer-insights.html** → Links to subcomponents 2A-2F  
- **block-3-strategic-prioritization.html** → Links to subcomponents 3A-3F
- **block-4-prototype-launch.html** → Links to subcomponents 4A-4F

### Phase 2 Blocks:
- **block-5-early-adopter-wins.html** → Links to subcomponents 5A-5F
- **block-6-customer-engagement-flywheel.html** → Links to subcomponents 6A-6F
- **block-7-quantifiable-impact.html** → Links to subcomponents 7A-7F
- **block-8-customer-success-expansion.html** → Links to subcomponents 8A-8F

### Phase 3 Blocks:
- **block-9-proof-execution.html** → Links to subcomponents 9A-9F
- **block-10-sales-team-empowerment.html** → Links to subcomponents 10A-10F
- **block-11-high-performance-teams.html** → Links to subcomponents 11A-11F
- **block-12-retention-systems.html** → Links to subcomponents 12A-12F

### Phase 4 Block:
- **block-13-market-domination-strategies.html** → Links to subcomponents 13A-13F

### Phase 5 Blocks:
- **block-14-operational-infrastructure.html** → Links to subcomponents 14A-14F
- **block-15-leadership-expansion.html** → Links to subcomponents 15A-15F
- **block-16-global-expansion-opportunities.html** → Links to subcomponents 16A-16F

---

## 4. SUBCOMPONENT PAGES (96 files)

Each subcomponent page contains:
- Breadcrumb navigation to index.html
- Link back to parent block page
- Worksheet functionality (no outbound links)

### Complete Subcomponent List:

#### Block 1 - Mission Discovery:
- subcomponent-1a-problem-statement.html
- subcomponent-1b-mission-statement.html
- subcomponent-1c-voice-of-customer.html
- subcomponent-1d-team-assessment.html
- subcomponent-1e-market-landscape.html
- subcomponent-1f-launch-readiness.html

#### Block 2 - Customer Insights:
- subcomponent-2a-interview-cadence.html
- subcomponent-2b-persona-development.html
- subcomponent-2c-pain-point-analysis.html
- subcomponent-2d-jobs-to-be-done.html
- subcomponent-2e-demand-signals.html
- subcomponent-2f-insight-loop.html

#### Block 3 - Strategic Prioritization:
- subcomponent-3a-use-case-prioritization.html
- subcomponent-3b-segment-tiering.html
- subcomponent-3c-prioritization-framework.html
- subcomponent-3d-strategic-tradeoffs.html
- subcomponent-3e-hypothesis-testing.html
- subcomponent-3f-decision-archive.html

#### Block 4 - Prototype Launch:
- subcomponent-4a-feature-matrix.html
- subcomponent-4b-technical-scope.html
- subcomponent-4c-pilot-group-selection.html
- subcomponent-4d-qa-standards.html
- subcomponent-4e-timeline-planning.html
- subcomponent-4f-post-mortem-analysis.html

#### Block 5 - Early Adopter Wins:
- subcomponent-5a-early-win-documentation.html
- subcomponent-5b-roi-calculation.html
- subcomponent-5c-use-case-success.html
- subcomponent-5d-testimonial-collection.html
- subcomponent-5e-win-criteria-mapping.html
- subcomponent-5f-deal-debrief.html

#### Block 6 - Customer Engagement Flywheel:
- subcomponent-6a-usage-analytics.html
- subcomponent-6b-milestone-tracking.html
- subcomponent-6c-cs-dashboard-design.html
- subcomponent-6d-customer-activation.html
- subcomponent-6e-feedback-collection.html
- subcomponent-6f-power-user-development.html

#### Block 7 - Quantifiable Impact:
- subcomponent-7a-time-cost-savings.html
- subcomponent-7b-revenue-impact.html
- subcomponent-7c-productivity-measurement.html
- subcomponent-7d-retention-analysis.html
- subcomponent-7e-system-consolidation.html
- subcomponent-7f-friction-analysis.html

#### Block 8 - Customer Success Expansion:
- subcomponent-8a-upsell-strategy.html
- subcomponent-8b-team-expansion-tracking.html
- subcomponent-8c-organic-growth-analysis.html
- subcomponent-8d-champion-development.html
- subcomponent-8e-sentiment-tracking.html
- subcomponent-8f-renewal-readiness.html

#### Block 9 - Proof Execution:
- subcomponent-9a-inbound-conversion.html
- subcomponent-9b-outbound-performance.html
- subcomponent-9c-channel-economics.html
- subcomponent-9d-discovery-call-excellence.html
- subcomponent-9e-demo-optimization.html
- subcomponent-9f-founder-sales-analysis.html

#### Block 10 - Sales Team Empowerment:
- subcomponent-10a-sales-enablement-assets.html
- subcomponent-10b-rep-onboarding-ramp.html
- subcomponent-10c-win-loss-analysis.html
- subcomponent-10d-objection-handling.html
- subcomponent-10e-icp-definition.html
- subcomponent-10f-sales-call-library.html

#### Block 11 - High Performance Teams:
- subcomponent-11a-performance-scorecard.html
- subcomponent-11b-quota-structure.html
- subcomponent-11c-deal-review-process.html
- subcomponent-11d-forecast-accuracy.html
- subcomponent-11e-sales-coaching-program.html
- subcomponent-11f-talent-gap-analysis.html

#### Block 12 - Retention Systems:
- subcomponent-12a-customer-onboarding.html
- subcomponent-12b-activation-tracking.html
- subcomponent-12c-success-playbook-development.html
- subcomponent-12d-escalation-management.html
- subcomponent-12e-renewal-pipeline-management.html
- subcomponent-12f-churn-analysis.html

#### Block 13 - Market Domination Strategies:
- subcomponent-13a-category-creation.html
- subcomponent-13b-competitive-moat.html
- subcomponent-13c-ecosystem-strategy.html
- subcomponent-13d-competitive-intelligence.html
- subcomponent-13e-brand-strategy.html
- subcomponent-13f-defensive-strategy.html

#### Block 14 - Operational Infrastructure:
- subcomponent-14a-system-architecture.html
- subcomponent-14b-revenue-operations.html
- subcomponent-14c-dashboard-design.html
- subcomponent-14d-tool-stack-optimization.html
- subcomponent-14e-revops-playbook.html
- subcomponent-14f-sla-management.html

#### Block 15 - Leadership Expansion:
- subcomponent-15a-executive-hiring.html
- subcomponent-15b-succession-planning.html
- subcomponent-15c-executive-cadence.html
- subcomponent-15d-culture-health-assessment.html
- subcomponent-15e-organizational-design.html
- subcomponent-15f-dei-integration.html

#### Block 16 - Global & Expansion Opportunities:
- subcomponent-16a-market-entry-analysis.html
- subcomponent-16b-localization-strategy.html
- subcomponent-16c-international-pricing.html
- subcomponent-16d-compliance-management.html
- subcomponent-16e-geographic-gtm-strategy.html
- subcomponent-16f-expansion-risk-assessment.html

---

## 5. UTILITY & TESTING PAGES (1 file)

### test-mission-discovery-worksheets.html
- **Purpose**: Testing interface for Block 1 subcomponents
- **Links to**:
  - subcomponent-1a-problem-statement.html
  - subcomponent-1b-mission-statement.html
  - subcomponent-1c-voice-of-customer.html
  - subcomponent-1d-team-assessment.html
  - subcomponent-1e-market-landscape.html
  - subcomponent-1f-launch-readiness.html

---

## NAVIGATION HIERARCHY

```
index.html (Main Dashboard)
├── Phase Pages (5)
│   ├── phase-1-idea-market-fit.html
│   ├── phase-2-product-market-fit.html
│   ├── phase-3-go-to-market.html
│   ├── phase-4-scaling-impact.html
│   └── phase-5-scale.html
│
├── Block Detail Pages (via block-detail.html?id=X)
│   └── 16 blocks total (dynamically loaded)
│
├── Block Static Pages (16)
│   ├── block-1-mission-discovery.html
│   ├── block-2-customer-insights.html
│   └── ... (14 more blocks)
│
├── Subcomponent Pages (96)
│   ├── Block 1 Subcomponents (6)
│   ├── Block 2 Subcomponents (6)
│   └── ... (90 more subcomponents)
│
├── Admin Section
│   └── admin.html
│
└── Authentication
    └── login.html
```

---

## KEY NAVIGATION PATTERNS

1. **Hierarchical Navigation**: 
   - Dashboard → Phase → Block → Subcomponent

2. **Breadcrumb Navigation**:
   - All pages include breadcrumb links back to parent levels

3. **Dynamic Routing**:
   - block-detail.html uses query parameters (?id=X)
   - subcomponent-detail.html uses query parameters (?id=X-Y)

4. **Global Navigation** (via nav.js):
   - Present on all pages
   - Links to Dashboard, Analytics, Settings

5. **Session-Based Access**:
   - Login required for full access
   - Guest mode available with limited features

---

## DUPLICATE/REDUNDANT FILES

The application contains both:
- Dynamic pages (block-detail.html with query params)
- Static pages (individual block-X-name.html files)

This provides flexibility but creates some redundancy in the structure.

---

## TOTAL FILE COUNT

- **Main Pages**: 4
- **Phase Pages**: 5
- **Block Pages**: 16
- **Subcomponent Pages**: 96
- **Test/Utility Pages**: 1
- **TOTAL HTML FILES**: 122

---

## SERVER ROUTING

The Express server (server.js) handles:
- Static file serving for all HTML pages
- API endpoints for dynamic data
- Session management
- File uploads for worksheets
- AI agent integration

Key routes:
- `/` → index.html
- `/login.html` → login.html
- `/admin.html` → admin.html
- `/block-detail.html` → block-detail.html
- `/subcomponent-*.html` → Individual subcomponent pages
- `/api/*` → Backend API endpoints