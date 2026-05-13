import { env } from 'node:process';

export default {
	url: env.DEPLOY_PRIME_URL || 'http://localhost:8080',
};
