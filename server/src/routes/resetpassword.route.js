import express from "express";
import { User } from "../models/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import conf from "../conf/conf.js";

const router = express.Router();

// Route to handle forgot password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    console.log({ email });

    const user = await User.findOne({ email });
    // console.log({ user });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
    await user.save();
    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: conf.EMAIL_USER,
        pass: conf.EMAIL_PASS,
      },
    });
    const mailOptions = {
      to: user.email,
      from: conf.EMAIL_USER,
      subject: "GloamourGrove: Password Reset Request",
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
        <a href=${conf.CLIENT_URL}/reset-password/${resetToken}">Reset Password</a>`,
    };
    console.log("Forget-Password2");
    await transporter.sendMail(mailOptions);
    console.log("Forget-Password1");
    res.json({ message: "Reset link sent to your email." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Route to reset the password
router.post("/reset-password/:token", async (req, res) => {
  const { password } = req.body;

  try {
    // Find the user by token and ensure it's not expired
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Set new password (pre-save hook will hash it)
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save(); // The pre-save hook will handle password hashing

    res.json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
