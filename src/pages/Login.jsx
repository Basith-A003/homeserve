import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AUTH_IMAGE } from '../services/mockStore';
import { useAuth } from '../context/AuthContext';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!emailPattern.test(form.email)) next.email = 'Enter a valid email';
    if (!form.password) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      const user = await login({
        email: form.email.trim(),
        password: form.password,
      });
      const from = location.state?.from;
      if (from) {
        navigate(from, { replace: true });
      } else {
        navigate(user.role === 'admin' ? '/admin' : '/', { replace: true });
      }
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container auth-page">
      <div className="auth-layout">
        <div className="auth-visual" style={{ backgroundImage: `url(${AUTH_IMAGE})` }}>
          <div>
            <h2>Home services, booked simply.</h2>
            <p>Login to manage bookings and get help at home.</p>
          </div>
        </div>
        <form className="card form-card" onSubmit={handleSubmit} noValidate>
        <h1>Login</h1>
        <p className="muted">Welcome back to HomeServe.</p>
        {apiError && <p className="alert alert-error">{apiError}</p>}
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} />
          {errors.password && <span className="field-error">{errors.password}</span>}
        </label>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Logging in...' : 'Login'}
        </button>
        <p className="muted">
          New here? <Link to="/register">Create an account</Link>
        </p>
        <p className="hint">Admin demo: admin@homeserve.com / admin123</p>
      </form>
      </div>
    </div>
  );
}
