import api from './api';
import {
  mockCancelBooking,
  mockCreateBooking,
  mockGetMyBookings,
  wait,
} from './mockStore';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export async function createBooking(payload) {
  const token = localStorage.getItem('homeserve_token');
  if (USE_MOCK) {
    await wait();
    return mockCreateBooking(token, payload);
  }
  const { data } = await api.post('/bookings', payload);
  return data;
}

export async function getMyBookings() {
  const token = localStorage.getItem('homeserve_token');
  if (USE_MOCK) {
    await wait();
    return mockGetMyBookings(token);
  }
  const { data } = await api.get('/bookings/me');
  return data;
}

export async function cancelBooking(id) {
  const token = localStorage.getItem('homeserve_token');
  if (USE_MOCK) {
    await wait();
    return mockCancelBooking(token, id);
  }
  const { data } = await api.patch(`/bookings/${id}/cancel`);
  return data;
}
