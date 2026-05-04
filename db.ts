import Database from 'better-sqlite3';
import path from 'path';

const db = new Database('eventra.db');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS vendors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    city TEXT,
    state TEXT,
    rating REAL,
    contact TEXT,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS halls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    city TEXT,
    capacity INTEGER,
    price_per_day INTEGER,
    type TEXT, -- Indoor/Outdoor
    ac TEXT, -- AC/Non-AC
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS fashion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    price INTEGER,
    designer TEXT,
    rating REAL,
    image TEXT,
    trending BOOLEAN DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    item_id INTEGER,
    item_type TEXT, -- 'hall', 'vendor', 'fashion'
    booking_date TEXT,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS wishlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    item_id INTEGER,
    item_type TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// Seed initial data if empty
const vendorCount = db.prepare('SELECT COUNT(*) as count FROM vendors').get() as { count: number };
if (vendorCount.count === 0) {
  // ... existing vendor seeding ...
}

// Force refresh fashion data for this update
db.exec('DELETE FROM fashion');
const insertFashion = db.prepare('INSERT INTO fashion (name, category, price, designer, rating, image, trending) VALUES (?, ?, ?, ?, ?, ?, ?)');

// Lehengas
insertFashion.run('Royal Red Bridal Lehenga', 'Lehenga', 125000, 'Sabyasachi Mukherjee', 4.9, 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80', 1);
insertFashion.run('Champagne Gold Lehenga', 'Lehenga', 85000, 'Manish Malhotra', 4.8, 'https://images.unsplash.com/photo-1595910194003-999373955000?auto=format&fit=crop&w=800&q=80', 0);
insertFashion.run('Emerald Velvet Lehenga', 'Lehenga', 95000, 'Anita Dongre', 4.7, 'https://images.unsplash.com/photo-1610030469668-935142b96fe4?auto=format&fit=crop&w=800&q=80', 1);
insertFashion.run('Blush Pink Floral Lehenga', 'Lehenga', 75000, 'Tarun Tahiliani', 4.8, 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80', 0);
insertFashion.run('Midnight Blue Lehenga', 'Lehenga', 110000, 'Gaurav Gupta', 4.9, 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80', 0);

// Sarees
insertFashion.run('Heritage Banarasi Silk', 'Saree', 45000, 'Raw Mango', 4.9, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80', 1);
insertFashion.run('Kanjeevaram Gold Weave', 'Saree', 55000, 'Nalli Silks', 4.8, 'https://images.unsplash.com/photo-1583391265517-35bbdad01209?auto=format&fit=crop&w=800&q=80', 0);
insertFashion.run('Organza Floral Saree', 'Saree', 38000, 'Sabyasachi Heritage', 4.7, 'https://images.unsplash.com/photo-1610189012906-44026845d670?auto=format&fit=crop&w=800&q=80', 0);
insertFashion.run('Midnight Sequin Saree', 'Saree', 42000, 'Manish Malhotra', 4.8, 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80', 1);
insertFashion.run('Royal Silk Saree', 'Saree', 32000, 'Sabyasachi Heritage', 4.7, 'https://images.unsplash.com/photo-1610189012906-44026845d670?auto=format&fit=crop&w=800&q=80', 0);

// Gowns
insertFashion.run('Sculpted Emerald Gown', 'Gown', 95000, 'Gaurav Gupta', 4.9, 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80', 1);
insertFashion.run('Ivory Lace Bridal Gown', 'Gown', 150000, 'Vera Wang', 4.9, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80', 0);
insertFashion.run('Midnight Blue Tulle Gown', 'Gown', 75000, 'Tarun Tahiliani', 4.7, 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80', 1);
insertFashion.run('Ruby Red Trail Gown', 'Gown', 88000, 'Shantanu & Nikhil', 4.8, 'https://images.unsplash.com/photo-1539008835657-9e8e81839967?auto=format&fit=crop&w=800&q=80', 0);
insertFashion.run('Silver Sequin Gown', 'Gown', 65000, 'Gaurav Gupta', 4.8, 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80', 0);

// Sherwanis
insertFashion.run('Imperial Ivory Sherwani', 'Sherwani', 65000, 'Sabyasachi Heritage', 4.9, 'https://images.unsplash.com/photo-1599948058230-78896e742f7e?auto=format&fit=crop&w=800&q=80', 1);
insertFashion.run('Maharaja Crimson Sherwani', 'Sherwani', 58000, 'Manyavar Elite', 4.8, 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80', 0);
insertFashion.run('Midnight Floral Sherwani', 'Sherwani', 52000, 'Anita Dongre Men', 4.7, 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80', 1);
insertFashion.run('Royal Gold Bandhgala', 'Sherwani', 45000, 'Raghavendra Rathore', 4.8, 'https://images.unsplash.com/photo-1599948058230-78896e742f7e?auto=format&fit=crop&w=800&q=80', 0);
insertFashion.run('Velvet Black Sherwani', 'Sherwani', 72000, 'Sabyasachi Men', 4.9, 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80', 0);

// Suits
insertFashion.run('Classic Black Tuxedo', 'Suit', 35000, 'Raymond Premium', 4.9, 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80', 1);
insertFashion.run('Charcoal Italian Suit', 'Suit', 42000, 'Canali', 4.8, 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 0);
insertFashion.run('Royal Blue 3-Piece', 'Suit', 28000, 'Louis Philippe', 4.7, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80', 1);
insertFashion.run('Velvet Dinner Jacket', 'Suit', 32000, 'Tom Ford Style', 4.8, 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80', 0);
insertFashion.run('Grey Wool Suit', 'Suit', 25000, 'Hugo Boss', 4.6, 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 0);

export default db;
