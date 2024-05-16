import env from 'env-var';

export interface Config {
  environment: 'development' | 'production';
  host: string;
  port: number;
  logLevel: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent';
}

export const getConfig = (): Config => ({
  environment: env
    .get('NODE_ENV')
    .default('development')
    .asString() as Config['environment'],
  host: env.get('HOST').default('localhost').asString(),
  port: env.get('PORT').default(3000).asPortNumber(),
  logLevel: env
    .get('LogLevel')
    .default('info')
    .asString() as Config['logLevel'],
});
