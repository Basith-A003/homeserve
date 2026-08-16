import '../styles/cards.css';

export default function BookingCard({ booking, onCancel, cancellingId }) {
  const canCancel = booking.status === 'pending' || booking.status === 'confirmed';

  return (
    <article className="booking-card">
      {booking.image && <img className="booking-thumb" src={booking.image} alt="" />}
      <div className="booking-body">
      <div className="booking-head">
        <h3>{booking.serviceName}</h3>
        <span className={`status status-${booking.status}`}>{booking.status}</span>
      </div>
      <p className="muted">Booking ID: {booking.id}</p>
      <div className="booking-grid">
        <p>
          <strong>Date</strong>
          {booking.date}
        </p>
        <p>
          <strong>Time</strong>
          {booking.time}
        </p>
        <p>
          <strong>Price</strong>
          ₹{booking.price}
        </p>
      </div>
      {booking.address && (
        <p>
          <strong>Address: </strong>
          {booking.address}
        </p>
      )}
      {canCancel && onCancel && (
        <button
          className="btn btn-danger"
          type="button"
          disabled={cancellingId === booking.id}
          onClick={() => onCancel(booking.id)}
        >
          {cancellingId === booking.id ? 'Cancelling...' : 'Cancel'}
        </button>
      )}
      </div>
    </article>
  );
}
