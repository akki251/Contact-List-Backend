const Contact = require("../models/Contact");
const catchAsync = require("../Utils/catchAsyncError");
const mongoose = require("mongoose");
const Member = require("../models/Member");

exports.getAllContacts = catchAsync(async (req, res, next) => {
  const profile = req.profile;
  let allContacts;
  // check new user
  const ifUserExists = await Member.findOne({ email: profile.email });

  if (ifUserExists) {
    allContacts = await ifUserExists.populate("contacts");
  } else {
    const newUser = await Member.create({
      name: profile.name,
      email: profile.email,
    });
    allContacts = newUser.populate("contacts");
  }

  res.status(200).json({
    status: "success",
    data: allContacts,
  });
});

exports.createContact = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const contact_number = req.body.contact_number;

  const profile = req.profile;
  const newContact = await Contact.create({
    name,
    contact_number,
  });

  const memberRegistered = await Member.findOne({ email: profile.email });

  memberRegistered.contacts.push(newContact);

  await memberRegistered.save();

  res.status(200).json({
    status: "success",
    message: "contact created successfully",
    data: newContact,
  });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const { id: contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return next(new Error("Invalid contact ID"));
  }

  await Contact.findByIdAndDelete(contactId);

  res.status(204).json({
    status: "success",
    message: "contact deleted successfully",
  });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const contactId = req.params.id;
  const updatedName = req.body.name;
  const updatePhoneNumber = req.body.contact_number;

  //   find specific contact
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      contact_number: updatePhoneNumber,
      name: updatedName,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "contact updated successfully",
    data: updatedContact,
  });
});
