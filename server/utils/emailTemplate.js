const generateForgotPasswordEmailTemplate = (resetPasswordUrl) => {
  return `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
      
      <h2 style="color: #333; text-align: center;">Educaional Management System - password Reset Request</h2>

      <p style="font-size: 16px; color: #555;">
        
      </p>

      <p style="font-size: 16px; color: #555;">
        You requested to reset your password. Click the button below to reset it:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetPasswordUrl}" 
          style="background: #007bff; color: white; padding: 12px 25px; 
          text-decoration: none; font-size: 16px; border-radius: 5px;">
          Reset Password
        </a>
      </div>

      <p style="font-size: 15px; color: #555;">
        If the button doesn't work, copy and paste this link into your browser:
      </p>

      <p style="word-break: break-all; color: #007bff;">
        ${resetPasswordUrl}
      </p>

      <p style="font-size: 15px; color: #555;">
        If you did not request this, please ignore this email.
      </p>

      <p style="font-size: 14px; color: #999; text-align: center; margin-top: 40px;">
        © ${new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </div>
  </div>
  `;
};

export default generateForgotPasswordEmailTemplate;