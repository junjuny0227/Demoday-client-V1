import { AuthRequest } from "../../services/AuthRequest";

class SignoutController {
  static async signout(email: string): Promise<boolean> {
    return AuthRequest.getInstance().signout(email);
  }
}

export default SignoutController;
