import api from './api';
import {
  mockGetAllBookings,
  mockGetStats,
  mockGetUsers,
  mockUpdateBookingStatus,
  wait,
} from './mockStore';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export async function getAdminStats() {
  const token = localStorage.getItem('homeserve_token');
  if (USE_MOCK) {
    await wait();
    return mockGetStats(token);
  }
  const { data } = await api.get('/admin/stats');
  return data;
}

export async function getUsers() {
  const token = localStorage.getItem('homeserve_token');
  if (USE_MOCK) {
    await wait();
    return mockGetUsers(token);
  }
  const { data } = await api.get('/users');
  return data;
}

export async function getAllBookings() {
  const token = localStorage.getItem('homeserve_token');
  if (USE_MOCK) {
    await wait();
    return mockGetAllBookings(token);
  }
  const { data } = await api.get('/bookings');
  return data;
}

export async function updateBookingStatus(id, status) {
  const token = localStorage.getItem('homeserve_token');
  if (USE_MOCK) {
    await wait();
    return mockUpdateBookingStatus(token, id, status);
  }
  const { data } = await api.patch(`/bookings/${id}`, { status });
  return data;
}
