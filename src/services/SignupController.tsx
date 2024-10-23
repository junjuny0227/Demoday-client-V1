import axios from "axios";
const API_URL = "https://port-0-demoday-server-v1-lzsaeexf05f2c47e.sel4.cloudtype.app/api/v1/auth";

class SignupController {
  static async signup(phoneNumber: string, password: string): Promise<boolean> {
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
export default SignupController;
