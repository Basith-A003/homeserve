const STORAGE_KEY = 'homeserve_db';

export const CATEGORIES = [
  'AC Repair',
  'Plumbing',
  'Electrical',
  'Cleaning',
  'Painting',
  'Carpentry',
  'Appliance Repair',
  'Pest Control',
];

export const CATEGORY_IMAGES = {
  'AC Repair':
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80',
  Plumbing:
    'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80',
  Electrical:
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80',
  Cleaning:
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
  Painting:
    'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80',
  Carpentry:
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
  'Appliance Repair':
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80',
  'Pest Control':
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80',
};

export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1600&q=80';

export const AUTH_IMAGE =
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80';

export function getCategoryImage(category) {
  return CATEGORY_IMAGES[category] || CATEGORY_IMAGES.Cleaning;
}

export const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

function createId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function seedServices() {
  return [
    {
      id: 'svc_1',
      name: 'AC Repair & Gas Refill',
      description:
        'Complete air conditioner diagnosis, gas refill, and cooling performance check for split and window ACs.',
      price: 799,
      category: 'AC Repair',
      provider: 'CoolAir Experts',
      image:
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'svc_2',
      name: 'AC Deep Cleaning',
      description:
        'Indoor unit foam cleaning, filter wash, and outdoor unit dust removal for better airflow.',
      price: 599,
      category: 'AC Repair',
      provider: 'CoolAir Experts',
      image:
        'https://images.unsplash.com/photo-1737012197886-7d5a52ded45b?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'svc_3',
      name: 'Leak Detection & Pipe Repair',
      description:
        'Find and fix leaking taps, pipes, and bathroom fittings with quality spare parts.',
      price: 499,
      category: 'Plumbing',
      provider: 'FlowFix Plumbers',
      image:
        'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'svc_4',
      name: 'Bathroom Fitting Installation',
      description:
        'Install shower, mixer, and commode fittings with leak-proof sealing.',
      price: 899,
      category: 'Plumbing',
      provider: 'FlowFix Plumbers',
      image:
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'svc_5',
      name: 'Fan & Light Installation',
      description:
        'Safe installation of ceiling fans, tube lights, and LED fixtures.',
      price: 349,
      category: 'Electrical',
      provider: 'SparkSafe Electric',
      image:
        'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'svc_6',
      name: 'Switchboard Repair',
      description:
        'Repair loose switches, burnt sockets, and minor wiring issues in your home.',
      price: 449,
      category: 'Electrical',
      provider: 'SparkSafe Electric',
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'svc_7',
      name: 'Home Deep Cleaning',
      description:
        'Full home cleaning including kitchen, bathrooms, floors, and dust-prone corners.',
      price: 1499,
      category: 'Cleaning',
      provider: 'ShineHome Crew',
      image:
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'svc_8',
      name: 'Sofa & Carpet Cleaning',
      description:
        'Professional shampooing for sofas and carpets to remove stains and odours.',
      price: 999,
      category: 'Cleaning',
      provider: 'ShineHome Crew',
      image:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'svc_9',
      name: 'Interior Wall Painting',
      description:
        'Interior painting for one room with primer, two coats, and basic furniture covering.',
      price: 2499,
      category: 'Painting',
      provider: 'ColourCraft Painters',
      image:
        'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'svc_10',
      name: 'Furniture Assembly',
      description:
        'Assemble beds, wardrobes, and study tables as per manufacturer instructions.',
      price: 699,
      category: 'Carpentry',
      provider: 'WoodWorks Studio',
      image:
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'svc_11',
      name: 'Washing Machine Repair',
      description:
        'Diagnose and repair washing machine issues such as drainage, spin, and noise.',
      price: 649,
      category: 'Appliance Repair',
      provider: 'FixIt Appliances',
      image:
        'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'svc_12',
      name: 'Cockroach & Pest Control',
      description:
        'Targeted treatment for cockroaches and crawling insects with follow-up guidance.',
      price: 1199,
      category: 'Pest Control',
      provider: 'SafeNest Pest Care',
      image:
        'https://images.unsplash.com/photo-1747659629851-a92bd71149f6?auto=format&fit=crop&w=900&q=80',
    },
  ];
}

function seedDb() {
  return {
    users: [
      {
        id: 'usr_admin',
        name: 'HomeServe Admin',
        email: 'admin@homeserve.com',
        password: 'admin123',
        role: 'admin',
        phone: '9876543210',
        address: 'HomeServe HQ, Bengaluru',
      },
    ],
    services: seedServices(),
    bookings: [],
  };
}

function withServiceImages(db) {
  const seeded = Object.fromEntries(seedServices().map((s) => [s.id, s.image]));
  let changed = false;
  db.services = db.services.map((service) => {
    const nextImage = service.image || seeded[service.id] || getCategoryImage(service.category);
    if (nextImage === service.image) return service;
    changed = true;
    return { ...service, image: nextImage };
  });
  if (changed) saveDb(db);
  return db;
}

function loadDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return withServiceImages(JSON.parse(raw));
    }
  } catch {
    /* ignore corrupt storage */
  }
  const db = seedDb();
  saveDb(db);
  return db;
}

