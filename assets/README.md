# Assets Folder

This folder contains all static assets for your personal portfolio website.

## Structure

```
assets/
├── images/               # Image files
│   ├── profile.jpg      # Your profile photo
│   ├── project1.jpg     # Project screenshots
│   ├── project2.jpg
│   └── project3.jpg
└── Resume_Chandramauli_Gupta.pdf  # Your resume (downloadable)
```

## Resume PDF

### Adding Your Resume

1. **Convert to PDF**: If your resume is in DOCX format, convert it to PDF:
   - Open in Microsoft Word
   - File → Save As → PDF
   - Or use online converter: https://smallpdf.com/word-to-pdf

2. **Name the file**: `Resume_Chandramauli_Gupta.pdf`

3. **Place it here**: Copy the PDF file to the `assets/` folder

4. **Test the download**: Click the "Download Resume" button on your website to verify it works

### Current Resume

The original resume file `Resume_Chandramauli_Gupta.docx` is in the parent directory. You should:

1. Convert it to PDF
2. Place the PDF version here
3. Optionally keep the DOCX for editing purposes

### Resume Optimization

- Keep file size under 2MB
- Ensure text is selectable (not scanned image)
- Use professional formatting
- Include contact information
- Make sure links (LinkedIn, GitHub) are clickable

## Adding Other Assets

You can add additional assets as needed:

- **Fonts**: Custom fonts (if not using CDN)
- **Icons**: Custom icon files
- **Documents**: Certifications, portfolios, etc.

### Example Additional Files

```
assets/
├── fonts/
│   └── custom-font.woff2
├── documents/
│   └── certificate.pdf
└── downloads/
    └── portfolio.pdf
```

## File Naming Conventions

- Use lowercase for consistency
- Use hyphens for spaces: `my-file.pdf` instead of `my file.pdf`
- Be descriptive: `aws-certification.pdf` not `cert.pdf`
- Avoid special characters

## Checklist

- [ ] Add profile.jpg to images folder
- [ ] Add project screenshots to images folder
- [ ] Convert resume to PDF
- [ ] Add resume PDF to assets folder
- [ ] Test all download links
- [ ] Optimize file sizes

---

**Important**: Always optimize images and PDFs before deploying to reduce load times and bandwidth usage.
