import {
  generateOtp,
  storeOtp,
  verifyOtp,
  isEmailVerified,
} from "../utils/otp";

class OtpService {
  async requestSignupOtp(email: string) {
    const otp = generateOtp();

    await storeOtp(email, otp);

    return otp;
  }
  async verifySignupOtp(email: string, otp: string) {
  return verifyOtp(email, otp);
}

async checkEmailVerified(email: string) {
  return isEmailVerified(email);
}
}

export default OtpService;