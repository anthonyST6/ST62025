# ScaleOps6 GTM Readiness Platform

A comprehensive Go-To-Market (GTM) readiness assessment and optimization platform for B2B SaaS startups. This platform provides AI-powered analysis, actionable recommendations, and structured frameworks to help startups build and execute effective GTM strategies.

## 🚀 Features

### Core Capabilities
- **16 GTM Building Blocks** across 5 phases of growth
- **96 Subcomponents** with specialized analysis agents
- **AI-Powered Analysis** with contextual recommendations
- **Real-time Scoring** with historical tracking
- **Actionable Recommendations** with quantified impact scores

### Key Components

#### Phase 1: Idea Market Fit
- Mission Discovery
- Customer Insights  
- Strategic Prioritization
- Prototype Launch

#### Phase 2: Product Market Fit
- Early Adopter Wins
- Customer Engagement Flywheel
- Quantifiable Impact
- Customer Success Expansion

#### Phase 3: Go-To-Market
- Proof Execution
- Sales Team Empowerment
- High Performance Teams
- Retention Systems

#### Phase 4: Scaling Impact
- Market Domination Strategies
- Operational Infrastructure

#### Phase 5: Scale
- Leadership Expansion
- Global Expansion Opportunities

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **AI Agents**: Custom GTM analysis engines
- **Authentication**: Multi-tenant support with user isolation

## 📦 Installation

### Prerequisites
- Node.js 14+ 
- npm or yarn
- Git

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/scaleops6-platform.git
cd scaleops6-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Initialize the database:
```bash
npm run setup-db
```

5. Start the development server:
```bash
npm start
```

The platform will be available at `http://localhost:3000`

## 🎯 Usage

### For Startups

1. **Assessment**: Complete worksheets for each GTM building block
2. **Analysis**: Receive AI-powered analysis with scores and recommendations
3. **Action**: Implement recommendations with quantified impact scores
4. **Track**: Monitor progress with historical score tracking

### For Administrators

1. Access admin panel at `/admin.html`
2. Manage users and organizations
3. View platform analytics
4. Configure AI agents and scoring algorithms

## 📊 Project Structure

```
scaleops6-platform/
├── server.js                 # Main server file
├── database.js              # Database management
├── scoring-engine.js        # Core scoring logic
├── agent-library.js         # AI agent definitions
├── recommendations-component.js  # Recommendation engine
├── phase-*.html            # Phase overview pages
├── block-*.html            # Block detail pages
├── subcomponent-*.html     # Subcomponent pages
├── *-agent-enhanced.js     # Enhanced AI agents
├── docs/                   # Documentation
└── logs/                   # Application logs
```

## 🔧 Configuration

### Environment Variables

```env
PORT=3000
NODE_ENV=development
DATABASE_PATH=./scaleops6.db
LOG_LEVEL=info
SESSION_SECRET=your-secret-key
```

### Database Schema

The platform uses SQLite with the following main tables:
- `users` - User accounts and authentication
- `organizations` - Company/organization data
- `scores` - Historical score tracking
- `worksheets` - Saved worksheet responses
- `recommendations` - Generated recommendations

## 🤖 AI Agents

Each GTM building block has specialized AI agents that:
- Analyze worksheet responses
- Score across multiple dimensions
- Generate contextual recommendations
- Provide actionable implementation steps
- Track improvement over time

### Agent Architecture

```javascript
class EnhancedAgent {
    analyzeWorksheet(data, subcomponentId)
    getDimensionsForSubcomponent(subcomponentId)
    evaluateDimensions(data, dimensions)
    generateRecommendations(dimensions)
    generateExecutiveSummary(score)
}
```

## 📈 Scoring System

- **0-30%**: Critical gaps requiring immediate attention
- **31-60%**: Significant improvements needed
- **61-80%**: Good foundation with optimization opportunities  
- **81-100%**: Excellent GTM readiness

Each dimension is weighted and scored independently, contributing to the overall block score.

## 🔐 Security

- Multi-tenant architecture with data isolation
- Session-based authentication
- Input validation and sanitization
- SQL injection prevention
- XSS protection

## 📝 API Documentation

### Core Endpoints

```
POST /api/analyze/:block
GET /api/subcomponents/:id
POST /api/subcomponents/:id/worksheet
GET /api/subcomponents/:id/history
POST /api/subcomponents/:id/score
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

For development testing:
```bash
npm run dev
```

## 🚢 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
docker build -t scaleops6-platform .
docker run -p 3000:3000 scaleops6-platform
```

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📞 Support

For support, email support@scaleops6.com or open an issue in the GitHub repository.

## 🏆 Acknowledgments

- Scale Team Six for the GTM framework
- All contributors and beta testers
- The B2B SaaS startup community

## 📊 Status

- ✅ Phase 1: Complete with all agents operational
- ✅ Phase 2: Complete with enhanced analysis
- 🚧 Phase 3: In development
- 📅 Phase 4: Planned
- 📅 Phase 5: Planned

---

**Built with ❤️ for B2B SaaS Startups**