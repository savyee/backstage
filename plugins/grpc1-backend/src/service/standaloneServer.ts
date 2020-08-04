/*
import { Server } from 'http';
import { Logger } from 'winston';
//import { ConfigReader } from '@backstage/config';
//import { loadConfig } from '@backstage/config-loader';
import { createRouter } from './router';
import { createServiceBuilder } from '@backstage/backend-common';

export interface ServerOptions {
   // port: number;
  //  enableCors: boolean;
  logger: Logger;
}

export async function startStandaloneServer(
  options: ServerOptions,
): Promise<Server> {
  const logger = options.logger.child({ service: 'grpc1-backend' });
  //const config = ConfigReader.fromConfigs(await loadConfig());

  logger.debug('Starting application server...');
  const router = await createRouter({
    logger,
  });

  const service = createServiceBuilder(module)
  .enableCors({ origin: 'http://localhost:3000', credentials: true })
  .addRouter('/greeter', router);

    return await service.start().catch(err => {
    logger.error(err);
    process.exit(1);
    });
}
*/


import { Server } from 'http';
import { Logger } from 'winston';
import { createStandaloneApplication } from './standaloneApplication';

export async function startStandaloneServer(
  parentLogger: Logger,
): Promise<Server> {
  const logger = parentLogger.child({ service: 'scaffolder-backend' });
  logger.debug('Creating application...');

  const app = await createStandaloneApplication();

  logger.debug('Starting application server...');
  const PORT = 3000;
  return await new Promise((resolve, reject) => {
    const server = app.listen(PORT, (err?: Error) => {
      if (err) {
        reject(err);
        return;
      }

      logger.info(`Listening on port ${PORT}`);
      resolve(server);
    });
  });
}
