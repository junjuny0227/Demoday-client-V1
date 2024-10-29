import { AuthRequest, AuthErrorHandler } from "../../services/AuthRequest";

class SignupService {
  public static async signup(name: string, email: string, password: string): Promise<boolean> {
    try {
      const response: boolean = await AuthRequest.getInstance().signup(name, email, password);
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
  static async signup(name: string, email: string, password: string): Promise<boolean> {
    return SignupService.signup(name, email, password);
  }
}

export default SignupController;
