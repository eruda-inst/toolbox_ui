import { API_ROUTES } from "@/configurations/api.config";
import { axiosClient } from "@/libraries/axiosClient.lib";
import { ListOutSchema } from "@/schemas/meta.schema";
import { ToolOutSchema } from "@/schemas/tool.schema";
import { ListOutType } from "@/types/meta.type";
import { ToolInType, ToolOutType, ToolUpdateType } from "@/types/tool.type";

type ToolListOut = ListOutType<typeof ToolOutSchema>;

export default class ToolService {
  static async create(data: ToolInType): Promise<ToolOutType> {
    const response = await axiosClient.post(API_ROUTES.tools.create(), data);
    return ToolOutSchema.parse(response.data);
  }

  static async readAllBy(
    filters: {
      page?: number;
      limit?: number;
      name?: string;
      categoryName?: string;
      isActive?: boolean;
    } = {},
  ): Promise<ToolListOut> {
    const response = await axiosClient.get(API_ROUTES.tools.readAllBy(filters));
    return ListOutSchema(ToolOutSchema).parse(response.data);
  }

  static async update(
    toolID: number,
    data: ToolUpdateType,
  ): Promise<ToolOutType> {
    const response = await axiosClient.patch(
      API_ROUTES.tools.update(toolID),
      data,
    );
    return ToolOutSchema.parse(response.data);
  }

  static async delete(toolID: number): Promise<void> {
    await axiosClient.delete(API_ROUTES.tools.delete(toolID));
  }
}
