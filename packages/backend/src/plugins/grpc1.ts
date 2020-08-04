import { createRouter } from '@backstage/plugin-grpc1-backend';
import type { PluginEnvironment } from '../types';

export default async function createPlugin({ logger }: PluginEnvironment) {
  return await createRouter();
}
