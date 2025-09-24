# ScaleOps6 Multi-Tenant Platform Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm 8+
- PostgreSQL 14+
- Redis (optional, for caching)
- AWS Account (optional, for S3 storage)

### 1. Clone and Install Dependencies
```bash
# Clone the repository
git clone <repository-url>
cd scaleops6-platform

# Install dependencies
npm install
```

### 2. Setup PostgreSQL Database
```bash
# Create database
createdb scaleops6

# Or using psql
psql -U postgres -c "CREATE DATABASE scaleops6;"
```

### 3. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your configuration
# At minimum, set:
# - DATABASE_URL or DB_* variables
# - JWT_SECRET and JWT_REFRESH_SECRET (generate secure random strings)
# - ADMIN_PASSWORD (for initial admin user)
```

### 4. Run Database Migration
```bash
# Run migration to create schema and default data
npm run db:migrate

# Check migration status
npm run db:migrate status

# If needed, rollback (WARNING: deletes all data)
# CONFIRM_ROLLBACK=yes npm run db:migrate rollback
```

### 5. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 📝 Default Credentials

After migration, the following accounts are created:

### Admin Account
- Email: `admin@scaleops6.com`
- Password: `Admin123!` (or value from ADMIN_PASSWORD env var)
- Role: Super Admin

### Demo Organization: ST6Co
Demo users (all with password `Demo123!`):
- `john.doe@st6co.com` - Admin role
- `jane.smith@st6co.com` - Editor role
- `bob.wilson@st6co.com` - Viewer role

## 🔑 API Authentication

### Register New Organization
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe",
    "organizationName": "My Company",
    "organizationSlug": "my-company",
    "acceptTerms": true
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@scaleops6.com",
    "password": "Admin123!",
    "organizationSlug": "st6co"
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "organization": { ... },
    "tokens": {
      "accessToken": "eyJ...",
      "refreshToken": "eyJ..."
    }
  }
}
```

### Using the Access Token
Include the access token in the Authorization header:
```bash
curl http://localhost:3000/api/blocks \
  -H "Authorization: Bearer eyJ..."
```

### Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJ..."
  }'
```

## 🏗️ Architecture Overview

### Multi-Tenant Isolation
- **Row-Level Security (RLS)**: Automatic data filtering at database level
- **Organization Context**: Set on each request via JWT claims
- **Tenant Validation**: Middleware ensures proper organization membership

### Data Persistence
- **Worksheets**: Full version history with parent-child relationships
- **Analyses**: All AI analyses permanently stored
- **Reports**: Generated reports saved with S3 integration
- **Documents**: Secure file storage per organization
- **Audit Trail**: Complete activity logging for compliance

### Security Features
- **JWT Authentication**: Access tokens (15min) + Refresh tokens (7d)
- **Password Security**: Bcrypt hashing, complexity requirements
- **Rate Limiting**: Protection against brute force attacks
- **Session Management**: Track and revoke active sessions
- **Account Lockout**: After 5 failed login attempts

## 📁 Project Structure
```
scaleops6-platform/
├── src/
│   ├── auth/                 # Authentication services
│   │   ├── auth.service.js   # User registration, login, etc.
│   │   └── jwt.service.js    # JWT token management
│   ├── database/             # Database layer
│   │   ├── postgres.js       # PostgreSQL connection & helpers
│   │   ├── schema.sql        # Database schema
│   │   └── migrate.js        # Migration script
│   ├── middleware/           # Express middleware
│   │   └── auth.middleware.js # Authentication & authorization
│   ├── routes/               # API routes
│   │   └── auth.routes.js    # Authentication endpoints
│   └── services/             # Business logic services
│       └── email.service.js  # Email notifications
├── .env.example              # Environment variables template
├── package.json              # Dependencies
└── server.js                 # Main application entry
```

## 🔧 Configuration Options

### Database Connection
```env
# Option 1: Connection string
DATABASE_URL=postgresql://user:pass@localhost:5432/scaleops6

# Option 2: Individual settings
DB_HOST=localhost
DB_PORT=5432
DB_NAME=scaleops6
DB_USER=scaleops6_user
DB_PASSWORD=your_password
DB_SSL=false
```

### JWT Configuration
```env
JWT_SECRET=generate_a_secure_random_string_here
JWT_REFRESH_SECRET=generate_another_secure_random_string
JWT_EXPIRES_IN=15m        # Access token expiry
JWT_REFRESH_EXPIRES_IN=7d # Refresh token expiry
```

### Email Configuration (Optional)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=noreply@scaleops6.com
```

### AWS S3 Configuration (Optional)
```env
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
S3_BUCKET_NAME=scaleops6-storage
```

## 🧪 Testing

### Check Database Connection
```bash
curl http://localhost:3000/api/health
```

### Test Authentication Flow
```bash
# 1. Register new user
# 2. Check email for verification (or check logs in dev)
# 3. Login with credentials
# 4. Use access token for API calls
# 5. Refresh token when expired
```

### Verify Multi-Tenant Isolation
1. Create two organizations with different users
2. Create data in each organization
3. Verify users can only see their organization's data

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Test PostgreSQL connection
psql -U postgres -d scaleops6 -c "SELECT version();"

# Check if tables exist
psql -U postgres -d scaleops6 -c "\dt"
```

### Migration Issues
```bash
# Check migration status
npm run db:migrate status

# View migration logs
tail -f logs/combined.log

# Reset and retry (WARNING: deletes all data)
CONFIRM_ROLLBACK=yes npm run db:migrate rollback
npm run db:migrate
```

### Authentication Issues
- Verify JWT_SECRET is set in .env
- Check token expiry times
- Ensure clock sync between client and server
- Check rate limiting if getting 429 errors

## 📊 Monitoring

### Database Metrics
- Connection pool usage
- Query performance
- Table sizes
- Active sessions

### Application Metrics
- API response times
- Error rates by endpoint
- Active users
- Storage usage per organization

### Security Metrics
- Failed login attempts
- Rate limit violations
- Session anomalies
- Audit log analysis

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never commit .env file
   - Use strong, unique secrets
   - Rotate secrets regularly

2. **Database Security**
   - Use SSL connections in production
   - Implement backup encryption
   - Regular security updates

3. **API Security**
   - Always use HTTPS in production
   - Implement CORS properly
   - Add request validation
   - Monitor for anomalies

4. **Data Protection**
   - Encrypt sensitive data at rest
   - Implement data retention policies
   - Regular security audits
   - GDPR compliance measures

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Node.js Security Checklist](https://github.com/goldbergyoni/nodebestpractices#6-security-best-practices)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review logs in `logs/` directory
3. Check migration status with `npm run db:migrate status`
4. Contact support with error logs and environment details

## 📄 License

Copyright © 2024 ScaleOps6. All rights reserved.