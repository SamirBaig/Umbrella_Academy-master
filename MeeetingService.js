// const request = require("request");
// const jwt = require("jsonwebtoken");
// const { meeting, User } = require("../models");
// const { ObjectId } = require("mongoose").Types;
// const companyEmail = "chalknchartsdevelopment@gmail.com";
// const API_KEY = "Q2IH6S5fQTOctKD0msupuQ";
// const API_SECRET = "W6zLRhS95XD04PlanGPPOynfiFvnfExLMd2M";
// const payload = {
//   iss: API_KEY,
//   exp: new Date().getTime() + 5000,
// };

// const createMeeting = (user, body, options, registrants) => {
//   return new Promise(function (resolve, reject) {
//     request(options, async function (error, response, responseBody) {
//       if (error) {
//         console.log(error);
//         reject(error);
//       }
//       console.log("body: ", responseBody);
//       const { id, start_url, join_url, topic, timezone, created_at } =
//         responseBody;
//         console.log(user)
//       const meetingBody = {
//         createdBy: user._id,
//         meetingWith: body.meetingWith,
//         name: `${body.firstName} ${body.lastName}`,
//         creatorName:
//           user?.accountType === "Student"
//             ?`${user?.firstName} ${user?.middleName} ${user?.lastName}`
//             : user?.accountType === "Teacher"
//             ? `${user?.firstName} ${user?.middleName} ${user?.lastName}`
//             : "",
//         meetingId: id,
//         topic,
//         description: body.description,
//         startTime: body.startTime,
//         timezone,
//         start_url,
//         join_url,
//         created_at,
//       };
//       const meeting = await meeting.create(meetingBody);
//       resolve(meeting);
//     });
//   });
// };

// const getMeetings = async (id) => {
//   const meetings = await MeetingModel.find({
//     $or: [
//       { createdBy: ObjectId(id).toString() },
//       { meetingWith: ObjectId(id).toString() },
//     ],
//   });
//   return meetings;
// };

// module.exports = {
//   createMeeting,
//   getMeetings,
// };
