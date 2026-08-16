import api from './api';
import {
  mockGetMe,
  mockLogin,
  mockRegister,
  mockUpdateProfile,
  wait,
} from './mockStore';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export async function registerUser(payload) {
  if (USE_MOCK) {
    await wait();
    return mockRegister(payload);
  }
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function loginUser(payload) {
  if (USE_MOCK) {
    await wait();
    return mockLogin(payload);
  }
  const { data } = await api.post('/auth/login', payload);
  return data;
}

export async function getMe() {
  const token = localStorage.getItem('homeserve_token');
  if (USE_MOCK) {
    await wait(150);
    return mockGetMe(token);
  }
  const { data } = await api.get('/auth/me');
  return data;
}

export async function updateProfile(payload) {
  const token = localStorage.getItem('homeserve_token');
  if (USE_MOCK) {
    await wait();
    return mockUpdateProfile(token, payload);
  }
  const { data } = await api.put('/users/me', payload);
  return data;
}
