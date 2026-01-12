# Contact Form Setup Instructions

Your contact form is configured and ready to use! However, **FormSubmit requires a one-time activation** before it will send emails.

## ⚠️ IMPORTANT - First Time Setup Required

### Step 1: Submit a Test Message

1. Open your website in a browser
2. Scroll to the Contact section
3. Fill out the form with any test message
4. Click "Send Message"

### Step 2: Check Your Email

**Within 1-2 minutes**, check your inbox at: **deepaksinghal1995@gmail.com**

You should receive an email from FormSubmit with subject like:
> "FormSubmit - Activate your form"

### Step 3: Click the Activation Link

1. Open the email from FormSubmit
2. Click the activation/confirmation link inside
3. You should see a success page

### Step 4: Test Again

After clicking the activation link:
1. Go back to your website
2. Fill out the contact form again
3. This time, the message **WILL** be delivered to your email

---

## ✅ How It Works After Activation

Once activated, every form submission will:
1. Send an email to **deepaksinghal1995@gmail.com** with all form details
2. Send an automatic response to the person who contacted you
3. Redirect them to FormSubmit's thank you page

## 📧 What You'll Receive

Each contact form submission will send you an email containing:
- **Name** of the person
- **Email** address (so you can reply)
- **Subject** they entered
- **Message** content
- **Date/Time** of submission

## 🔧 Optional Customizations

You can customize the form behavior by editing hidden fields in `index.html`:

```html
<!-- Change the subject line of emails you receive -->
<input type="hidden" name="_subject" value="New message from Portfolio Website">

<!-- Disable captcha (already disabled) -->
<input type="hidden" name="_captcha" value="false">

<!-- Auto-response sent to visitors -->
<input type="hidden" name="_autoresponse" value="Your custom message">
```

## 🐛 Troubleshooting

### "I didn't receive the activation email"

1. Check your spam/junk folder
2. Make sure you used the correct email in the form
3. Try submitting the form again
4. Wait up to 5 minutes (sometimes delayed)

### "After activation, I'm still not getting emails"

1. Check spam folder
2. Make sure the activation was successful
3. Try a different email address to test
4. Check that your Gmail isn't blocking FormSubmit

### "The form redirects to FormSubmit's page"

This is normal! After submission, users are redirected to FormSubmit's thank you page. To change this, you can:

1. Add a `_next` field in the HTML form:
```html
<input type="hidden" name="_next" value="https://profile.sarcasticrobo.com/#contact">
```

2. This will redirect back to your website after submission

## 📝 Current Configuration

- **Email destination**: deepaksinghal1995@gmail.com
- **Subject line**: "New message from Portfolio Website"
- **Captcha**: Disabled
- **Auto-response**: Enabled
- **Template**: Table format

---

## 🎯 Summary

**Before activation**: Form submits but no emails are sent (activation email is sent instead)

**After activation**: All form submissions are delivered to your email

**You only need to activate once!** After that, it works forever.

---

If you have any issues, you can also contact FormSubmit support at: https://formsubmit.co/
