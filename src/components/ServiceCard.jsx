import { Link } from 'react-router-dom';
import { getCategoryImage } from '../services/mockStore';
import '../styles/cards.css';

export default function ServiceCard({ service }) {
  const image = service.image || getCategoryImage(service.category);

  return (
    <article className="service-card">
      <div className="service-card-media">
        <img src={image} alt={service.name} />
        <span className="badge">{service.category}</span>
      </div>
      <div className="service-card-body">
        <h3>{service.name}</h3>
        <p className="muted">{service.description}</p>
        <div className="card-meta">
          <strong>₹{service.price}</strong>
          <span>{service.provider}</span>
        </div>
        <Link className="btn btn-primary" to={`/services/${service.id}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}
