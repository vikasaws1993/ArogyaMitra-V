// Removes OTP values from API responses in production (no SMS leak)
export const stripOtpInProduction = (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') return next();
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (body && typeof body === 'object') {
      delete body.otp;
      delete body.devOtp;
      if (body.data && typeof body.data === 'object') {
        delete body.data.otp;
        delete body.data.devOtp;
      }
    }
    return originalJson(body);
  };
  next();
};
