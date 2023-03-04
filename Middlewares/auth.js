const catchAsync = require("../Utils/catchAsyncError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
module.exports = catchAsync(async (req, res, next) => {
  let token = null;
  if (req.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new Error("Please login to get access"));
  }

  const decoded = await promisify(jwt.verify)(
    token,
    "-----BEGIN CERTIFICATE-----\nMIIDHTCCAgWgAwIBAgIJAKC/xzutIIHoMA0GCSqGSIb3DQEBBQUAMDExLzAtBgNV\nBAMMJnNlY3VyZXRva2VuLnN5c3RlbS5nc2VydmljZWFjY291bnQuY29tMB4XDTIz\nMDIyMzA5MzkyMFoXDTIzMDMxMTIxNTQyMFowMTEvMC0GA1UEAwwmc2VjdXJldG9r\nZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqGSIb3DQEBAQUA\nA4IBDwAwggEKAoIBAQC+4YrRPqPjObL8EMpQOtr2CUH/Pu7Xy9Z/NiR2r9t56mqh\nmQX/SwP2MmfiTp3k2mHudrvnkBp8NiPuxvLB1rtuNkh1ix/FtSqQiXsVrVJ35Gmd\nwtKgA/2o3ZKdxZg6MDTKH+E1QUwR3VKTEb9igsIYmbDY8U0XTYEUV4/pQtmKBl8j\nzAa926QAxlo4qvTTLVgtYz2Gcji279mwhEf8hkWjcQcHcdWAKI6SgWuDi4k6X6bQ\nd4XPXCkU8YyZzhFp6FY2WgQ1cFA4OWuWkl1+vL1wp7K6iCj4K247Ucw91+TtpIJw\nH3SA0YKg/byIKkT9GD1mkoi5fc/Ejzt8glEBMPmlAgMBAAGjODA2MAwGA1UdEwEB\n/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMCMA0G\nCSqGSIb3DQEBBQUAA4IBAQCe3MNiBa9b8H1M2mfebheLDBLvVoNVzkEgfDE4dcC3\nsAWLYlwrS9XSYTQzDNcI4x7x3f6oQ+r3atbAS/xUnyc+if4mzAg0xYnuNjz4VzRT\nMFdlCQ03ieZ0Gm/kTBfdDtIYm9ouMJNvjaS0HtDt9WG7r2VgNX1wdnB8krDcX0jj\n8c1fuObmSldv5XYIODiPdD5m2Xf3iFBTrlmrasSBzyUxuycUuZG55aPjOImed+yj\nZWq4oVZCdOIddtzvOie/bhGESEVJYNTL3NtvO1bCY4GGpcbosJCPttw3ZmHHuzeh\nFEMDpKJjVObSMtw5LKLzIK2R0PinpvXUIB/m9tp11qg6\n-----END CERTIFICATE-----\n",
    {
      algorithms: ["RS256"],
    }
  );

  

  req.profile = decoded;
  next();
});
