# AWS EC2 Deployment Guide

This guide will walk you through deploying your personal portfolio website to an AWS EC2 Linux instance and configuring it to be accessible at profile.sarcasticrobo.com.

## Prerequisites

- AWS account with EC2 access
- Domain name configured (sarcasticrobo.com)
- SSH client installed on your local machine
- Basic knowledge of Linux command line

## Step 1: Set Up EC2 Instance

### 1.1 Launch EC2 Instance

1. Log in to AWS Console
2. Navigate to EC2 Dashboard
3. Click "Launch Instance"
4. Configure instance:
   - **Name**: portfolio-server
   - **AMI**: Ubuntu Server 22.04 LTS (or Amazon Linux 2023)
   - **Instance Type**: t2.micro (free tier eligible) or t3.small
   - **Key Pair**: Create new or use existing key pair (save the .pem file securely)
   - **Network Settings**:
     - Allow SSH (port 22) from your IP
     - Allow HTTP (port 80) from anywhere (0.0.0.0/0)
     - Allow HTTPS (port 443) from anywhere (0.0.0.0/0)
   - **Storage**: 8-20 GB (default is fine)
5. Launch the instance

### 1.2 Allocate Elastic IP (Recommended)

1. Go to EC2 → Elastic IPs
2. Click "Allocate Elastic IP address"
3. Associate it with your EC2 instance
4. Note the Elastic IP address for DNS configuration

## Step 2: Configure Domain DNS

### 2.1 Add DNS Records

In your domain registrar's DNS settings (sarcasticrobo.com):

1. Add an A record:
   - **Name**: profile
   - **Type**: A
   - **Value**: Your EC2 Elastic IP address
   - **TTL**: 3600 (or default)

2. Wait for DNS propagation (can take 5 minutes to 48 hours)

## Step 3: Connect to EC2 Instance

### Windows (Using PowerShell or WSL)

```bash
# Navigate to where your .pem file is located
cd path\to\key

# Set correct permissions (if using WSL)
chmod 400 your-key.pem

# Connect via SSH
ssh -i "your-key.pem" ubuntu@your-elastic-ip
```

### Linux/Mac

```bash
chmod 400 your-key.pem
ssh -i "your-key.pem" ubuntu@your-elastic-ip
```

## Step 4: Install and Configure Web Server

### Option A: Nginx (Recommended)

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Nginx
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

### Option B: Apache

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Apache
sudo apt install apache2 -y

# Start and enable Apache
sudo systemctl start apache2
sudo systemctl enable apache2

# Check status
sudo systemctl status apache2
```

## Step 5: Upload Website Files

### Method 1: Using SCP (Secure Copy)

From your local machine (PowerShell/Terminal):

```bash
# Navigate to your project directory
cd D:\CG_DS_ALL\Personal

# For Nginx
scp -i "path\to\your-key.pem" -r * ubuntu@your-elastic-ip:/tmp/website

# For Apache
scp -i "path\to\your-key.pem" -r * ubuntu@your-elastic-ip:/tmp/website
```

Then on the EC2 instance:

```bash
# For Nginx
sudo mv /tmp/website/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/

# For Apache
sudo mv /tmp/website/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

### Method 2: Using Git

On the EC2 instance:

```bash
# Install Git
sudo apt install git -y

# Clone your repository (if you've pushed to GitHub)
cd /tmp
git clone https://github.com/sarcasticrobo/Personal.git

# Move files to web directory
# For Nginx
sudo cp -r Personal/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/

# For Apache (same commands as above)
```

### Method 3: Using FileZilla or WinSCP (GUI)

1. Download FileZilla or WinSCP
2. Configure SFTP connection:
   - **Host**: your-elastic-ip
   - **Protocol**: SFTP
   - **Port**: 22
   - **User**: ubuntu
   - **Key file**: your-key.pem
3. Connect and drag files to `/var/www/html/`

## Step 6: Configure Nginx for Your Domain

