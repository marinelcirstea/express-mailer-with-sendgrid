import User from "../models/User";
import { Request, Response, Router } from "express";
import { isValidObjectId } from "mongoose";
const router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid verification id." });
    }

    const user = await User.findOne({ websites: { $elemMatch: { _id: id } } }); // user with the website containing that id
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "We couldn't find a valid website with this id.",
      });
    }
    const idx = user.websites.findIndex((site) => `${site._id}` === `${id}`);
    const website = user.websites[idx];

    if (website.isVerified) {
      return res.status(400).json({ success: false, message: "This website is already verified." });
    }

    website.isVerified = true;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "The website is now verified, you may close this page.",
    });
  } catch (_e: any) {
    const e: Error = _e;
    console.log("ERROR_VERIFYING_USER: ", e.message);
    return res.status(500).json({
      success: false,
      message: "There's been a problem on our part.",
      errorMessage: e.message,
      error: e,
    });
  }
});

export default router;
