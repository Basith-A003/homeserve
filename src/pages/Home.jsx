import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES, CATEGORY_IMAGES, HERO_IMAGE } from '../services/mockStore';
import { getServices } from '../services/serviceService';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await getServices();
        setServices(data.slice(0, 6));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/services?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div>
      <section className="hero" style={{ backgroundImage: `linear-gradient(120deg, rgba(18, 36, 63, 0.82), rgba(13, 148, 136, 0.45)), url(${HERO_IMAGE})` }}>
        <div className="container hero-inner">
          <p className="eyebrow">Trusted home services</p>
          <h1>Book AC repair, plumbing, cleaning and more in minutes.</h1>
          <p className="hero-copy">
            HomeServe connects you with verified local professionals at clear prices.
          </p>
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search for AC repair, plumbing, cleaning..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
          {!isAuthenticated && (
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Service categories</h2>
          <div className="category-grid">
            {CATEGORIES.map((category) => (
              <Link
                key={category}
                className="category-card"
                to={`/services?category=${encodeURIComponent(category)}`}
              >
                <img src={CATEGORY_IMAGES[category]} alt="" />
                <span>{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Popular services</h2>
            <Link to="/services">View all</Link>
          </div>
          {loading && <Spinner />}
          {error && <p className="alert alert-error">{error}</p>}
          {!loading && !error && (
            <div className="cards-grid">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
