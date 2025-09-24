# ScaleOps6 Platform Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Configuration](#database-configuration)
4. [Application Deployment](#application-deployment)
5. [Production Configuration](#production-configuration)
6. [Security Considerations](#security-considerations)
7. [Monitoring and Maintenance](#monitoring-and-maintenance)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements
- Node.js v14.0.0 or higher
- npm v6.0.0 or higher
- SQLite3
- Git
- SSL certificate (for HTTPS)
- Domain name (optional but recommended)

### Recommended Server Specifications
- **Minimum**: 2 CPU cores, 4GB RAM, 20GB storage
- **Recommended**: 4 CPU cores, 8GB RAM, 50GB storage
- **OS**: Ubuntu 20.04 LTS or similar

## Environment Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd scaleops6-platform
```

### 2. Install Dependencies

```bash
npm install --production
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Database
DATABASE_PATH=./data/scaleops6.db

# Security
SESSION_SECRET=your-strong-session-secret-here
JWT_SECRET=your-jwt-secret-here

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760

# Optional: SSL Configuration
SSL_CERT_PATH=/path/to/cert.pem
SSL_KEY_PATH=/path/to/key.pem

# Optional: Domain Configuration
DOMAIN=https://your-domain.com

# Optional: Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Optional: Analytics
GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

## Database Configuration

### 1. Initialize Database

```bash
# Create data directory
mkdir -p data

# Initialize database
npm run db:init
```

### 2. Database Backup Strategy

Create a backup script (`backup.sh`):

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/scaleops6"
DB_PATH="./data/scaleops6.db"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR
cp $DB_PATH "$BACKUP_DIR/scaleops6_$TIMESTAMP.db"

# Keep only last 30 days of backups
find $BACKUP_DIR -name "scaleops6_*.db" -mtime +30 -delete
```

### 3. Schedule Automatic Backups

```bash
# Add to crontab
crontab -e

# Add this line for daily backups at 2 AM
0 2 * * * /path/to/backup.sh
```

## Application Deployment

### Option 1: Direct Deployment with PM2

#### Install PM2

```bash
npm install -g pm2
```

#### Create PM2 Configuration

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'scaleops6',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    autorestart: true,
    watch: false
  }]
};
```

#### Start Application

```bash
# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

### Option 2: Docker Deployment

#### Create Dockerfile

```dockerfile
FROM node:14-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Create necessary directories
RUN mkdir -p data uploads logs

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "server.js"]
```

#### Create docker-compose.yml

```yaml
version: '3.8'

services:
  scaleops6:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
      - ./uploads:/app/uploads
      - ./logs:/app/logs
    environment:
      - NODE_ENV=production
      - DATABASE_PATH=/app/data/scaleops6.db
    restart: unless-stopped
```

#### Deploy with Docker

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## Production Configuration

### 1. Nginx Reverse Proxy

Install Nginx:

```bash
sudo apt update
sudo apt install nginx
```

Configure Nginx (`/etc/nginx/sites-available/scaleops6`):

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Proxy Configuration
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # File Upload Size
    client_max_body_size 10M;
    
    # Timeouts
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/scaleops6 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 2. SSL Certificate with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## Security Considerations

### 1. Firewall Configuration

```bash
# Install UFW
sudo apt install ufw

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2. Security Best Practices

1. **Environment Variables**
   - Never commit `.env` file to version control
   - Use strong, unique secrets
   - Rotate secrets regularly

2. **File Permissions**
   ```bash
   chmod 600 .env
   chmod 700 data/
   chmod 700 uploads/
   ```

3. **Rate Limiting**
   Add rate limiting to prevent abuse:
   ```javascript
   const rateLimit = require("express-rate-limit");
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

4. **Input Validation**
   - Sanitize all user inputs
   - Validate file uploads
   - Use parameterized queries

### 3. Authentication (Optional)

If adding authentication, consider:
- OAuth 2.0 integration
- Multi-factor authentication
- Session management
- Password policies

## Monitoring and Maintenance

### 1. Application Monitoring

#### PM2 Monitoring

```bash
# View status
pm2 status

# View logs
pm2 logs

# Monitor resources
pm2 monit
```

#### Health Check Endpoint

The platform includes a health check at `/api/health`:

```bash
curl http://localhost:3000/api/health
```

### 2. System Monitoring

Install monitoring tools:

```bash
# Install htop for process monitoring
sudo apt install htop

# Install netdata for comprehensive monitoring
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

### 3. Log Management

Configure log rotation (`/etc/logrotate.d/scaleops6`):

```
/path/to/scaleops6/logs/*.log {
    daily
    rotate 30
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}
```

### 4. Performance Optimization

1. **Enable Gzip Compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Static File Caching**
   ```nginx
   location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

3. **Database Optimization**
   ```bash
   # Vacuum database periodically
   sqlite3 data/scaleops6.db "VACUUM;"
   ```

## Troubleshooting

### Common Issues and Solutions

#### 1. Application Won't Start

```bash
# Check logs
pm2 logs

# Check port availability
sudo lsof -i :3000

# Verify dependencies
npm install
```

#### 2. Database Errors

```bash
# Check database integrity
sqlite3 data/scaleops6.db "PRAGMA integrity_check;"

# Restore from backup if needed
cp /var/backups/scaleops6/latest.db data/scaleops6.db
```

#### 3. File Upload Issues

```bash
# Check directory permissions
ls -la uploads/

# Check disk space
df -h

# Verify upload size limits in nginx and application
```

#### 4. Performance Issues

```bash
# Check CPU and memory
htop

# Check PM2 cluster status
pm2 status

# Review application logs for errors
pm2 logs --lines 100
```

### Debug Mode

For troubleshooting, run in debug mode:

```bash
NODE_ENV=development DEBUG=* node server.js
```

## Maintenance Tasks

### Weekly
- Review application logs
- Check disk space
- Monitor performance metrics

### Monthly
- Update dependencies (security patches)
- Review and rotate logs
- Test backup restoration

### Quarterly
- Full security audit
- Performance optimization review
- Update documentation

## Rollback Procedure

If issues occur after deployment:

1. **Stop current version**
   ```bash
   pm2 stop scaleops6
   ```

2. **Restore previous version**
   ```bash
   git checkout <previous-version-tag>
   npm install
   ```

3. **Restore database if needed**
   ```bash
   cp /var/backups/scaleops6/<timestamp>.db data/scaleops6.db
   ```

4. **Restart application**
   ```bash
   pm2 restart scaleops6
   ```

## Support and Resources

- **Documentation**: See USER_GUIDE.md
- **Issues**: Report via GitHub Issues
- **Updates**: Check CHANGELOG.md
- **Community**: Join discussion forums

## Conclusion

This deployment guide covers the essential steps to deploy ScaleOps6 to production. Adjust configurations based on your specific requirements and infrastructure.

Remember to:
- Test thoroughly in staging before production
- Keep backups current
- Monitor application health
- Apply security updates promptly

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Platform Version**: ScaleOps6 v1.0