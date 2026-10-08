const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/\/$/, "");

const API_ENDPOINT_BASES = {
  authentication: `${BASE_API_URL}/api/v1/authentication`,
  categories: `${BASE_API_URL}/api/v1/categories`,
  permissions: `${BASE_API_URL}/api/v1/permissions`,
  roles: `${BASE_API_URL}/api/v1/roles`,
  tools: `${BASE_API_URL}/api/v1/tools`,
  users: `${BASE_API_URL}/api/v1/users`,
};

const API_ROUTES = {
  authentication: {
    login: () => `${API_ENDPOINT_BASES.authentication}/login`,
    logout: () => `${API_ENDPOINT_BASES.authentication}/logout`,
    me: () => `${API_ENDPOINT_BASES.authentication}/me`,
    refreshToken: () => `${API_ENDPOINT_BASES.authentication}/refresh-token`,
  },
  categories: {
    create: () => `${API_ENDPOINT_BASES.categories}/`,
    readAllBy: (
      filters: {
        page?: number;
        limit?: number;
        name?: string;
        isActive?: boolean;
      } = {},
    ) => {
      const parameters = new URLSearchParams();

      if (filters.page !== undefined)
        parameters.append("page", filters.page.toString());
      if (filters.limit !== undefined)
        parameters.append("limit", filters.limit.toString());
      if (filters.name !== undefined) parameters.append("name", filters.name);
      if (filters.isActive !== undefined)
        parameters.append("is_active", filters.isActive.toString());

      const base = API_ENDPOINT_BASES.permissions.replace(/\/$/, "");
      const query = parameters.toString();

      return query ? `${base}/?${query}` : base;
    },
    update: (categoryID: number) =>
      `${API_ENDPOINT_BASES.categories}/id/${categoryID}`,
    delete: (categoryID: number) =>
      `${API_ENDPOINT_BASES.categories}/id/${categoryID}`,
  },
  permissions: {
    create: () => `${API_ENDPOINT_BASES.permissions}/`,
    readAllBy: (
      filters: {
        page?: number;
        limit?: number;
        code?: string;
        isActive?: boolean;
        userID?: number;
      } = {},
    ) => {
      const parameters = new URLSearchParams();

      if (filters.page !== undefined)
        parameters.append("page", filters.page.toString());
      if (filters.limit !== undefined)
        parameters.append("limit", filters.limit.toString());
      if (filters.code !== undefined) parameters.append("code", filters.code);
      if (filters.isActive !== undefined)
        parameters.append("is_active", filters.isActive.toString());
      if (filters.userID !== undefined)
        parameters.append("user_id", filters.userID.toString());

      const base = API_ENDPOINT_BASES.permissions.replace(/\/$/, "");
      const query = parameters.toString();

      return query ? `${base}/?${query}` : base;
    },
    update: (permissionID: number) =>
      `${API_ENDPOINT_BASES.permissions}/id/${permissionID}`,
    delete: (permissionID: number) =>
      `${API_ENDPOINT_BASES.permissions}/id/${permissionID}`,
  },
  roles: {
    create: () => `${API_ENDPOINT_BASES.roles}/`,
    readAllBy: (
      filters: {
        page?: number;
        limit?: number;
        code?: string;
        title?: string;
        isActive?: boolean;
      } = {},
    ) => {
      const parameters = new URLSearchParams();

      if (filters.page !== undefined)
        parameters.append("page", filters.page.toString());
      if (filters.limit !== undefined)
        parameters.append("limit", filters.limit.toString());
      if (filters.code !== undefined) parameters.append("code", filters.code);
      if (filters.title !== undefined)
        parameters.append("title", filters.title);
      if (filters.isActive !== undefined)
        parameters.append("is_active", filters.isActive.toString());

      const base = API_ENDPOINT_BASES.permissions.replace(/\/$/, "");
      const query = parameters.toString();

      return query ? `${base}/?${query}` : base;
    },
    update: (roleID: number) => `${API_ENDPOINT_BASES.roles}/id/${roleID}`,
    delete: (roleID: number) => `${API_ENDPOINT_BASES.roles}/id/${roleID}`,
  },
  tools: {
    create: () => `${API_ENDPOINT_BASES.tools}/`,
    readAllBy: (
      filters: {
        page?: number;
        limit?: number;
        name?: string;
        categoryName?: string;
        isActive?: boolean;
      } = {},
    ) => {
      const parameters = new URLSearchParams();

      if (filters.page !== undefined)
        parameters.append("page", filters.page.toString());
      if (filters.limit !== undefined)
        parameters.append("limit", filters.limit.toString());
      if (filters.name !== undefined) parameters.append("name", filters.name);
      if (filters.categoryName !== undefined)
        parameters.append("category_name", filters.categoryName);
      if (filters.isActive !== undefined)
        parameters.append("is_active", filters.isActive.toString());

      const base = API_ENDPOINT_BASES.permissions.replace(/\/$/, "");
      const query = parameters.toString();

      return query ? `${base}/?${query}` : base;
    },
    update: (toolID: number) => `${API_ENDPOINT_BASES.tools}/id/${toolID}`,
    delete: (toolID: number) => `${API_ENDPOINT_BASES.tools}/id/${toolID}`,
  },
  users: {
    create: () => `${API_ENDPOINT_BASES.users}/`,
    readAllBy: (
      filters: {
        page?: number;
        limit?: number;
        fullName?: string;
        email?: string;
        isActive?: boolean;
      } = {},
    ) => {
      const parameters = new URLSearchParams();

      if (filters.page !== undefined)
        parameters.append("page", filters.page.toString());
      if (filters.limit !== undefined)
        parameters.append("limit", filters.limit.toString());
      if (filters.fullName !== undefined)
        parameters.append("full_name", filters.fullName);
      if (filters.email !== undefined)
        parameters.append("email", filters.email);
      if (filters.isActive !== undefined)
        parameters.append("is_active", filters.isActive.toString());

      const base = API_ENDPOINT_BASES.permissions.replace(/\/$/, "");
      const query = parameters.toString();

      return query ? `${base}/?${query}` : base;
    },
    update: (userID: number) => `${API_ENDPOINT_BASES.users}/id/${userID}`,
    delete: (userID: number) => `${API_ENDPOINT_BASES.users}/id/${userID}`,
  },
};

export { API_ROUTES, BASE_API_URL };
