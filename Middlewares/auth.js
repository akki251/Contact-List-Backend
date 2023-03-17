const catchAsync = require("../Utils/catchAsyncError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { log } = require("console");
module.exports = catchAsync(async (req, res, next) => {
  let token = null;

  // checking token in the header
  if (req.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new Error("Please login to get access"));
  }

  const tokenResponse = await fetch(
    "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
  );

  const tokenData = await tokenResponse.json();

  const decoded = await promisify(jwt.verify)(
    token,
    Object.values(tokenData)[0],
    {
      algorithms: ["RS256"],
    }
  );

  // attaching user profile on the request for further use
  req.profile = decoded;
  next();
});
