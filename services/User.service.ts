import { API_ROUTES } from "@/configurations/api.config";
import { axiosClient } from "@/libraries/axiosClient.lib";
import { ListOutSchema } from "@/schemas/meta.schema";
import { UserOutSchema } from "@/schemas/user.schema";
import { ListOutType } from "@/types/meta.type";
import { UserInType, UserOutType, UserUpdateType } from "@/types/user.type";

type UserListOut = ListOutType<typeof UserOutSchema>;

export default class UserService {
  static async create(data: UserInType): Promise<UserOutType> {
    const response = await axiosClient.post(API_ROUTES.users.create(), data);
    return UserOutSchema.parse(response.data);
  }

  static async readAllBy(
    filters: {
      page?: number;
      limit?: number;
      fullName?: string;
      email?: string;
      isActive?: boolean;
    } = {},
  ): Promise<UserListOut> {
    const response = await axiosClient.get(API_ROUTES.users.readAllBy(filters));
    return ListOutSchema(UserOutSchema).parse(response.data);
  }

  static async update(
    userID: number,
    data: UserUpdateType,
  ): Promise<UserOutType> {
    const response = await axiosClient.patch(
      API_ROUTES.users.update(userID),
      data,
    );
    return UserOutSchema.parse(response.data);
  }

  static async delete(userID: number): Promise<void> {
    await axiosClient.delete(API_ROUTES.users.delete(userID));
  }
}
