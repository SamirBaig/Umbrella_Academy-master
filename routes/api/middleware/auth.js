// const verifyAndIdentifyToken = (req, res, next) => {
//   let token = req.headers["x-access-token"] || req.headers["authorization"];
//   if (token) {
//     if (token.startsWith("Bearer ")) {
//       token = token.slice(7, token.length);
//     }
//     console.log("token=======>" , token)
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       const accountType = decoded?.accountType;
//      console.log ();
//      console.log(err)
//       if (err) {accountType
//         return res.status(httpStatus.UNAUTHORIZED).json({
//           success: false,
//           code: "token-invalid",
//           message: "Token is not valid",
//         }); 
//       } else {
//         const model =
//           accountType === "Teacher"
//             ? userModel
//            : accountType === "Student"
//             ? institutionModel
//             : userModel;
//         model.findOne({ _id: decoded._id }, function (err, user) {
//           if (err) {
//             return res.status(httpStatus.UNAUTHORIZED).json({
//               success: false,
//               code: "token-invalid",
//               message: "Token is not valid" ,
//             });
//           }
//           if (!user) {
//             return res.status(httpStatus.UNAUTHORIZED).json({
//               success: false,
//               code: "token-invalid",
//               message: "Token is not valid",
//             });
//           }
//           req.authUser = { ...user?._doc, accountType };
//           next();
//         });
//       }
//     });
//   } else {
//     return res.status(httpStatus.UNAUTHORIZED).json({
//       success: false,
//       code: "token-invalid",
//       message: "Auth token is not supplied",
//     });
//   }
// };