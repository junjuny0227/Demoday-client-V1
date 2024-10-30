import { AuthRequest } from "../../services/AuthRequest";

class SignoutController {
  static async signout(token: string): Promise<boolean> {
    return AuthRequest.getInstance().signout(token);
  }
}

export default SignoutController;
