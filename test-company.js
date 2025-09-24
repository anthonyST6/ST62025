// Test Company Data System
// This creates a dynamic test company with realistic GTM data that persists changes

const testCompany = {
    id: 'st6co-001',
    name: 'ST6Co',
    industry: 'B2B SaaS - GTM Platform',
    stage: 'Seed',
    founded: '2024',
    employees: 12,
    revenue: '$850K ARR',
    
    // Company profile for context - Meta experiment: ST6Co building ScaleOpsProduct
    profile: {
        mission: 'Empowering startups to systematically build and scale their go-to-market operations through the ScaleOps6 platform',
        targetMarket: 'Early-stage B2B SaaS founders (Seed to Series A, 10-50 employees)',
        productStage: 'Early Product-Market Fit',
        fundingRaised: '$1.5M',
        product: 'ScaleOpsProduct - GTM Maturity Assessment & Improvement Platform',
        keyMetrics: {
            customers: 47,
            nps: 68,
            monthlyGrowth: '22%',
            churnRate: '4.8%',
            cac: '$1,200',
            ltv: '$18,000'
        }
    },
    
    // Dynamic block scores based on company stage
    blockScores: {
        1: { score: 85, trend: 'down', lastChange: '2025-09-17' },    // Mission Discovery (impacted by dependency)
        2: { score: 82, trend: 'stable', lastChange: '2025-09-10' }, // Customer Insights
        3: { score: 75, trend: 'up', lastChange: '2025-09-08' },    // Strategic Prioritization
        4: { score: 91, trend: 'up', lastChange: '2025-08-30' },    // Prototype Launch
        5: { score: 88, trend: 'stable', lastChange: '2025-09-01' }, // Early Adopter Wins
        6: { score: 79, trend: 'up', lastChange: '2025-09-12' },    // Customer Engagement
        7: { score: 73, trend: 'up', lastChange: '2025-09-09' },    // Quantifiable Impact
        8: { score: 76, trend: 'stable', lastChange: '2025-09-02' }, // Customer Success
        9: { score: 68, trend: 'up', lastChange: '2025-09-16' },    // Proof Execution
        10: { score: 62, trend: 'up', lastChange: '2025-09-14' },   // Sales Team
        11: { score: 58, trend: 'stable', lastChange: '2025-09-10' }, // High Performance Teams
        12: { score: 55, trend: 'down', lastChange: '2025-09-11' },  // Retention Systems
        13: { score: 42, trend: 'stable', lastChange: '2025-09-05' }, // Market Domination
        14: { score: 38, trend: 'up', lastChange: '2025-09-08' },    // Operational Infrastructure
        15: { score: 35, trend: 'stable', lastChange: '2025-09-01' }, // Leadership Expansion
        16: { score: 28, trend: 'stable', lastChange: '2025-08-25' }  // Global Expansion
    },
    
    // Historical changes for each block - now includes initial baseline
    changeHistory: {
        1: [
            {
                date: '2025-09-15',
                event: 'GTM Framework Refinement',
                eventType: 'improvement',
                previousScore: 82,
                newScore: 87,
                weaknesses: ['Unclear value proposition for Series A startups', 'Mission not aligned with platform capabilities'],
                actions: ['Conducted founder interviews', 'Refined GTM methodology based on customer feedback'],
                improvement: 5
            },
            {
                date: '2025-09-10',
                event: 'Customer Journey Mapping',
                eventType: 'improvement',
                previousScore: 80,
                newScore: 82,
                weaknesses: ['Incomplete understanding of customer pain points', 'No documented customer journey'],
                actions: ['Created detailed customer journey maps', 'Identified key friction points in onboarding'],
                improvement: 2
            },
            {
                date: '2025-09-03',
                event: 'Strategic Vision Update',
                eventType: 'improvement',
                previousScore: 78,
                newScore: 80,
                weaknesses: ['Limited market understanding', 'Founding team skill gaps'],
                actions: ['Hired industry advisor', 'Completed market research study'],
                improvement: 2
            },
            {
                date: '2025-08-28',
                event: 'Market Validation Sprint',
                eventType: 'improvement',
                previousScore: 75,
                newScore: 78,
                weaknesses: ['Unvalidated market assumptions', 'No competitive analysis'],
                actions: ['Interviewed 30 potential customers', 'Completed competitive landscape analysis'],
                improvement: 3
            },
            {
                date: '2025-08-20',
                event: 'Initial Problem Discovery',
                eventType: 'improvement',
                previousScore: 70,
                newScore: 75,
                weaknesses: ['Vague problem definition', 'No customer research'],
                actions: ['Defined initial problem hypothesis', 'Started customer discovery interviews'],
                improvement: 5
            },
            {
                date: '2025-08-01',
                event: 'Initial ScaleOps6 Self-Assessment',
                eventType: 'baseline',
                previousScore: 0,
                newScore: 70,
                weaknesses: ['No systematic GTM framework', 'Undefined ICP for platform', 'Limited founder validation'],
                actions: ['Used own ScaleOps6 methodology', 'Identified GTM maturity gaps'],
                improvement: 70
            },
            {
                date: '2025-09-17',
                event: 'Platform Adoption Challenges',
                eventType: 'dependency',
                previousScore: 87,
                newScore: 85,
                weaknesses: ['Early customer churn affecting product-market fit', 'Platform complexity impacting adoption'],
                actions: ['Simplified onboarding process', 'Adjusted platform positioning'],
                improvement: -2,
                dependencyNote: 'Impacted by Customer Success challenges in Block 12'
            }
        ],
        2: [
            {
                date: '2025-09-10',
                event: 'Customer Research Sprint',
                previousScore: 78,
                newScore: 82,
                weaknesses: ['Insufficient customer interviews', 'No systematic feedback collection'],
                actions: ['Interviewed 50+ customers', 'Implemented monthly NPS surveys'],
                improvement: 4
            },
            {
                date: '2025-08-15',
                event: 'Persona Development',
                previousScore: 71,
                newScore: 78,
                weaknesses: ['Generic buyer personas', 'Missing user journey maps'],
                actions: ['Created detailed ICPs', 'Mapped complete customer journeys'],
                improvement: 7
            }
        ],
        3: [
            {
                date: '2025-09-08',
                event: 'Q3 Planning Session',
                previousScore: 70,
                newScore: 75,
                weaknesses: ['Too many parallel initiatives', 'Resource allocation issues'],
                actions: ['Implemented OKR framework', 'Killed 3 low-impact projects'],
                improvement: 5
            }
        ],
        4: [
            {
                date: '2025-08-30',
                event: 'MVP Launch Success',
                previousScore: 85,
                newScore: 91,
                weaknesses: ['Delayed launch timeline', 'Limited beta testing'],
                actions: ['Accelerated development sprint', 'Expanded beta program to 100 users'],
                improvement: 6
            }
        ],
        5: [
            {
                date: '2025-09-01',
                event: 'Enterprise Customer Win',
                previousScore: 83,
                newScore: 88,
                weaknesses: ['Lack of enterprise references', 'No case studies'],
                actions: ['Closed 3 enterprise deals', 'Published 5 customer success stories'],
                improvement: 5
            }
        ],
        6: [
            {
                date: '2025-09-12',
                event: 'Engagement Optimization',
                previousScore: 72,
                newScore: 79,
                weaknesses: ['Low daily active users', 'Poor onboarding completion'],
                actions: ['Redesigned onboarding flow', 'Added in-app guidance'],
                improvement: 7
            }
        ],
        7: [
            {
                date: '2025-09-09',
                event: 'ROI Documentation',
                previousScore: 68,
                newScore: 73,
                weaknesses: ['No quantified customer value', 'Missing ROI calculator'],
                actions: ['Built ROI calculator tool', 'Documented $2M+ customer savings'],
                improvement: 5
            }
        ],
        8: [
            {
                date: '2025-09-02',
                event: 'Success Team Expansion',
                previousScore: 71,
                newScore: 76,
                weaknesses: ['Reactive customer support', 'No success playbooks'],
                actions: ['Hired 2 CSMs', 'Created customer success playbooks'],
                improvement: 5
            }
        ],
        9: [
            {
                date: '2025-09-16',
                event: 'Sales Process Implementation',
                previousScore: 61,
                newScore: 68,
                weaknesses: ['No defined sales process', 'Inconsistent messaging'],
                actions: ['Implemented MEDDIC methodology', 'Created sales battlecards'],
                improvement: 7
            }
        ],
        10: [
            {
                date: '2025-09-14',
                event: 'Sales Enablement Launch',
                previousScore: 55,
                newScore: 62,
                weaknesses: ['No sales training program', 'Limited sales tools'],
                actions: ['Launched sales bootcamp', 'Deployed CRM system'],
                improvement: 7
            }
        ],
        11: [
            {
                date: '2025-09-10',
                event: 'Team Structure Review',
                previousScore: 54,
                newScore: 58,
                weaknesses: ['Unclear roles and responsibilities', 'No performance metrics'],
                actions: ['Defined RACI matrix', 'Implemented quarterly reviews'],
                improvement: 4
            }
        ],
        12: [
            {
                date: '2025-09-11',
                event: 'Churn Analysis',
                eventType: 'dependency',
                previousScore: 58,
                newScore: 55,
                weaknesses: ['Rising churn rate', 'No retention programs'],
                actions: ['Launched customer health scoring', 'Started win-back campaign'],
                improvement: -3,
                dependencyNote: 'Impacted by Customer Success challenges'
            }
        ],
        13: [
            {
                date: '2025-09-05',
                event: 'Competitive Analysis',
                previousScore: 40,
                newScore: 42,
                weaknesses: ['Limited market differentiation', 'No competitive intelligence'],
                actions: ['Conducted competitor analysis', 'Defined unique value props'],
                improvement: 2
            }
        ],
        14: [
            {
                date: '2025-09-08',
                event: 'Systems Audit',
                previousScore: 34,
                newScore: 38,
                weaknesses: ['Manual processes', 'No integrated systems'],
                actions: ['Mapped key processes', 'Started automation initiative'],
                improvement: 4
            }
        ],
        15: [
            {
                date: '2025-09-01',
                event: 'Leadership Planning',
                previousScore: 32,
                newScore: 35,
                weaknesses: ['Leadership gaps', 'No succession planning'],
                actions: ['Identified key hires needed', 'Started exec search'],
                improvement: 3
            }
        ],
        16: [
            {
                date: '2025-08-25',
                event: 'International Research',
                previousScore: 25,
                newScore: 28,
                weaknesses: ['No international presence', 'Limited market knowledge'],
                actions: ['Researched EU market entry', 'Attended global conference'],
                improvement: 3
            }
        ]
    },
    
    // Generate dynamic score history with logical progression
    generateScoreHistory(blockId, days = 30) {
        const history = [];
        const currentScore = this.blockScores[blockId].score;
        const changes = this.changeHistory[blockId] || [];
        const now = new Date();
        
        // Sort changes by date (oldest first)
        const sortedChanges = [...changes].sort((a, b) => 
            new Date(a.date) - new Date(b.date)
        );
        
        // Calculate the date range
        const startDate = new Date(now);
        startDate.setDate(startDate.getDate() - days);
        
        // Filter changes within the date range
        const relevantChanges = sortedChanges.filter(change => {
            const changeDate = new Date(change.date);
            return changeDate >= startDate && changeDate <= now;
        });
        
        // If we have a baseline assessment, use it as the starting point
        const baselineEvent = sortedChanges.find(c => c.eventType === 'baseline');
        let runningScore = baselineEvent ? baselineEvent.previousScore : 
                          (relevantChanges.length > 0 ? relevantChanges[0].previousScore : currentScore - 10);
        
        // Generate history points
        for (let i = days; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            // Check if there's a change event for this day
            const changeEvent = relevantChanges.find(c => {
                const changeDate = new Date(c.date);
                const daysDiff = Math.floor((date - changeDate) / (1000 * 60 * 60 * 24));
                return Math.abs(daysDiff) === 0;
            });
            
            // Update running score if there's a change
            if (changeEvent) {
                runningScore = changeEvent.newScore;
            }
            
            history.push({
                date: dateStr,
                score: runningScore,
                hasChange: !!changeEvent,
                changeEvent: changeEvent || null
            });
        }
        
        // Ensure the last point matches the current score
        if (history.length > 0) {
            history[history.length - 1].score = currentScore;
        }
        
        return history;
    },
    
    // Update score with logging
    updateBlockScore(blockId, newScore, event = null) {
        const oldScore = this.blockScores[blockId].score;
        this.blockScores[blockId].score = newScore;
        this.blockScores[blockId].lastChange = new Date().toISOString().split('T')[0];
        
        if (event) {
            // Add to change history
            if (!this.changeHistory[blockId]) {
                this.changeHistory[blockId] = [];
            }
            
            this.changeHistory[blockId].unshift({
                date: new Date().toISOString().split('T')[0],
                event: event.title,
                eventType: event.eventType || 'improvement',
                previousScore: oldScore,
                newScore: newScore,
                weaknesses: event.weaknesses || [],
                actions: event.actions || [],
                improvement: newScore - oldScore,
                dependencyNote: event.dependencyNote || null
            });
        }
        
        return {
            success: true,
            blockId,
            oldScore,
            newScore,
            change: newScore - oldScore
        };
    }
};

module.exports = { testCompany };