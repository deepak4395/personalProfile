# Personal Portfolio Website

A modern, responsive personal portfolio website for Chandramauli Gupta, showcasing professional experience, skills, projects, and education.

**Live URL:** profile.sarcasticrobo.com (to be deployed)

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
│   └── Resume_Chandramauli_Gupta.pdf  # Downloadable resume
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

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📞 Contact

- **Email**: your.email@example.com
- **LinkedIn**: linkedin.com/in/chandramauli-gupta
- **GitHub**: github.com/sarcasticrobo

---

Built with ❤️ by Chandramauli Gupta