import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";

export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId,
        } = req.body;

        const userId = req.user._id;
        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !location ||
            !jobType ||
            !experience ||
            !position ||
            !companyId
        ) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const companyExists = await Company.findById(companyId);
        if (!companyExists) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        let requirementsArray;
        if (typeof requirements === 'string') {
            requirementsArray = requirements.split(",").map(req => req.trim()); // Split and trim whitespace
        } else {
            return res.status(400).json({
                message: "Requirements must be a string.",
                success: false,
            });
        }

        const job = new Job({
            title,
            description,
            requirement: requirementsArray,
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId,
        });

        job.save();

        return res.status(201).json({
            message: "New job created successfully",
            job: job,
            success: true,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        };

        const jobs = await Job.find(query)
            .populate({ path: "company" })
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false,
            });
        }

        return res.status(200).json({
            jobs,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({ path: "applications" });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            job,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.user._id;
        const jobs = await Job.find({ created_by: adminId })
            .populate({ path: "company" })
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false,
            });
        }

        return res.status(200).json({
            jobs,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
};
