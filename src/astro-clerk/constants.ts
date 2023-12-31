const apiKey = import.meta.env.CLERK_API_KEY || '';

const secretKey = import.meta.env.CLERK_SECRET_KEY || '';

const apiVersion = import.meta.env.CLERK_API_VERSION || 'v1';

const apiUrl = import.meta.env.CLERK_API_URL || 'https://api.clerk.dev';

const frontendApi = import.meta.env.PUBLIC_CLERK_FRONTEND_API || '';

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY || '';

const signInUrl = import.meta.env.PUBLIC_CLERK_SIGN_IN_URL || '';

const jwtKey = import.meta.env.CLERK_JWT_KEY || '';

export {
	secretKey,
	apiKey,
	apiUrl,
	apiVersion,
	frontendApi,
	publishableKey,
	jwtKey,
	signInUrl,
};
