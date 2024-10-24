import { AuthRequest, AuthErrorHandler, AuthErrorCreator } from "../../services/AuthRequest";

class SigninService {
  public static async signin(email: string, password: string): Promise<boolean> {
    try {
      const response: boolean = await AuthRequest.getInstance().signin(email, password);
      if (response) {
        return response;
      } else {
        throw AuthErrorCreator.createError("signin failed");
      }
    } catch (error) {
      AuthErrorHandler.handleError(error);
    }
    return false;
  }
}

class SigninController {
  static async signin(email: string, password: string): Promise<boolean> {
    return SigninService.signin(email, password);
  }
}

export default SigninController;
