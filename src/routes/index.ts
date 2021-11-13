import { isValidEmail } from "../lib/helpers";
import User from "../models/User";
import { Request, Response, Router } from "express";
import { sendEmail, sendVerificationEmail } from "../lib/send-grid";
import { isValidObjectId } from "mongoose";
import md from "../lib/markdown";

const router = Router();

router.get("/", async (_req:Request, res:Response) => {
  res.render("pages/index", { md });
});

router.post("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  let requestOrigin: string =
    formatUrlFromReferrer(`${req.headers.referer}`) || `${req.headers.origin}`;

  if (!requestOrigin || requestOrigin === "null") {
    return res.render("pages/details", {
      heading: "Unable to submit form",
      paragraph:
        "Make sure you make requests through a web server, JGIT will not work in pages browsed as HTML files.",
      website: false,
    });
  }

  const validEmail = isValidEmail(id);
  const validObjectId = isValidObjectId(id);

  if (!validObjectId && !validEmail) {
    return res.status(401).render("pages/details", {
      heading: "Invalid Request.",
      paragraph: "Please provide a valid email or secret ID.",
      website: false,
    });
  }

  try {
    const user = validObjectId
      ? await User.findOne({ websites: { $elemMatch: { _id: id } } })
      : validEmail
      ? await User.findOne({ email: id })
      : null;

    if (!user) {
      if (!validEmail) {
        return res.status(401).render("pages/details", {
          heading: "Invalid Request.",
          paragraph: "Please provide a valid email.",
          website: false,
        });
      }

      const newUser = new User({
        email: id,
        websites: [{ address: requestOrigin, isVerified: false }],
      });
      await newUser.save();
      return checkYourEmail(res, id, `${newUser.websites[0]._id}`, requestOrigin);
    }

    const idx = user.websites.findIndex((site) => site.address === requestOrigin);
    const website = user.websites[idx];

    if (!website) {
      user.websites.push({ address: requestOrigin, isVerified: false });
      await user.save();
      const nw = user.websites[user.websites.length - 1]._id;
      return checkYourEmail(res, user.email, `${nw}`, requestOrigin);
    }

    if (!website.isVerified) {
      return checkYourEmail(res, user.email, `${website._id}`, requestOrigin);
    }

    if (!Object.keys(req.body)[0]) {
      return res.status(200).render('pages/details',{
        heading:"Invalid request!",
        paragraph:"You can not submit an empty form! Return to original site:",
        website:requestOrigin,
      });
    }
    await sendEmail(user.email, requestOrigin, { ...req.body });
    if (req.body._next) {
      // use status 303 to redirect to thank you page and trigger the GET request.
      return res.redirect(303, req.body._next);
    }
    
    return res.status(200).render('pages/details',{
      heading:"Thank YOU!",
      paragraph:"The form was submitted successfully. Return to original site:",
      website:requestOrigin,
    });
  } catch (_e: any) {
    const e: Error = _e;
    console.error("ERROR: ", e.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong on our part.",
      errorMessage: e.message,
      error: e,
    });
  }
});

const checkYourEmail = async (
  res: Response,
  email: string,
  mongoWebsiteId: string,
  originWebsite: string
) => {
  await sendVerificationEmail(email, mongoWebsiteId, originWebsite);
  return res.status(401).render('pages/details',{
    heading:'Unable to submit form',
    paragraph:`This form needs Activation. We've sent you an email containing an 'Activate Form' link. Just click it and your form will be activated!`,
    website:false,
  });
};

function formatUrlFromReferrer(url: string): string {
  if (url === "" || typeof url === "undefined") return "";
  return url.substring(0, url.lastIndexOf("/"));
}

export default router;