function saveDb(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export function wait(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createToken(user) {
  const payload = {
    id: user.id,
    role: user.role,
    exp: Date.now() + 1000 * 60 * 60 * 24,
  };
  return btoa(JSON.stringify(payload));
}

export function readToken(token) {
  try {
    const payload = JSON.parse(atob(token));
    if (!payload?.id || payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

function publicUser(user) {
  const { password, ...safe } = user;
  return safe;
}

export async function mockRegister({ name, email, password }) {
  const db = loadDb();
  if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('An account with this email already exists');
  }
  const user = {
    id: createId('usr'),
    name,
    email,
    password,
    role: 'user',
    phone: '',
    address: '',
  };
  db.users.push(user);
  saveDb(db);
  const token = createToken(user);
  return { token, user: publicUser(user) };
}

export async function mockLogin({ email, password }) {
  const db = loadDb();
  const user = db.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const token = createToken(user);
  return { token, user: publicUser(user) };
}

export async function mockGetMe(token) {
  const payload = readToken(token);
  if (!payload) {
    throw new Error('Session expired. Please login again.');
  }
  const db = loadDb();
  const user = db.users.find((u) => u.id === payload.id);
  if (!user) {
    throw new Error('User not found');
  }
  return publicUser(user);
}

export async function mockUpdateProfile(token, updates) {
  const payload = readToken(token);
  if (!payload) {
    throw new Error('Unauthorized');
  }
  const db = loadDb();
  const index = db.users.findIndex((u) => u.id === payload.id);
  if (index === -1) {
    throw new Error('User not found');
  }
  if (
    updates.email &&
    db.users.some(
      (u) => u.email.toLowerCase() === updates.email.toLowerCase() && u.id !== payload.id
    )
  ) {
    throw new Error('Email is already in use');
  }
  db.users[index] = {
    ...db.users[index],
    name: updates.name ?? db.users[index].name,
    email: updates.email ?? db.users[index].email,
    phone: updates.phone ?? db.users[index].phone,
    address: updates.address ?? db.users[index].address,
  };
  saveDb(db);
  return publicUser(db.users[index]);
}

export async function mockGetServices({ search = '', category = '' } = {}) {
  const db = loadDb();
  const q = search.trim().toLowerCase();
  return db.services.filter((service) => {
    const matchesSearch =
      !q ||
      service.name.toLowerCase().includes(q) ||
      service.description.toLowerCase().includes(q) ||
      service.provider.toLowerCase().includes(q) ||
      service.category.toLowerCase().includes(q);
    const matchesCategory = !category || service.category === category;
    return matchesSearch && matchesCategory;
  });
}

export async function mockGetServiceById(id) {
  const db = loadDb();
  const service = db.services.find((s) => s.id === id);
  if (!service) {
    throw new Error('Service not found');
  }
  return service;
}

export async function mockCreateBooking(token, { serviceId, date, time, address }) {
  const payload = readToken(token);
  if (!payload) {
    throw new Error('Please login to book a service');
  }
  const db = loadDb();
  const service = db.services.find((s) => s.id === serviceId);
  if (!service) {
    throw new Error('Service not found');
  }
  const booking = {
    id: createId('bkg'),
    userId: payload.id,
    serviceId: service.id,
    serviceName: service.name,
    date,
    time,
    address,
    price: service.price,
    image: service.image || getCategoryImage(service.category),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  db.bookings.unshift(booking);
  saveDb(db);
  return booking;
}

export async function mockGetMyBookings(token) {
  const payload = readToken(token);
  if (!payload) {
    throw new Error('Unauthorized');
  }
  const db = loadDb();
  return db.bookings.filter((b) => b.userId === payload.id);
}

export async function mockCancelBooking(token, bookingId) {
  const payload = readToken(token);
  if (!payload) {
    throw new Error('Unauthorized');
  }
  const db = loadDb();
  const booking = db.bookings.find((b) => b.id === bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }
  if (payload.role !== 'admin' && booking.userId !== payload.id) {
    throw new Error('You cannot cancel this booking');
  }
  if (booking.status === 'completed' || booking.status === 'cancelled') {
    throw new Error('This booking cannot be cancelled');
  }
  booking.status = 'cancelled';
  saveDb(db);
  return booking;
}

function requireAdmin(token) {
  const payload = readToken(token);
  if (!payload || payload.role !== 'admin') {
    throw new Error('Admin access required');
  }
  return payload;
}

export async function mockGetStats(token) {
  requireAdmin(token);
  const db = loadDb();
  return {
    totalUsers: db.users.filter((u) => u.role === 'user').length,
    totalServices: db.services.length,
    totalBookings: db.bookings.length,
  };
}

export async function mockGetUsers(token) {
  requireAdmin(token);
  const db = loadDb();
  return db.users.map(publicUser);
}

export async function mockGetAllBookings(token) {
  requireAdmin(token);
  const db = loadDb();
  return db.bookings.map((booking) => {
    const user = db.users.find((u) => u.id === booking.userId);
    return { ...booking, customerName: user?.name || 'Unknown' };
  });
}

export async function mockUpdateBookingStatus(token, bookingId, status) {
  requireAdmin(token);
  const db = loadDb();
  const booking = db.bookings.find((b) => b.id === bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }
  booking.status = status;
  saveDb(db);
  return booking;
}

export async function mockCreateService(token, data) {
  requireAdmin(token);
  const db = loadDb();
  const service = {
    id: createId('svc'),
    name: data.name,
    description: data.description,
    price: Number(data.price),
    category: data.category,
    provider: data.provider,
    image: data.image || getCategoryImage(data.category),
  };
  db.services.unshift(service);
  saveDb(db);
  return service;
}

export async function mockUpdateService(token, id, data) {
  requireAdmin(token);
  const db = loadDb();
  const index = db.services.findIndex((s) => s.id === id);
  if (index === -1) {
    throw new Error('Service not found');
  }
  db.services[index] = {
    ...db.services[index],
    name: data.name,
    description: data.description,
    price: Number(data.price),
    category: data.category,
    provider: data.provider,
    image: data.image || db.services[index].image || getCategoryImage(data.category),
  };
  saveDb(db);
  return db.services[index];
}

export async function mockDeleteService(token, id) {
  requireAdmin(token);
  const db = loadDb();
  db.services = db.services.filter((s) => s.id !== id);
  saveDb(db);
  return { success: true };
}