### 6.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/profile.sarcasticrobo.com
```

Add the following configuration:

```nginx
server {
    listen 80;
    listen [::]:80;
    
    server_name profile.sarcasticrobo.com;
    
    root /var/www/html;
    index index.html index.htm;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### 6.2 Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/profile.sarcasticrobo.com /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## Step 7: Install SSL Certificate (HTTPS)

### Using Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain and install certificate
sudo certbot --nginx -d profile.sarcasticrobo.com

# Follow the prompts:
# - Enter your email address
# - Agree to terms of service
# - Choose whether to redirect HTTP to HTTPS (recommended: Yes)

# Test auto-renewal
sudo certbot renew --dry-run
```

The certificate will auto-renew before expiration.

## Step 8: Configure Firewall (UFW)

```bash
# Enable UFW
sudo ufw enable

# Allow SSH (important: do this before enabling UFW!)
sudo ufw allow ssh
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'
# Or if using Apache:
# sudo ufw allow 'Apache Full'

# Check status
sudo ufw status
```

## Step 9: Optimize Performance

### 9.1 Enable HTTP/2

Edit Nginx config:
```bash
sudo nano /etc/nginx/sites-available/profile.sarcasticrobo.com
```

Change `listen 443 ssl;` to `listen 443 ssl http2;`

### 9.2 Set Up Caching

Already configured in Step 6.1 above.

### 9.3 Monitor Resources

```bash
# Install htop for monitoring
sudo apt install htop -y

# Run to check resource usage
htop

# Check disk usage
df -h

# Check memory usage
free -m
```

## Step 10: Set Up Automatic Backups

### 10.1 Create Backup Script

```bash
sudo nano /usr/local/bin/backup-website.sh
```

Add:

```bash
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d_%H%M%S)
WEBSITE_DIR="/var/www/html"

mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/website_backup_$DATE.tar.gz $WEBSITE_DIR

# Keep only last 7 backups
find $BACKUP_DIR -name "website_backup_*.tar.gz" -mtime +7 -delete

echo "Backup completed: website_backup_$DATE.tar.gz"
```

Make it executable:

```bash
sudo chmod +x /usr/local/bin/backup-website.sh
```

### 10.2 Schedule with Cron

```bash
sudo crontab -e
```

Add (runs daily at 2 AM):

```cron
0 2 * * * /usr/local/bin/backup-website.sh >> /var/log/website-backup.log 2>&1
```

## Step 11: Set Up Monitoring

### 11.1 Install CloudWatch Agent (Optional)

```bash
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
```

### 11.2 Simple Log Monitoring

```bash
# View Nginx access logs
sudo tail -f /var/log/nginx/access.log

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log

# View system logs
sudo journalctl -u nginx -f
```

## Step 12: Updating Your Website

### Using Git (Recommended)

```bash
# SSH into your server
ssh -i "your-key.pem" ubuntu@your-elastic-ip

# Navigate to a working directory
cd /tmp

# Pull latest changes
git clone https://github.com/sarcasticrobo/Personal.git
# or if already cloned:
# cd Personal && git pull

# Backup current site
sudo cp -r /var/www/html /var/www/html.backup

# Copy new files
sudo cp -r Personal/* /var/www/html/

# Set permissions
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

### Using SCP from Local

```bash
# From your local machine
scp -i "your-key.pem" -r D:\CG_DS_ALL\Personal\* ubuntu@your-elastic-ip:/tmp/website-update

# Then SSH in and move files as shown above
```

## Troubleshooting

### Website Not Loading

```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx configuration
sudo nginx -t

# Check logs
sudo tail -n 50 /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### DNS Not Resolving

```bash
# Check DNS propagation
nslookup profile.sarcasticrobo.com

# Or use online tools:
# https://www.whatsmydns.net/
```

### SSL Certificate Issues

```bash
# Check certificate
sudo certbot certificates

# Renew manually
sudo certbot renew

# Check Nginx SSL configuration
sudo nginx -t
```

### Permission Issues

```bash
# Fix ownership
sudo chown -R www-data:www-data /var/www/html/

# Fix permissions
sudo chmod -R 755 /var/www/html/
```

## Security Best Practices

1. **Keep System Updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Change SSH Port (Optional)**
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Change Port 22 to something else like 2222
   sudo systemctl restart sshd
   ```

3. **Disable Root Login**
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Set: PermitRootLogin no
   sudo systemctl restart sshd
   ```

4. **Install Fail2Ban**
   ```bash
   sudo apt install fail2ban -y
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

5. **Regular Backups**
   - Use the automated backup script from Step 10
   - Consider AWS S3 for off-site backups

## Costs Estimate

- **EC2 t2.micro**: Free tier (first 12 months) or ~$8/month
- **Elastic IP**: Free when associated with running instance
- **Data Transfer**: Free tier includes 100GB/month
- **Domain**: Varies by registrar (~$10-15/year)
- **SSL Certificate**: Free (Let's Encrypt)

**Total**: ~$8-15/month after free tier

## Additional Resources

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [AWS EC2 User Guide](https://docs.aws.amazon.com/ec2/)
- [Ubuntu Server Guide](https://ubuntu.com/server/docs)

## Support

For issues or questions:
- Check logs: `/var/log/nginx/`
- AWS Support (if on paid plan)
- Community forums: Stack Overflow, AWS Forums

---

**Congratulations!** Your portfolio website should now be live at https://profile.sarcasticrobo.com 🎉
