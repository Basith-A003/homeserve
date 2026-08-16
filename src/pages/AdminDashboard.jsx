import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { getAdminStats, getAllBookings, getUsers, updateBookingStatus } from '../services/adminService';
import { CATEGORIES, getCategoryImage } from '../services/mockStore';
import { createService, deleteService, getServices, updateService } from '../services/serviceService';

const emptyService = {
  name: '',
  description: '',
  price: '',
  category: 'AC Repair',
  provider: '',
  image: '',
};

export default function AdminDashboard() {
  const [tab, setTab] = useState('services');
  const [stats, setStats] = useState(null);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(emptyService);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const refresh = async () => {
    setLoading(true);
    setError('');
    try {
      const [nextStats, nextServices, nextUsers, nextBookings] = await Promise.all([
        getAdminStats(),
        getServices(),
        getUsers(),
        getAllBookings(),
      ]);
      setStats(nextStats);
      setServices(nextServices);
      setUsers(nextUsers);
      setBookings(nextBookings);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleServiceSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (!form.name.trim() || !form.description.trim() || !form.price || !form.provider.trim()) {
        throw new Error('Fill all service fields');
      }
      if (editingId) {
        await updateService(editingId, form);
      } else {
        await createService(form);
      }
      setForm(emptyService);
      setEditingId('');
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (id) => {
    setError('');
    try {
      await deleteService(id);
      await refresh();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatus = async (id, status) => {
    setError('');
    try {
      await updateBookingStatus(id, status);
      await refresh();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container section">
      <h1>Admin dashboard</h1>
      {error && <p className="alert alert-error">{error}</p>}
      {loading && <Spinner />}
      {!loading && stats && (
        <div className="stats-grid">
          <article className="stat-card">
            <p>Total users</p>
            <strong>{stats.totalUsers}</strong>
          </article>
          <article className="stat-card">
            <p>Total services</p>
            <strong>{stats.totalServices}</strong>
          </article>
          <article className="stat-card">
            <p>Total bookings</p>
            <strong>{stats.totalBookings}</strong>
          </article>
        </div>
      )}

      <div className="tabs">
        <button className={tab === 'services' ? 'active' : ''} type="button" onClick={() => setTab('services')}>
          Manage Services
        </button>
        <button className={tab === 'users' ? 'active' : ''} type="button" onClick={() => setTab('users')}>
          Manage Users
        </button>
        <button className={tab === 'bookings' ? 'active' : ''} type="button" onClick={() => setTab('bookings')}>
          Manage Bookings
        </button>
      </div>

      {tab === 'services' && (
        <div>
          <form className="card form-card admin-form" onSubmit={handleServiceSubmit}>
            <h2>{editingId ? 'Edit service' : 'Add service'}</h2>
            <label>
              Service name
              <input
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              />
            </label>
            <label>
              Description
              <textarea
                rows="3"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              />
            </label>
            <label>
              Price
              <input
                type="number"
                min="1"
                value={form.price}
                onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
              />
            </label>
            <label>
              Category
              <select
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              >
                {CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Provider name
              <input
                value={form.provider}
                onChange={(e) => setForm((prev) => ({ ...prev, provider: e.target.value }))}
              />
            </label>
            <label>
              Image URL
              <input
                value={form.image}
                placeholder="Optional — uses category photo if empty"
                onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
              />
            </label>
            <div className="btn-row">
              <button className="btn btn-primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : editingId ? 'Update service' : 'Add service'}
              </button>
              {editingId && (
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => {
                    setEditingId('');
                    setForm(emptyService);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Provider</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <div className="table-service">
                        <img src={service.image || getCategoryImage(service.category)} alt="" />
                        {service.name}
                      </div>
                    </td>
                    <td>{service.category}</td>
                    <td>{service.provider}</td>
                    <td>₹{service.price}</td>
                    <td className="table-actions">
                      <button
                        className="btn btn-ghost"
                        type="button"
                        onClick={() => {
                          setEditingId(service.id);
                          setForm({
                            name: service.name,
                            description: service.description,
                            price: service.price,
                            category: service.category,
                            provider: service.provider,
                            image: service.image || '',
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger" type="button" onClick={() => handleDeleteService(service.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>{item.phone || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'bookings' && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.serviceName}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>₹{booking.price}</td>
                  <td>
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatus(booking.id, e.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="confirmed">confirmed</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
