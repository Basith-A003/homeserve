import api from './api';
import {
  mockCreateService,
  mockDeleteService,
  mockGetServiceById,
  mockGetServices,
  mockUpdateService,
  wait,
} from './mockStore';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export async function getServices(params = {}) {
  if (USE_MOCK) {
    await wait();
    return mockGetServices(params);
  }
  const { data } = await api.get('/services', { params });
  return data;
}

export async function getServiceById(id) {
  if (USE_MOCK) {
    await wait();
    return mockGetServiceById(id);
  }
  const { data } = await api.get(`/services/${id}`);
  return data;
}

export async function createService(payload) {
  const token = localStorage.getItem('homeserve_token');
  if (USE_MOCK) {
    await wait();
    return mockCreateService(token, payload);
  }
  const { data } = await api.post('/services', payload);
  return data;
}

export async function updateService(id, payload) {
  const token = localStorage.getItem('homeserve_token');
  if (USE_MOCK) {
    await wait();
    return mockUpdateService(token, id, payload);
  }
  const { data } = await api.put(`/services/${id}`, payload);
  return data;
}

export async function deleteService(id) {
  const token = localStorage.getItem('homeserve_token');
  if (USE_MOCK) {
    await wait();
    return mockDeleteService(token, id);
  }
  const { data } = await api.delete(`/services/${id}`);
  return data;
}
