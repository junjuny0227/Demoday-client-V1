import axios from "axios";
const API_URL = "https://port-0-demoday-server-v1-lzsaeexf05f2c47e.sel4.cloudtype.app/api/v1/auth";

export const SignupController = {
  signup: async (phoneNumber: string, password: string): Promise<boolean> => {
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
      throw new Error(`error: ${(error as Error).message}`);
    }
  },
};
