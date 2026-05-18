import { Request, Response, NextFunction } from "express";
import Lead from "../models/lead";

export const createLead = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { status, source, search, sort } = req.query;

    const queryConditions: any = {};

    if (status) queryConditions.status = status;
    if (source) queryConditions.source = source;

    if (search) {
      queryConditions.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    let sortCondition: any = { createdAt: -1 }; 
    if (sort === "oldest") {
      sortCondition = { createdAt: 1 };
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = 10; 
    const skip = (page - 1) * limit;

    const [leads, totalLeads] = await Promise.all([
      Lead.find(queryConditions).sort(sortCondition).skip(skip).limit(limit),
      Lead.countDocuments(queryConditions),
    ]);

    const totalPages = Math.ceil(totalLeads / limit);

    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        page,
        limit,
        totalLeads,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, message: "Lead not found" });
      return;
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lead) {
      res.status(404).json({ success: false, message: "Lead not found" });
      return;
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, message: "Lead not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    next(error);
  }
};
