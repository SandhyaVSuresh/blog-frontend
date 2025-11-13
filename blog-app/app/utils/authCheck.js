"use client";

export const checkAuth = (router) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/auth/login');
      return false;
    }
    return true;
  }
  return false;
};