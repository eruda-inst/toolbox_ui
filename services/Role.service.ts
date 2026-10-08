import { API_ROUTES } from "@/configurations/api.config";
import { axiosClient } from "@/libraries/axiosClient.lib";
import { ListOutSchema } from "@/schemas/meta.schema";
import { RoleOutSchema } from "@/schemas/role.schema";
import { ListOutType } from "@/types/meta.type";
import { RoleInType, RoleOutType, RoleUpdateType } from "@/types/role.type";

type RoleListOut = ListOutType<typeof RoleOutSchema>;

export default class RoleService {
  static async create(data: RoleInType): Promise<RoleOutType> {
    const response = await axiosClient.post(API_ROUTES.roles.create(), data);
    return RoleOutSchema.parse(response.data);
  }

  static async readAllBy(
    filters: {
      page?: number;
      limit?: number;
      code?: string;
      title?: string;
      isActive?: boolean;
    } = {},
  ): Promise<RoleListOut> {
    const response = await axiosClient.get(API_ROUTES.roles.readAllBy(filters));
    return ListOutSchema(RoleOutSchema).parse(response.data);
  }

  static async update(
    roleID: number,
    data: RoleUpdateType,
  ): Promise<RoleOutType> {
    const response = await axiosClient.patch(
      API_ROUTES.roles.update(roleID),
      data,
    );
    return RoleOutSchema.parse(response.data);
  }

  static async delete(roleID: number): Promise<void> {
    await axiosClient.delete(API_ROUTES.roles.delete(roleID));
  }
}
