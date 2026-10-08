import { API_ROUTES } from "@/configurations/api.config";
import { axiosClient } from "@/libraries/axiosClient.lib";
import { CategoryOutSchema } from "@/schemas/category.schema";
import { ListOutSchema } from "@/schemas/meta.schema";
import {
  CategoryInType,
  CategoryOutType,
  CategoryUpdateType,
} from "@/types/category.type";
import { ListOutType } from "@/types/meta.type";

type CategoryListOut = ListOutType<typeof CategoryOutSchema>;

export default class CategoryService {
  static async create(data: CategoryInType): Promise<CategoryOutType> {
    const response = await axiosClient.post(
      API_ROUTES.categories.create(),
      data,
    );
    return CategoryOutSchema.parse(response.data);
  }

  static async readAllBy(
    filters: {
      page?: number;
      limit?: number;
      name?: string;
      isActive?: boolean;
    } = {},
  ): Promise<CategoryListOut> {
    const response = await axiosClient.get(
      API_ROUTES.categories.readAllBy(filters),
    );
    return ListOutSchema(CategoryOutSchema).parse(response.data);
  }

  static async update(
    categoryID: number,
    data: CategoryUpdateType,
  ): Promise<CategoryOutType> {
    const response = await axiosClient.patch(
      API_ROUTES.categories.update(categoryID),
      data,
    );
    return CategoryOutSchema.parse(response.data);
  }

  static async delete(categoryID: number): Promise<void> {
    await axiosClient.delete(API_ROUTES.categories.delete(categoryID));
  }
}
