import { API_ROUTES } from "@/configurations/api.config";
import { axiosClient } from "@/libraries/axiosClient.lib";
import { ListOutSchema } from "@/schemas/meta.schema";
import { PermissionOutSchema } from "@/schemas/permission.schema";
import { ListOutType } from "@/types/meta.type";
import {
  PermissionInType,
  PermissionOutType,
  PermissionUpdateType,
} from "@/types/permission.type";

type PermissionListOut = ListOutType<typeof PermissionOutSchema>;

export default class PermissionService {
  static async create(data: PermissionInType): Promise<PermissionOutType> {
    const response = await axiosClient.post(
      API_ROUTES.permissions.create(),
      data,
    );
    return PermissionOutSchema.parse(response.data);
  }

  static async readAllBy(
    filters: {
      page?: number;
      limit?: number;
      code?: string;
      isActive?: boolean;
      userID?: number;
    } = {},
  ): Promise<PermissionListOut> {
    const response = await axiosClient.get(
      API_ROUTES.permissions.readAllBy(filters),
    );
    return ListOutSchema(PermissionOutSchema).parse(response.data);
  }

  static async update(
    permissionID: number,
    data: PermissionUpdateType,
  ): Promise<PermissionOutType> {
    const response = await axiosClient.patch(
      API_ROUTES.permissions.update(permissionID),
      data,
    );
    return PermissionOutSchema.parse(response.data);
  }

  static async delete(permissionID: number): Promise<void> {
    await axiosClient.delete(API_ROUTES.permissions.delete(permissionID));
  }
}
