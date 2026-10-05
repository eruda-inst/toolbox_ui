const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/\/$/, "");

const API_ENDPOINT_BASES = {
  authentication: `${BASE_API_URL}/api/v1/authentication`,
  permissions: `${BASE_API_URL}/api/v1/permissions`,
};

const API_ROUTES = {
  authentication: {
    login: () => `${API_ENDPOINT_BASES.authentication}/login`,
    logout: () => `${API_ENDPOINT_BASES.authentication}/logout`,
    me: () => `${API_ENDPOINT_BASES.authentication}/me`,
    refreshToken: () => `${API_ENDPOINT_BASES.authentication}/refresh-token`,
  },
  permissions: {
    readAllBy: (
      filters: {
        page?: number;
        limit?: number;
        code?: string;
        isActive?: boolean;
        userID?: number;
      } = {},
    ) => {
      const params = new URLSearchParams();

      if (filters.page !== undefined)
        params.append("page", filters.page.toString());
      if (filters.limit !== undefined)
        params.append("limit", filters.limit.toString());
      if (filters.code !== undefined) params.append("code", filters.code);
      if (filters.isActive !== undefined)
        params.append("is_active", filters.isActive.toString());
      if (filters.userID !== undefined)
        params.append("user_id", filters.userID.toString());

      const base = API_ENDPOINT_BASES.permissions.replace(/\/$/, "");
      const query = params.toString();

      return query ? `${base}/?${query}` : base;
    },
  },
};

export { API_ROUTES, BASE_API_URL };
