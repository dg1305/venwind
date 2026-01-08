const express = require('express');
const router = express.Router();
const emailService = require('../services/email_service');
const { body, validationResult } = require('express-validator');
const { CmsContent } = require('../models');

// Contact form submission endpoint
router.post('/contact-form', [
  // Validation rules
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\-']+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .custom((value) => {
      // Basic email format check - just check it contains @ and has some characters
      if (!value || !value.includes('@') || value.length < 3) {
        throw new Error('Please provide a valid email address');
      }
      return true;
    }),
  
  body('phone')
    .optional()
    .trim()
    .custom((value) => {
      if (!value || value.trim() === '') return true; // Allow empty
      // Allow any phone format - just check it's not too long
      return value.length <= 50;
    })
    .withMessage('Phone number must be less than 50 characters'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Company name must be less than 200 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Message must be between 10 and 500 characters'),
  
  body('recaptchaToken')
    .notEmpty()
    .withMessage('reCAPTCHA verification is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, phone, company, message, recaptchaToken } = req.body;

    // Get client IP address
    const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || 'Unknown';

    // Prepare form data for email
    const formData = {
      name,
      email,
      phone,
      company,
      message,
      recaptchaToken,
      ipAddress,
      timestamp: new Date().toISOString()
    };

    // Fetch email configuration from CMS
    // Default sender is SMTP_USER (must match authenticated account)
    let senderEmail = process.env.SMTP_USER || null; // Will use SMTP_USER in email service
    let receiverEmail = 'contact@venwindrefex.com'; // Default receiver
    
    try {
      const emailConfig = await CmsContent.findOne({
        where: { page: 'contact', section: 'email-config' },
      });
      
      if (emailConfig && emailConfig.data) {
        // Sender email from CMS (used for display name/reply-to, but actual from will be SMTP_USER)
        if (emailConfig.data.senderEmail && emailConfig.data.senderEmail.trim()) {
          senderEmail = emailConfig.data.senderEmail.trim();
        }
        // Receiver email from CMS (where emails are actually sent)
        if (emailConfig.data.receiverEmail && emailConfig.data.receiverEmail.trim()) {
          receiverEmail = emailConfig.data.receiverEmail.trim();
        }
      }
    } catch (error) {
      console.warn('Failed to fetch email config from CMS, using defaults:', error.message);
    }

    // Send email with configured sender and receiver
    const emailResult = await emailService.sendContactFormEmail(formData, senderEmail, receiverEmail);

    // Send auto-reply to customer (optional - you can remove this if not needed)
    try {
      await emailService.sendAutoReply(email, name, senderEmail);
    } catch (autoReplyError) {
      console.warn('Auto-reply failed, but main email was sent:', autoReplyError.message);
    }

    // Log successful submission
    console.log(`Contact form submitted successfully by ${name} (${email}) at ${new Date().toISOString()}`);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      data: {
        messageId: emailResult.messageId,
        timestamp: formData.timestamp
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Return error response
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Test email service endpoint (for development/testing)
router.get('/test-email', async (req, res) => {
  try {
    const isConnected = await emailService.testConnection();
    
    if (isConnected) {
      res.json({
        success: true,
        message: 'Email service is working correctly'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Email service connection failed'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Email service test failed',
      error: error.message
    });
  }
});

module.exports = router;

