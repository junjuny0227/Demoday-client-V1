import { AuthRequest, AuthErrorHandler } from "../../services/AuthRequest";

class SignupService {
  public static async signup(email: string, password: string): Promise<boolean> {
    try {
      const response: boolean = await AuthRequest.getInstance().signup(email, password);
      if (response) {
        return response;
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      AuthErrorHandler.handleError(error);
    }
    return false;
  }
}

class SignupController {
  static async signup(email: string, password: string): Promise<boolean> {
    return SignupService.signup(email, password);
  }
}

export default SignupController;
