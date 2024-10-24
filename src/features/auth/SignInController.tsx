import { AuthRequest, AuthErrorHandler } from "../../services/AuthRequest";

class SigninService {
  public static async signin(phoneNumber: string, password: string): Promise<boolean> {
    try {
      const response: boolean = await AuthRequest.getInstance().signin(phoneNumber, password);
      if (response) {
        return response;
      } else {
        throw new Error("Signin failed");
      }
    } catch (error) {
      AuthErrorHandler.handleError(error);
    }
    return false;
  }
}

class SigninController {
  static async signin(phoneNumber: string, password: string): Promise<boolean> {
    return SigninService.signin(phoneNumber, password);
  }
}

export default SigninController;
