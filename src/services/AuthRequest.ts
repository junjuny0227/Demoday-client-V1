import axios, { AxiosResponse } from "axios";

const API_URL: string = "https://port-0-demoday-server-v1-lzsaeexf05f2c47e.sel4.cloudtype.app/api/v1/auth";

interface IRequest {
  signup(email: string, password: string): Promise<boolean>;
  signin(email: string, password: string): Promise<boolean>;
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

  public async signup(email: string, password: string): Promise<boolean> {
    return this.makeRequest("signup", email, password);
  }

  public async signin(email: string, password: string): Promise<boolean> {
    return this.makeRequest("signin", email, password);
  }

  private async makeRequest(type: string, email: string, password: string): Promise<boolean> {
    try {
      if (!email || !password) {
        throw AuthErrorHandler.createError("invalid input");
      }

      const response: AxiosResponse = await axios.post(
        `${API_URL}/${type}`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw AuthErrorHandler.createError(response.statusText);
      }

      return response.status === 200;
    } catch (error) {
      AuthErrorHandler.handleError(error);
      return false;
    }
  }
}

class AuthErrorHandler {
  public static createError(message: string): Error {
    return new Error(`error: ${message}`);
  }

  public static handleError(error: any): void {
    if (error instanceof Error) {
      throw error;
    } else {
      throw this.createError(String(error));
    }
  }
}

export { AuthRequest, AuthErrorHandler };
