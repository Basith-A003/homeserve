import { useEffect, useState } from 'react';
import BookingCard from '../components/BookingCard';
import Spinner from '../components/Spinner';
import { cancelBooking, getMyBookings } from '../services/bookingService';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCancel = async (id) => {
    setCancellingId(id);
    setError('');
    try {
      await cancelBooking(id);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setCancellingId('');
    }
  };

  return (
    <div className="container section">
      <h1>My bookings</h1>
      {loading && <Spinner />}
      {error && <p className="alert alert-error">{error}</p>}
      {!loading && bookings.length === 0 && (
        <p className="empty">You have not booked any services yet.</p>
      )}
      <div className="stack">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onCancel={handleCancel}
            cancellingId={cancellingId}
          />
        ))}
      </div>
    </div>
  );
}
