import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import { getCategoryImage } from '../services/mockStore';
import { getServiceById } from '../services/serviceService';

export default function ServiceDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await getServiceById(id);
        setService(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleBook = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/booking/${id}` } });
      return;
    }
    navigate(`/booking/${id}`);
  };

  if (loading) return <Spinner />;
  if (error) {
    return (
      <div className="container section">
        <p className="alert alert-error">{error}</p>
        <Link to="/services">Back to services</Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <article className="card details-card">
        <img
          className="details-image"
          src={service.image || getCategoryImage(service.category)}
          alt={service.name}
        />
        <span className="badge">{service.category}</span>
        <h1>{service.name}</h1>
        <p className="muted">{service.description}</p>
        <p>
          <strong>Provider: </strong>
          {service.provider}
        </p>
        <p className="price">₹{service.price}</p>
        <button className="btn btn-primary" type="button" onClick={handleBook}>
          Book Now
        </button>
      </article>
    </div>
  );
}
