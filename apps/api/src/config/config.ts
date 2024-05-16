import env from 'env-var';

export interface Config {
  host: string;
  port: number;
}

export const getConfig = (): Config => ({
  host: env.get('HOST').default('localhost').asString(),
  port: env.get('PORT').default(3000).asPortNumber(),
});
