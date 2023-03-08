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

  const decoded = await promisify(jwt.verify)(
    token,
    "-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIIRHktzRZ0tvgwDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAwwmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjMw\nMzAzMDkzOTIxWhcNMjMwMzE5MjE1NDIxWjAxMS8wLQYDVQQDDCZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBAMX5e9QHV4Z/CKVkkMoGkyBUAPHSNLETHoE7jL0gF/rUHaBk\n/ZOxDvy3ksMPXH+sUqGN9dE8RFq1csnlr+5U00HBMmjd88F0v0nfOqD+H1b9lLhM\nXIcRhOTj3W9ZzD0mQPMNxJkFVgwVIw1Wg+lpAuqhQOjckGBf/tB1O2+T21Zqq2is\ngvaikWLJHeGhvmEEwwC/JcHufT62+EHVSFN+7CEH7rOLrEArBiNHNba9ljzk5fDC\nURse3NBtYtWZpmIq3oBsV7JIXDWOkQdg9TTeX6UmD6jkVHHYtJaoHH4RPvOAO2a8\nexxGZpW1KRMLZpAJyGJmjBT0R4jqw93QnBHylkMCAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBAB+B5DDL9P6UkhuNX642m2Biglk+mc2H1habovwm3oeT\nBkXNmhi+CuKPnkZyHvP0tnmxslB4xecg+CjTlRRqjt+mopqm/zwT0xagYkmCL3oC\nOGeLuOLRyFve9sghJi7xzGmT/gEIT3H5QmIwnq9xDxBG/iAqgy9PFFho78rz7Cdv\nmet/L5poV0y00NJ3SX6XxPvt+FBd8qyv1HxEV/RXFYJ4gNWVy6kEh/D9bvSgbvnh\n1LkJt+shUKrc+Ade2vrCq70MgA5199Vrt99aYy+TKakX8VAluyiiZplHpfQCxh//\nHl6FoA41EBwkroVue02YguO8efqFTwDnb0GsmHRPvg0=\n-----END CERTIFICATE-----\n",
    {
      algorithms: ["RS256"],
    }
  );

  // attaching user profile on the request for further use
  req.profile = decoded;
  next();
});
