import axios from "axios";
import { AppConfig } from "../config/app-config";

export async function GetSimpsons() {
  try {
    let url = `${AppConfig.API_URL}`;

    let options = {
      url,
      headers: {
        "Content-Type": "application/json",
      },
      method: "get",
    };

    const res = await axios(options);
    if (res.status == 200) {
      return {
        success: true,
        data: res.data,
      };
    } else {
      return {
        error: true,
        errorMessage: "error.unknown_error",
        errorMessageTechnical:
          "Unknown response status. status: " + res.data.status,
      };
    }
  } catch (error) {
    console.log("--", error);

    return {
      error: true,
      data: null,
      errorMessage: "error.unknown_error",
      errorMessageTechnical: error?.message,
    };
  }
}
