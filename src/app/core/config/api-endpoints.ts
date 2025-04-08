export const API_ENDPOINTS = {

  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/users/create'
  },

  USERS: {
    GET_ALL: '/users/',
    GET_BY_ID: (id: number) => `/users/${id}`,
    GET_BY_EMAIL: (email: string) => `/users/email/${email}`,
    GET_BY_PHONE: (phone: string) => `/users/phone/${phone}`,
    GET_CLIENTS: (userId: number) => `/users/clients/${userId}`
  },

  CLIENTS: {
    CREATE: '/clients/create',
    GET_ALL: '/clients/',
    GET_BY_ID: (id: number) => `/clients/${id}`,
    GET_BY_EMAIL: (email: string) => `/clients/email/${email}`,
    GET_BY_PHONE: (phone: string) => `/clients/phone/${phone}`,
    GET_COMMERCIAL: (clientId: number) => `/clients/commercial/${clientId}`,
    GET_MEETINGS: (clientId: number) => `/clients/meetings/${clientId}`,
    GET_DEMANDS: (clientId: number) => `/clients/demands/${clientId}`
  },

  MEETINGS: {
    CREATE: '/meetings/create',
    GET_ALL: '/meetings/',
    GET_BY_ID: (id: number) => `/meetings/${id}`,
    DELETE: (id: number) => `/meetings/delete/${id}`,
    UPDATE_STATUS: (id: number) => `/meetings/update-status/${id}`,
    UPDATE_MOTIF: (id: number) => `/meetings/update-motif/${id}`,
    GET_CLIENT: (meetingId: number) => `/meetings/client/${meetingId}`
  },

  DEMANDS: {
    CREATE: '/demands/create',
    GET_ALL: '/demands/',
    GET_BY_ID: (id: number) => `/demands/${id}`,
    GET_BY_CLIENT: (clientId: number) => `/demands/client/${clientId}`,
    GET_BY_CATEGORY: (categoryId: number) => `/demands/category/${categoryId}`,
    UPDATE_STATUS: '/demands/update/status'
  },

  CATEGORIES: {
    CREATE: '/categories/create',
    GET_ALL: '/categories/',
    GET_BY_ID: (id: number) => `/categories/${id}`,
    GET_BY_LABEL: (label: string) => `/categories/label/${label}`
  }
};
