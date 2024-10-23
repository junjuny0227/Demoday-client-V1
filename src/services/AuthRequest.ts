import axios, { AxiosResponse } from "axios";

const API_URL: string = "https://port-0-demoday-server-v1-lzsaeexf05f2c47e.sel4.cloudtype.app/api/v1/auth";

interface IRequest {
  signup(phoneNumber: string, password: string): Promise<boolean>;
  signin(phoneNumber: string, password: string): Promise<boolean>;
}

class AuthRequest implements IRequest {
  private static instance: AuthRequest;

  private constructor() {}

  public static getInstance(): AuthRequest {
    if (!AuthRequest.instance) {
      AuthRequest.instance = new AuthRequest();
    }
    return AuthRequest.instance;
  }

  public async signup(phoneNumber: string, password: string): Promise<boolean> {
    return this.makeRequest("signup", phoneNumber, password);
  }

  public async signin(phoneNumber: string, password: string): Promise<boolean> {
    return this.makeRequest("signin", phoneNumber, password);
  }

  private async makeRequest(type: string, phoneNumber: string, password: string): Promise<boolean> {
    try {
      if (!phoneNumber || !password) {
        throw new Error("Invalid input");
      }

      const response: AxiosResponse = await axios.post(
        `${API_URL}/${type}`,
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
      AuthErrorHandler.handleError(error);
      return false;
    }
  }
}

class AuthErrorHandler {
  public static handleError(error: any): void {
    if (error instanceof Error) {
      throw new Error(`error: ${error.message}`);
    } else {
      throw new Error(`error: ${error}`);
    }
  }
}

export { AuthRequest, AuthErrorHandler };
