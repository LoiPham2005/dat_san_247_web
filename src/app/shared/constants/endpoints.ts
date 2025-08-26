const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    profile: "/auth/profile",
    logout: "/auth/logout",
  },
  sportCategories: {
    getAll: "/sport-categories",
    create: "/sport-categories",
    update: (id: number) => `/sport-categories/${id}`,
    delete: (id: number) => `/sport-categories/${id}`,
  },
  bookings: {
    getAll: "/bookings",
    create: "/bookings",
    cancel: (id: number) => `/bookings/${id}/cancel`,
  },
};

export default endpoints;
