const Member = require("../models/Member");
const catchAsync = require("../Utils/catchAsyncError");
exports.createMember = catchAsync(async (req, res, next) => {
  const name = "Akshansh";
  const email = `AFSDFSDFshansh${Math.random() * 100}@gmail.com`;
  const password = "123";

  const createdMember = await Member.create({
    name,
    email,
  });

  res.status(200).json({
    status: "success",
    message: "contact created successfully",
    data: createdMember,
  });
});
