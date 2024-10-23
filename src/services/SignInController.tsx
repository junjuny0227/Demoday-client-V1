import axios from "axios";
const API_URL = "https://port-0-demoday-server-v1-lzsaeexf05f2c47e.sel4.cloudtype.app/api/v1/auth";

class SigninRequest {
  private static instance: SigninRequest;

  private constructor() {}

  public static getInstance(): SigninRequest {
    if (!SigninRequest.instance) {
      SigninRequest.instance = new SigninRequest();
    }
    return SigninRequest.instance;
  }

  public async signin(phoneNumber: string, password: string): Promise<boolean> {
    try {
      if (!phoneNumber) {
        throw new Error("Invalid input");
      }

      const response = await axios.post(
        `${API_URL}/signin`,
        { phoneNumber, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`error : ${response.statusText}`);
      }

      return response.status === 200;
    } catch (error) {
      throw new Error(`error : ${(error as Error).message}`);
    }
  }
}

class SigninService {
  public static async signin(phoneNumber: string, password: string): Promise<boolean> {
    try {
      const response = await SigninRequest.getInstance().signin(phoneNumber, password);
      if (response) {
        return response;
      } else {
        throw new Error("Signin failed");
      }
    } catch (error) {
      throw new Error(`error : ${(error as Error).message}`);
    }
  }
}

export default SigninService;
