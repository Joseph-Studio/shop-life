import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('Please define DATABASE_URL in your .env.local file');
}

let cached = global.mongoose || { conn: null, promise: null };

async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, 
      serverSelectionTimeoutMS: 5000, 
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then(mongoose => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDB;