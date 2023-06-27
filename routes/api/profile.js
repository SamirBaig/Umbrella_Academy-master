const express = require("express");
const router = express.Router();
const passport = require("passport");
//const MeetingService = require("../../MeeetingService")
const jwt = require("jsonwebtoken");
const request = require("request");
const companyEmail = "chalknchartsdevelopment@gmail.com";
const API_KEY = "Q2IH6S5fQTOctKD0msupuQ";
const API_SECRET = "W6zLRhS95XD04PlanGPPOynfiFvnfExLMd2M";
const payload = {
  iss: API_KEY,
  exp: new Date().getTime() + 5000,
};
// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

const MeetingModel = require("../../models/Meeting");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

const createMeeting = (user, body, options, registrants) => {
  return new Promise(function (resolve, reject) {
    request(options, async function (error, response, responseBody) {
      if (error) {
        console.log(error);
        reject(error);
      }
      // console.log("body: ", responseBody);
      console.log("body: ", body);
      const { id, start_url, join_url, topic, timezone, created_at } =
        responseBody;
      console.log(user);
      const meetingBody = {
        createdBy: user._id,
        meetingWith: body.teacherEmail,
        name: `${body.first_name} ${body.last_name}`,
        creatorName: `${user?.first_name} ${user?.last_name}`,
        meetingId: id,
        topic: topic,
        description: body.description,
        startTime: body.date + " " + body.time,
        timezone,
        start_url,
        join_url,
        created_at,
      };
      console.log(meetingBody);
      const meeting = await MeetingModel.create(meetingBody);
      resolve(meeting);
    });
  });
};

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch((err) => res.status(404).json({ profile: "There are no profiles" }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});

router.post(
  "/meeting",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.body);
    const {
      studentEmail,
      teacherEmail,
      subject,
      description,
      date,
      time,
      first_name,
      last_name,
    } = req.body;

    console.log(studentEmail);

    try {
      // Find the user profile based on the email
      const user = req.user;
      const token = jwt.sign(payload, API_SECRET);
      console.log("zoom token: ", token);
      const options = {
        method: "POST",
        uri: `https://api.zoom.us/v2/users/${companyEmail}/meetings`,
        body: {
          topic: subject,
          start_time: date + " " + time,
          default_password: false,
          type: 1,
          settings: {
            contact_email: user?.email,
            contact_name: `${user?.first_name} ${user?.last_name}`,
            email_notification: true,
            meeting_invitees: [
              { email: companyEmail },
              { email: teacherEmail },
            ],
            private_meeting: false,
            join_before_host: true,
            registrants_confirmation_email: true,
            registrants_email_notification: true,
          },
        },
        auth: {
          bearer: token,
        },
        header: {
          "User-Agent": "Zoom-api-Jwt-Request",
          "content-type": "application/json",
        },
        json: true,
      };
      const registrants = [
        {
          first_name: first_name,
          last_name: last_name,
          email: teacherEmail,
        },
        {
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
        },
      ];
      createMeeting(user, req.body, options, registrants)
        .then((meeting) => {
          console.log(meeting);
          return res.status(200).send(meeting);
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).send(err);
        });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  console.log(req.params.user_id);
  Profile.findOne({ user: req.params.user_id })
    .populate({ path: "user", model: "users" })
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then((profile) => res.json(profile));
    });
  }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then((profile) => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // Get remove index
        const removeIndex = profile.experience
          .map((item) => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // Get remove index
        const removeIndex = profile.education
          .map((item) => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
