# Personal Portfolio Website - Complete Documentation

A modern, professional portfolio website for Deepak Singhal, Embedded Systems Engineer, featuring advanced animations, interactive components, and embedded systems aesthetic.

**Live URL:** profile.sarcasticrobo.com (to be deployed)

---

## 🎯 Project Overview

- **Name**: Deepak Singhal
- **Role**: Embedded Systems Engineer
- **Domain**: profile.sarcasticrobo.com
- **Tech Stack**: HTML5, CSS3, Vanilla JavaScript
- **Theme**: Dark mode with red accent (#ef4444)
- **Design Philosophy**: Professional embedded systems aesthetic with heavy animations

---

## 📁 Project Structure

```
Personal/
├── index.html                  # Main HTML with all sections
├── css/
│   └── style.css              # Complete styling + animations
├── js/
│   ├── animations.js          # PCB traces, particles, matrix rain, typing, waveforms, LEDs
│   ├── circuit-nodes.js       # Skills connection visualization
│   ├── effects.js             # Stat counters, glitch effects, scan line
│   └── main.js                # Navigation, scroll, form handling
├── assets/
│   └── images/
│       ├── profilephoto.jpg   # Profile image
│       └── README.md          # Image documentation
└── README.md                  # This file (complete documentation)
```

---

## 🚀 Quick Start

### Running Locally

**Python 3:**
```bash
cd Personal
python -m http.server 8000
```

Visit: `http://localhost:8000`

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js:**
```bash
npm install -g http-server
http-server -p 8000
```

---

## ✨ Feature Highlights

### 🎨 12 Advanced Animation Features

#### 1. **Animated PCB Trace Background System**
- SVG-based circuit board traces
- Animated pulsing vias (connection points)
- Layered for depth and realism
- Auto-generates on page load

#### 2. **Particle System with Floating Microchip Icons**
- 60 floating particles with microchip/node icons
- Dynamic connection lines between nearby particles
- Smooth motion with velocity-based movement
- Canvas-based rendering for performance

#### 3. **Binary/Hex Code Rain Effect**
- Matrix-style falling hex/binary code
- Red glow effect matching theme
- Randomized characters and speeds
- Runs continuously in hero section background

#### 4. **Typing Effect for Hero Subtitle**
- Auto-rotating role titles:
  - Embedded Systems Engineer
  - IoT Solutions Architect
  - Firmware Developer
  - Hardware Designer
  - RTOS Specialist
- Blinking cursor animation
- Smooth typing/deleting transitions

#### 5. **Embedded Terminal Simulation**
- Fixed position bottom-right terminal window
- Realistic firmware boot sequence on load
- Interactive command system:
  - `help` - Command list
  - `status` - System status
  - `skills` - Technical skills
  - `projects` - Featured projects
  - `contact` - Contact info
  - `about` - Profile summary
  - `clear` - Clear screen
- Retro terminal UI with functional minimize/close buttons
- Mobile responsive

#### 6. **Oscilloscope Waveform Section Dividers**
- Animated SVG waveforms between sections
- Three wave types:
  - **Sine wave**: Smooth oscillating pattern
  - **Square wave**: Digital pulse pattern
  - **Pulse wave**: Sharp spike pattern
- Real-time animation for sine waves
- Red glow effect

#### 7. **Blinking LED Status Indicators**
- Small LED dots in section corners
- Four animation patterns:
  - **slow-pulse**: Breathing effect (2s)
  - **fast-blink**: Quick toggle (0.5s)
  - **fade**: Smooth fade in/out (3s)
- Realistic LED appearance with highlights
- Mobile responsive (smaller on phones)

#### 8. **Interactive Circuit Node Connections for Skills**
- Canvas overlay on skills section
- Hover any skill to see:
  - Skill lights up with glow
  - Related skills automatically highlight
  - Animated curved connection lines drawn
  - Pulsing node indicators
- Relationship mapping (e.g., C++ → MQTT, Protobuf, Docker)
- Auto-adjusts on window resize

#### 9. **Glitch/Hologram Effects on Hover**
- RGB split glitch on text hover:
  - Hero name highlight
  - All section titles
  - Project card titles
- Multi-layer clip-path animation
- Skew distortion effect
- Hologram shimmer on buttons with RGB shadows
- CRT scan line moving down screen
- Auto-applies to navigation links

#### 10. **Animated Counter for Stats with Circuit Aesthetics**
- Counts from 0 to target (7, 10, 5) when scrolled into view
- Monospace "Courier New" font for digital display aesthetic
- Red glow text-shadow effect
- Smooth easing animation (ease-out-quart, 2s duration)
- Occasional digital flicker for realism
- Auto "+" suffix added via CSS
- Glow pulse animation on hover

---

## 🎨 Design System

### Color Palette
- **Background**: #0a0a0a (near black)
- **Cards**: #1a1a1a (dark gray)
- **Primary Red**: #ef4444
- **Text Gray**: #e5e5e5
- **Accent**: Various red shades

### Typography
- **Headings**: 'Orbitron', sans-serif (futuristic)
- **Body**: 'Rajdhani', sans-serif (modern)
- **Code**: 'Courier New', monospace (technical)

### Animation Principles
- All animations use `requestAnimationFrame` for 60fps
- Hardware-accelerated CSS transforms
- Intersection Observer for scroll-triggered animations
- Performance-optimized canvas rendering

---

## 🔧 Technologies Used

**Frontend**
- HTML5 (semantic markup)
- CSS3 (Grid, Flexbox, animations, transforms)
- Vanilla JavaScript ES6+ (no frameworks)

**Libraries**
- Font Awesome 6.4.0 (icons only)

**APIs/Services**
- FormSubmit.co (contact form - no backend required)

**Development**
- Python http.server (local testing)
- Git version control

---

## 📧 Contact Form Setup

The contact form uses **FormSubmit.co** (free, no backend required).

### ⚠️ IMPORTANT - First Time Setup

**FormSubmit requires one-time activation before sending emails:**

1. **Submit a test message** through the contact form on your website
2. **Check email** at deepaksinghal1995@gmail.com for activation link
3. **Click the activation link** in the email from FormSubmit
4. **Test again** - all future submissions will now be delivered!

### What You'll Receive

Each contact form submission sends you an email containing:
- Name of the person
- Email address (so you can reply)
- Subject they entered
- Message content
- Date/Time of submission

### Current Configuration
- **Email destination**: deepaksinghal1995@gmail.com
- **Subject line**: "New message from Portfolio Website"
- **Captcha**: Disabled
- **Auto-response**: Enabled
- **Template**: Table format

### Troubleshooting

**Didn't receive activation email?**
- Check spam/junk folder
- Wait up to 5 minutes
- Try submitting again

**Not receiving emails after activation?**
- Check spam folder
- Verify activation was successful
- Test with different email address

---

## 🚀 AWS EC2 Deployment Guide

Complete guide to deploying your portfolio to AWS EC2 Linux instance at profile.sarcasticrobo.com.

### Prerequisites

- AWS account with EC2 access
- Domain name configured (sarcasticrobo.com)
- SSH client installed
- Basic Linux command line knowledge

### Quick Deployment Steps

#### 1. Launch EC2 Instance

- **AMI**: Ubuntu Server 22.04 LTS
- **Instance Type**: t2.micro (free tier) or t3.small
- **Security Groups**: Allow SSH (22), HTTP (80), HTTPS (443)
- **Storage**: 8-20 GB

#### 2. Allocate Elastic IP

1. Go to EC2 → Elastic IPs
2. Allocate and associate with your instance
3. Note the IP for DNS configuration

#### 3. Configure Domain DNS

Add A record in your domain DNS:
- **Name**: profile
- **Type**: A
- **Value**: Your Elastic IP address
- **TTL**: 3600

#### 4. Connect to EC2

```bash
ssh -i "your-key.pem" ubuntu@your-elastic-ip
```

#### 5. Install Nginx

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 6. Upload Website Files

**Using SCP:**
```bash
scp -i "your-key.pem" -r * ubuntu@your-elastic-ip:/tmp/website
```

**On EC2:**
```bash
sudo mv /tmp/website/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

#### 7. Configure Nginx

Create `/etc/nginx/sites-available/profile.sarcasticrobo.com`:

```nginx
server {
    listen 80;
    server_name profile.sarcasticrobo.com;
    root /var/www/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/profile.sarcasticrobo.com /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

#### 8. Install SSL Certificate (Free)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d profile.sarcasticrobo.com
```

Follow prompts and choose to redirect HTTP to HTTPS.

#### 9. Configure Firewall

```bash
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw status
```

#### 10. Set Up Automatic Backups

Create `/usr/local/bin/backup-website.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf $BACKUP_DIR/website_backup_$DATE.tar.gz /var/www/html
find $BACKUP_DIR -name "website_backup_*.tar.gz" -mtime +7 -delete
```

Make executable and schedule:
```bash
sudo chmod +x /usr/local/bin/backup-website.sh
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-website.sh
```

### Updating Website

```bash
# Pull latest changes
git pull

# Copy to server
scp -i "your-key.pem" -r * ubuntu@your-elastic-ip:/tmp/update

# On EC2
sudo cp -r /tmp/update/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html/
sudo systemctl reload nginx
```

### Troubleshooting

**Website not loading:**
```bash
sudo systemctl status nginx
sudo nginx -t
sudo tail /var/log/nginx/error.log
```

**SSL issues:**
```bash
sudo certbot certificates
sudo certbot renew
```

**Permission issues:**
```bash
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

### Security Best Practices

1. Keep system updated: `sudo apt update && sudo apt upgrade -y`
2. Install Fail2Ban: `sudo apt install fail2ban -y`
3. Disable root login in SSH config
4. Use strong SSH keys
5. Regular backups (automated script above)

### Cost Estimate

- **EC2 t2.micro**: Free tier (12 months) or ~$8/month
- **Elastic IP**: Free when attached to running instance
- **Domain**: ~$10-15/year
- **SSL**: Free (Let's Encrypt)

**Total**: ~$8-15/month after free tier

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

## 🎯 Performance

- **60fps animations** on modern devices
- **Canvas-based rendering** for complex effects
- **Hardware-accelerated** CSS transforms
- **Lazy loading** for images
- **Optimized asset delivery** with caching
- **Mobile-first** responsive design

---

## ♿ Accessibility

- Semantic HTML5 markup
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast design
- Focus indicators

---

## 📝 Customization Guide

### Update Personal Information

1. **Hero Section** (index.html, lines 40-60):
   - Name and title
   - Professional description
   - Social links

2. **About Section** (index.html, lines 80-120):
   - Biography
   - Professional experience summary
   - Statistics (years, projects, industries)

3. **Skills Section** (index.html, lines 130-200):
   - Technology categories
   - Skill tags with relationships for circuit connections

4. **Projects Section** (index.html, lines 360-430):
   - Project names and descriptions
   - Technologies used
   - Links to demos and repositories

5. **Contact Information** (index.html, lines 430-480):
   - Email and phone
   - Location
   - Contact form email destination

### Update Colors

Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-red: #ef4444;
    --dark-bg: #0a0a0a;
    --dark-card: #1a1a1a;
    /* Modify other colors */
}
```

### Add/Remove Animations

Comment out initialization in `js/animations.js`:
```javascript
// new MatrixRain('hero');  // Disable matrix rain
// new ParticleSystem('hero');  // Disable particles
```

---

## 🔐 Security Considerations

- All external links use `target="_blank" rel="noopener noreferrer"`
- CSP headers configured in Nginx
- XSS protection headers enabled
- Form validation and sanitization
- HTTPS enforced via Let's Encrypt
- No inline scripts or styles

---

## 📊 Analytics Integration (Optional)

To add Google Analytics:

1. Get tracking ID from Google Analytics
2. Add to `index.html` before closing `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## � Assets Management

### Folder Structure

```
assets/
├── images/                        # Image files
│   ├── profilephoto.jpg          # Your profile photo
│   ├── project1.jpg              # Project screenshots
│   ├── project2.jpg
│   └── project3.jpg
└── Resume_Deepak_Singhal.pdf     # Your resume (downloadable)
```

### Adding Your Resume

1. **Convert to PDF** (if in DOCX format):
   - Open in Microsoft Word → File → Save As → PDF
   - Or use online converter: https://smallpdf.com/word-to-pdf

2. **Name the file**: `Resume_Deepak_Singhal.pdf`

3. **Place in assets folder**: Copy the PDF to `assets/` directory

4. **Test download**: Click "Download Resume" button on website to verify

### Resume Optimization

- Keep file size under 2MB
- Ensure text is selectable (not scanned image)
- Use professional formatting
- Include contact information
- Make sure links (LinkedIn, GitHub) are clickable

### File Naming Conventions

- Use lowercase for consistency
- Use hyphens for spaces: `my-file.pdf` instead of `my file.pdf`
- Be descriptive: `aws-certification.pdf` not `cert.pdf`
- Avoid special characters

### Additional Assets (Optional)

```
assets/
├── fonts/                # Custom fonts (if not using CDN)
├── documents/            # Certifications, portfolios
└── downloads/            # Other downloadable files
```

### Asset Checklist

- [ ] Add profile.jpg to images folder
- [ ] Add project screenshots to images folder
- [ ] Convert resume to PDF
- [ ] Add resume PDF to assets folder
- [ ] Test all download links
- [ ] Optimize file sizes

**Important**: Always optimize images and PDFs before deploying to reduce load times and bandwidth usage.

---

## �🐛 Known Issues & Limitations

- 3D flip cards removed (simplified to standard cards for better mobile UX)
- Hexagonal border on profile photo removed (alignment issues)
- Terminal simulation may lag on older devices
- Some animations disabled on mobile for performance

---

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and customize for your own use!

---

## 📞 Support & Contact

- **Email**: deepaksinghal1995@gmail.com
- **LinkedIn**: [linkedin.com/in/deepak-singhal](https://linkedin.com/in/deepak-singhal)
- **GitHub**: [github.com/deepaksinghal](https://github.com/deepaksinghal)

---

## 📄 License

This project is open source and available for personal use.

---

## 🎉 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- FormSubmit.co for contact form service
- AWS for hosting infrastructure

---

**Built with ❤️ by Deepak Singhal**

**Status**: Production Ready  
**Created**: January 2026  
**Last Updated**: January 12, 2026

---

## 🚦 Deployment Checklist

Before going live:

- [ ] Update all personal information
- [ ] Add professional profile photo
- [ ] Add project screenshots
- [ ] Test contact form activation
- [ ] Update social media links
- [ ] Add resume PDF to assets
- [ ] Test on multiple devices
- [ ] Configure DNS records
- [ ] Set up SSL certificate
- [ ] Configure firewall
- [ ] Set up backups
- [ ] Test all animations
- [ ] Verify mobile responsiveness
- [ ] Check browser compatibility
- [ ] Enable analytics (optional)
- [ ] Final testing on production URL

---

**Congratulations!** Your portfolio website is ready to deploy to https://profile.sarcasticrobo.com 🎉

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**: Clean and professional design with smooth animations
- **Single Page Application**: Easy navigation with smooth scrolling
- **Interactive Elements**: Dynamic counters, hover effects, and animations
- **Contact Form**: Built-in contact form for visitor inquiries
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 📁 Project Structure

```
Personal/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styling and animations
├── js/
│   └── main.js            # JavaScript functionality
├── assets/
│   ├── images/            # Images and graphics
│   │   ├── profile.jpg    # Profile photo (add your own)
│   │   ├── project1.jpg   # Project screenshots
│   │   ├── project2.jpg
│   │   └── project3.jpg
│   └── Resume_Deepak_Singhal.pdf  # Downloadable resume
└── README.md              # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript**: Vanilla JS for interactivity
- **Font Awesome**: Icon library for UI elements

## 🏃‍♂️ Running Locally

### Method 1: Python HTTP Server (Recommended)

1. Open a terminal in the project directory
2. Run one of the following commands:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

3. Open your browser and visit: `http://localhost:8000`

### Method 2: Node.js HTTP Server

1. Install http-server globally (if not already installed):
```bash
npm install -g http-server
```

2. Run the server:
```bash
http-server -p 8000
```

3. Open your browser and visit: `http://localhost:8000`

### Method 3: VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Method 4: Direct File Opening (Limited Functionality)

Simply open `index.html` in your browser by double-clicking it. Note: Some features may not work properly without a server.

## 📝 Customization Guide

### 1. Personal Information

Edit `index.html` to update:
- **Name and Title**: Line 70-72 (Hero section)
- **Bio**: Lines 86-96 (About section)
- **Email & Social Links**: Update in Hero (lines 79-84) and Contact sections (lines 307-328)
- **Location**: Line 320

### 2. Professional Experience

Update the timeline section (lines 155-202) with your actual work experience:
- Job titles and companies
- Date ranges
- Responsibilities and achievements

### 3. Education & Certifications

Modify lines 209-247 to reflect your actual education and certifications.

### 4. Skills

Update skill tags in lines 124-153 to match your technology stack.

### 5. Projects

Replace project information in lines 250-295:
- Project names and descriptions
- Technologies used
- Links to live demos and GitHub repositories

### 6. Images

Add your images to the `assets/images/` folder:
- **profile.jpg**: Your professional headshot
- **project1.jpg, project2.jpg, project3.jpg**: Screenshots of your projects
- **Resume PDF**: Place your resume PDF in `assets/` folder

### 7. Colors & Styling

Customize the color scheme in `css/style.css` (lines 1-15):
- Primary color: `--primary-color`
- Secondary color: `--secondary-color`
- Accent color: `--accent-color`

## 🔧 Before Deploying

1. ✅ Replace placeholder text with your actual information
2. ✅ Add your professional photo and project screenshots
3. ✅ Update all social media and contact links
4. ✅ Test the contact form functionality (add backend API)
5. ✅ Add your resume PDF to the assets folder
6. ✅ Update meta tags in `index.html` for SEO
7. ✅ Test on different devices and browsers

## 📤 Deployment to AWS EC2

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on deploying to your AWS EC2 Linux instance.

## 🔐 Contact Form Backend

The contact form currently shows an alert. To make it functional:

1. **Option 1: Use a Form Service**
   - FormSpree: https://formspree.io/
   - Netlify Forms: https://www.netlify.com/products/forms/
   - EmailJS: https://www.emailjs.com/

2. **Option 2: Build Your Own Backend**
   - Create an API endpoint (Node.js/Express, Python/Flask, etc.)
   - Update the form submission handler in `js/main.js` (lines 114-139)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This project is open source and available for personal use.
---

Built with ❤️ by Deepak Singhal