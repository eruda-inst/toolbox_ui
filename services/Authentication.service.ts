import { axiosClient } from "@/libraries/axiosClient.lib";
import { API_ROUTES } from "@/configurations/api.config";
import { AuthenticationOutSchema } from "@/schemas/authentication.schema";
import {
  AuthenticationInType,
  AuthenticationOutType,
} from "@/types/authentication.type";
import { UserOutSchema } from "@/schemas/user.schema";
import { UserOutType } from "@/types/user.type";

export default class AuthenticationService {
  static async me(): Promise<UserOutType> {
    const response = await axiosClient.get(API_ROUTES.authentication.me(), {
      withCredentials: true,
    });
    return UserOutSchema.parse(response.data);
  }

  static async login(
    credentials: AuthenticationInType,
  ): Promise<AuthenticationOutType> {
    const response = await axiosClient.post(
      API_ROUTES.authentication.login(),
      credentials,
    );
    return AuthenticationOutSchema.parse(response.data);
  }

  static async logout(): Promise<void> {
    await axiosClient.post(API_ROUTES.authentication.logout());
  }

  static async refreshToken(
    refreshToken: string,
  ): Promise<AuthenticationOutType> {
    const response = await axiosClient.post(
      API_ROUTES.authentication.refreshToken(),
      { refresh_token: refreshToken },
    );
    return AuthenticationOutSchema.parse(response.data);
  }
}
