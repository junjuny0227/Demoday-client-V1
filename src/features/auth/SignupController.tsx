import AuthService from "./AuthService";
import { AuthRequest } from "../../services/AuthRequest";

class SignupService {
  public static async signup(email: string, password: string): Promise<boolean> {
    return AuthService.authenticate(AuthRequest.getInstance().signup, email, password, "signup");
  }
}

class SignupController {
  static async signup(email: string, password: string): Promise<boolean> {
    return SignupService.signup(email, password);
  }
}

export default SignupController;
