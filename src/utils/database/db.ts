import mongoose from 'mongoose';
import { listenerCount } from 'process';

class Database {
  private readonly uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  async connect() {
    try {
      await mongoose.connect(this.uri, {
        
      });
      console.log('Connected to MongoDB');
    } catch (error: any) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error: any) {
      console.error('Error disconnecting from MongoDB:', error.message);
    }
  }
}

// Use your environment variable or default to a Cloud MongoDB URI
let mongodbUri;
if (process.env.NODE_ENV == "production") {
    mongodbUri = process.env.MONGODB_URI || '';
} else {
    mongodbUri = 'mongodb://localhost:27017/alhikma';
}

const database = new Database(mongodbUri);

export default database;
