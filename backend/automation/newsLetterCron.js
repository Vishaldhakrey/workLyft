import cron from "node-cron";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/sendEmails.js";
import { createJobLinkForUser } from "../utils/jwtToken.js";

export const newsLetterCron = () => {
    cron.schedule("0 */6 * * *", async () => {
        console.log("Running Cron Automation");
        const jobs = await Job.find({ newsLetterSent: false }).populate({path: "company"});
        for (const job of jobs) {
            try {
                const filteredUsers = await User.find({
                    "profile.skills": { $in: job.requirement },
                })
                for (const user of filteredUsers) {
                    const subject = `Hot Job Alert: ${job.title} is Available Now`;
                    const message = `
                                    <html>
                                        <body style="font-family: Arial, sans-serif; color: #333;">
                                            <div style="max-width: 600px; margin: 0 auto; background-color: #f4f4f9; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                                <h2 style="color: #6A38C2;">Hot Job Alert!</h2>
                                                <p style="font-size: 16px;">Hi ${user.fullName},</p>
                                                <p style="font-size: 16px;">Great news! A new job that matches your role has just been posted. The position is for a <strong>${job.title}</strong> with <strong>${job.company.name}</strong>, and they are looking to hire immediately.</p>
                                                
                                                <h3 style="color: #6A38C2;">Job Details:</h3>
                                                <ul style="font-size: 16px; margin-bottom: 20px;">
                                                    <li><strong>Position:</strong> ${job.title}</li>
                                                    <li><strong>Company:</strong> ${job.company.name}</li>
                                                    <li><strong>Location:</strong> ${job.location}</li>
                                                    <li><strong>Salary:</strong> ${job.salary}</li>
                                                </ul>
                                                
                                                <p style="font-size: 16px; color: #555;">Don’t wait too long! Job openings like these are filled quickly. Click the link below to apply:</p>
                                                
                                                <p style="font-size: 16px; text-align: center;">
                                                    <a href="${createJobLinkForUser(user._id, job._id)}" style="padding: 10px 20px; background-color: #6A38C2; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Apply Now</a>
                                                </p>
                                                
                                                <p style="font-size: 16px; margin-top: 20px;">We’re here to support you in your job search. Best of luck!</p>
                                                <p style="font-size: 16px;">Best Regards,<br><strong>NicheNest Team</strong></p>
                                            </div>
                                        </body>
                                    </html>
                                `;

                    sendEmail({
                        email: user.email,
                        subject,
                        message,
                    });

                }
                job.newsLetterSent = true;
                await job.save();
            } catch (error) {
                return console.error(error || "Some error in Cron.");
            }
        }
    });
};
