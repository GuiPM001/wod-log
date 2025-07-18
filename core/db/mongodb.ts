import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_URI = "mongodb+srv://GuiPM001:33211319@reboque.t5klc.mongodb.net/wod-log";

if (!MONGODB_URI) {
  throw new Error('Por favor defina a variável MONGODB_URI no .env.local');
}

export async function connectMongo() {
  const conn = mongoose?.connection;
  if (conn && conn.readyState === 1) {
    return conn.asPromise();
  }

  return mongoose.connect(MONGODB_URI);
}