import { API_ROUTES } from "@/configurations/api.config";
import { axiosClient } from "@/libraries/axiosClient.lib";
import { ListOutSchema } from "@/schemas/meta.schema";
import { PermissionOutSchema } from "@/schemas/permission.schema";
import { ListOutType } from "@/types/meta.type";

type PermissionListOut = ListOutType<typeof PermissionOutSchema>;

export default class PermissionService {
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
}
