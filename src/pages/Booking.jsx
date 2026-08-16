import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import { createBooking } from '../services/bookingService';
import { getCategoryImage, TIME_SLOTS } from '../services/mockStore';
import { getServiceById } from '../services/serviceService';

export default function Booking() {
  const { serviceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [form, setForm] = useState({
    date: '',
    time: '',
    address: user?.address || '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getServiceById(serviceId);
        setService(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [serviceId]);

  const today = new Date().toISOString().split('T')[0];

  const validate = () => {
    const next = {};
    if (!form.date) next.date = 'Select a date';
    else if (form.date < today) next.date = 'Date cannot be in the past';
    if (!form.time) next.time = 'Select a time';
    if (!form.address.trim()) next.address = 'Address is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      await createBooking({
        serviceId,
        date: form.date,
        time: form.time,
        address: form.address.trim(),
      });
      navigate('/my-bookings');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;
  if (error && !service) {
    return (
      <div className="container section">
        <p className="alert alert-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="container section">
      <form className="card form-card" onSubmit={handleSubmit} noValidate>
        <h1>Confirm booking</h1>
        <div className="selected-service">
          <img
            src={service.image || getCategoryImage(service.category)}
            alt={service.name}
          />
          <div>
            <h3>{service.name}</h3>
            <p className="muted">{service.category} · {service.provider}</p>
            <p className="price">₹{service.price}</p>
          </div>
        </div>
        {error && <p className="alert alert-error">{error}</p>}
        <label>
          Date
          <input
            type="date"
            min={today}
            value={form.date}
            onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
          />
          {errors.date && <span className="field-error">{errors.date}</span>}
        </label>
        <label>
          Time
          <select
            value={form.time}
            onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
          >
            <option value="">Select a time slot</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && <span className="field-error">{errors.time}</span>}
        </label>
        <label>
          Address
          <textarea
            rows="3"
            value={form.address}
            onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
          />
          {errors.address && <span className="field-error">{errors.address}</span>}
        </label>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}
