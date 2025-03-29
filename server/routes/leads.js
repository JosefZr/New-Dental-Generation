import express from "express";
import Waitlist from "../models/Waitlist.js"
import Leads from "../models/Leads.js"
const router = express.Router();
    router.post("/leads", async (req, res) => {
        try {
            console.log('[LEADS] Starting lead processing');
            const { email, type } = req.body;
            console.log(`[LEADS] Received request for email: ${email}, type: ${type}`);
            // Validate email exists
            if (!email || !type) {
                console.log('[LEADS] Validation failed - missing email or type');
                return res.status(400).json({ 
                success: false, 
                message: "Email is required"
                });
            }
        
            // Validate email format
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                console.log(`[LEADS] Invalid email format: ${email}`);
                return res.status(400).json({
                success: false,
                message: "Invalid email format"
                });
            }
        
            console.log(`[LEADS] Checking existing emails for ${email}`);
            const mail = await Leads.findOne({email: email, type: type});
            if(mail){
                console.log(`[LEADS] Email already exists: ${email}`);
                return res.status(400).json({
                success: false,
                message: "This email already exists"
                });
            }
            // Create new email document
            console.log(`[LEADS] Creating new email record for ${email}`);
            const newEmail = await Leads.create({ email: email, type: type });
            // Set up email transporter (reuse your existing config)
            // const transporter = nodemailer.createTransport({
            //     host: 'smtp.zoho.eu',
            //     port: 465,
            //     secure: true, // true for 465, false for 587
            //     auth: {
            //     user: process.env.EMAIL_USER,
            //     pass: process.env.EMAIL_PASSWORD
            //     },
            //     tls: {
            //     ciphers: 'SSLv3', // Force older cipher if needed
            //     rejectUnauthorized: true // Temporarily for testing
            //     },
            //     logger: true, // Enable Nodemailer's built-in logging
            //     debug: true   // Output SMTP traffic
            // });
            // Prepare email content
            // const mailOptions = {
            //     from: `${process.env.EMAIL_USER}`,
            //     to: email,
            //     subject: "Here's Your Secret Weapon 🦷",
            //     html: `
            //     <p>Hi there,</p>
                
            //     <p>Your Dentist's Secret Weapon is ready!</p>
                
            //     <p>
            //         <a href="https://drive.google.com/uc?export=download&id=1q9FCxsqiJ3LQtYdTBl1Sm4eP-59enVlY">
            //         Click here to access the guide.
            //         </a>
            //     </p>
                
            //     <p>Take your first step toward a smarter, more profitable practice.</p>
                
            //     <p>To your success,<br>
            //     Dr. Truth<br>
            //     Your Dental Network</p>
                
            //     <p><small>P.S. Want to see how we can help you implement these strategies? Join YDN and see yourself.</small></p>
            //     `
            // };
            console.log(`[LEADS] Scheduling email for ${email} `);
        
            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //     console.error(`[LEADS] Error sending to ${email}:`, {
            //         error: error.message,
            //         stack: error.stack,
            //         code: error.code,
            //         response: error.response
            //     });
            //     } else {
            //     console.log(`[LEADS] Email sent to ${email}:`, {
            //         messageId: info.messageId,
            //         response: info.response
            //     });
            //     }
            // });
            console.log(`[LEADS] Successfully processed request for ${email}`);
            return res.status(201).json({
                success: true,
                message: 'Email saved successfully',
                data: newEmail
            });
            } catch (error) {
            console.error(`[LEADS] Critical error:`, {
                message: error.message,
                stack: error.stack,
                code: error.code,
                requestBody: req.body
            });
            
            if (error.code === 11000) {
                return res.status(409).json({
                success: false,
                message: 'Email already exists'
                });
            }
            
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            });
            }
        });
    router.post("/waitlist", async (req, res) => {
        console.log('[WAITLIST] Starting waitlist processing');
        const data = req.body;
        console.log('[WAITLIST] Received data:', JSON.stringify(data));
        try {
    
        // Validate email exists
        if (!data) {
            console.log('[WAITLIST] Missing request body');
            return res.status(400).json({ 
            success: false, 
            message: "Request body is required"
            });
        }
        const mail = await Waitlist.findOne({email:data.email,type:data.type})
        if(mail){
            console.log(`[WAITLIST] Email exists: ${data.email}`);
            return res.status(400).json({
            success: false,
            message: "This email already exists"
            });
        }
        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            console.log(`[WAITLIST] Invalid email: ${data.email}`);
            return res.status(400).json({
            success: false,
            message: "Invalid email format"
            });
        }
    
        // Create new email document
        // console.log(`[WAITLIST] Creating record for ${data.email}`);
        const newEmail = await Waitlist.create({ 
            name: data.fullName,
            location: data.location,
            email: data.email,
            number: data.whatsapp,
            reason: data.why,
            type: data.type
        });
        // Set up email transporter (reuse your existing config)
        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.zoho.eu',
        //     port: 465,
        //     secure: true,
        //     auth: {
        //     user: process.env.EMAIL_USER,
        //     pass: process.env.EMAIL_PASSWORD
        //     },
        //     tls: {
        //     rejectUnauthorized: true
        //     },
        //     logger: true,
        // });
        // Prepare email content
        // const firstName = data.fullName?.split(' ')[0] || 'there';
        // const mailOptions = {
        //     from: 'dr.truth@buildydn.com',
        //     to: data.email,
        //     subject: "Here's Your Secret Weapon 🦷",
        //     html: `
        //     <p>Hi ${firstName},</p>
            
        //     <p>Your Dentist's Secret Weapon is ready!</p>
            
        //     <p>
        //         <a href="https://drive.google.com/uc?export=download&id=1q9FCxsqiJ3LQtYdTBl1Sm4eP-59enVlY">
        //         Click here to access the guide.
        //         </a>
        //     </p>
            
        //     <p>Take your first step toward a smarter, more profitable practice.</p>
            
        //     <p>To your success,<br>
        //     Dr. Truth<br>
        //     Your Dental Network</p>
            
        //     <p><small>P.S. Want to see how we can help you implement these strategies? Join YDN and see yourself.</small></p>
        //     `
        // };
        // console.log(`[WAITLIST] Scheduling email for ${data.email}`);
    
        // Schedule email to be sent after 5 minutes (300,000 milliseconds)
        // console.log(`[WAITLIST] Sending email to ${data.email}`);
        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //     console.error(`[WAITLIST] Send error for ${data.email}:`, {
        //         error: error.message,
        //         code: error.code,
        //         response: error.response
        //     });
        //     } else {
        //     console.log(`[WAITLIST] Email sent to ${data.email}:`, {
        //         messageId: info.messageId,
        //         response: info.response
        //     });
        //     }
        // });
        return res.status(201).json({
            success: true,
            message: 'Email saved successfully',
            data: newEmail
        });
        } catch (error) {
        console.error(`[WAITLIST] Critical error:`, {
            message: error.message,
            stack: error.stack,
            code: error.code,
            requestBody: req.body
        });
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(409).json({
            success: false,
            message: 'Email already exists'
            });
        }
        console.error("Lead submission error:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
        }
    });
export default router;
