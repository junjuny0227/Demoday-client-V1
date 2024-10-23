import axios from "axios";
const API_URL = "https://port-0-demoday-server-v1-lzsaeexf05f2c47e.sel4.cloudtype.app/api/v1/auth";

class SignupRequest {
  private static instance: SignupRequest;

  private constructor() {}

  public static getInstance(): SignupRequest {
    if (!SignupRequest.instance) {
      SignupRequest.instance = new SignupRequest();
    }
    return SignupRequest.instance;
  }

  public async signup(phoneNumber: string, password: string): Promise<boolean> {
    try {
      if (!phoneNumber || !password) {
        throw new Error("Invalid input");
      }

      const response = await axios.post(
        `${API_URL}/signup`,
        { phoneNumber, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`error: ${response.statusText}`);
      }

      return response.status === 200;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`error: ${error.message}`);
      } else {
        throw new Error(`error: ${error}`);
      }
    }
  }
}

class SignupErrorHandler {
  public static handleError(error: any): void {
    if (error instanceof Error) {
      throw new Error(`error: ${error.message}`);
    } else {
      throw new Error(`error: ${error}`);
    }
  }
}

class SignupService {
  public static async signup(phoneNumber: string, password: string): Promise<boolean> {
    try {
      const response = await SignupRequest.getInstance().signup(phoneNumber, password);
      if (response) {
        return response;
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      SignupErrorHandler.handleError(error);
    }
    return false;
  }
}

class SignupController {
  static async signup(phoneNumber: string, password: string): Promise<boolean> {
    return SignupService.signup(phoneNumber, password);
  }
}

export default SignupController;
