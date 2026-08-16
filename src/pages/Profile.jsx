import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [apiError, setApiError] = useState('');
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!emailPattern.test(form.email)) next.email = 'Enter a valid email';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError('');
    setMessage('');
    if (!validate()) return;
    setSaving(true);
    try {
      await updateProfile({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      });
      setEditing(false);
      setMessage('Profile updated successfully.');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container section">
      <div className="card form-card">
        <h1>Profile</h1>
        {message && <p className="alert alert-success">{message}</p>}
        {apiError && <p className="alert alert-error">{apiError}</p>}
        {!editing ? (
          <div className="profile-view">
            <p>
              <strong>Name</strong>
              {user?.name}
            </p>
            <p>
              <strong>Email</strong>
              {user?.email}
            </p>
            <p>
              <strong>Phone</strong>
              {user?.phone || 'Not added'}
            </p>
            <p>
              <strong>Address</strong>
              {user?.address || 'Not added'}
            </p>
            <p>
              <strong>Role</strong>
              {user?.role}
            </p>
            <button className="btn btn-primary" type="button" onClick={() => setEditing(true)}>
              Edit profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <label>
              Name
              <input
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </label>
            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </label>
            <label>
              Phone
              <input
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </label>
            <label>
              Address
              <textarea
                rows="3"
                value={form.address}
                onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
              />
            </label>
            <div className="btn-row">
              <button className="btn btn-primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
