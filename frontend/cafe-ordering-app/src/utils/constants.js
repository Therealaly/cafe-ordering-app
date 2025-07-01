// Common constants used across the admin interface
export const MENU_CATEGORIES = {
  MAKANAN: 'Makanan',
  MINUMAN: 'Minuman',
  CEMILAN: 'Cemilan',
};

export const USER_ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  KASIR: 'kasir',
  USER: 'user',
};

export const ROLE_ORDER = {
  [USER_ROLES.SUPERADMIN]: 0,
  [USER_ROLES.ADMIN]: 1,
  [USER_ROLES.KASIR]: 2,
  [USER_ROLES.USER]: 3,
};

export const PAGINATION_CONFIG = {
  ITEMS_PER_PAGE: 10,
  MENU_ITEMS_PER_PAGE: 6,
};

export const API_ENDPOINTS = {
  BASE_URL: 'http://localhost:5000/api',
  MENU: '/menu',
  PROMO: '/promo',
  AUTH: '/auth',
};

export const MESSAGES = {
  CONFIRM_DELETE_MENU: (name) => `Apakah Anda yakin ingin menghapus menu "${name}"?`,
  CONFIRM_DELETE_USER: (name) => `Apakah Anda yakin ingin menghapus user "${name}"?`,
  CONFIRM_DELETE_BANNER: 'Apakah yakin ingin menghapus banner ini?',
  ERROR_DELETE_MENU: 'Gagal menghapus menu: ',
  ERROR_DELETE_USER: 'Gagal menghapus user: ',
  ERROR_SAVE_MENU: 'Gagal menyimpan menu: ',
  ERROR_SAVE_USER: 'Gagal menyimpan user: ',
};
