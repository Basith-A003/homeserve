import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import Spinner from '../components/Spinner';
import { CATEGORIES } from '../services/mockStore';
import { getServices } from '../services/serviceService';

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setSearch(searchParams.get('q') || '');
    setCategory(searchParams.get('category') || '');
  }, [searchParams]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await getServices({ search, category });
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search, category]);

  const applyFilters = (event) => {
    event.preventDefault();
    const next = {};
    if (search.trim()) next.q = search.trim();
    if (category) next.category = category;
    setSearchParams(next);
  };

  return (
    <div className="container section">
      <h1>All services</h1>
      <form className="filters" onSubmit={applyFilters}>
        <input
          type="search"
          placeholder="Search services"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" type="submit">
          Filter
        </button>
      </form>
      {loading && <Spinner />}
      {error && <p className="alert alert-error">{error}</p>}
      {!loading && !error && services.length === 0 && (
        <p className="empty">No services match your search.</p>
      )}
      {!loading && !error && (
        <div className="cards-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
