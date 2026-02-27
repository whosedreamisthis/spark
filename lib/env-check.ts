const requiredEnvs = [
	'DATABASE_URL',
	'PUSHER_APP_ID',
	'PUSHER_SECRET',
	'CLERK_SECRET_KEY',
];

console.log('--- ENV VALIDATION START ---');
requiredEnvs.forEach((env) => {
	const value = process.env[env];
	console.log(`${env}:`, {
		type: typeof value,
		exists: !!value,
		isObject: value !== null && typeof value === 'object',
	});
});
console.log('--- ENV VALIDATION END ---');
