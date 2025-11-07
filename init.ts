import * as dbClient from './src/infrastructure/database/database-client.js';
import { createHttpServer } from './src/infrastructure/web/http-server.js';
import appRoutes from './src/interfaces/http/routes.js';

async function init() {
  try {
    console.log('🔌 Connecting to database...');
    await dbClient.connect();
    console.log('✅ Database connected.');

    console.log('🚀 Creating HTTP server...');
    const server = createHttpServer(appRoutes);

    console.log('🌐 Starting HTTP server...');
    const info = await server.start();

    console.log(`✅ Server started on port ${info.port}`);
  } catch (err) {
    console.error('❌ Startup failed. Details:', err);
    try {
      await dbClient.disconnect();
    } catch {}
    process.exit(1);
  }
}

init();
