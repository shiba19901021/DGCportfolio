// Disable telemetry; production builds always exclude private preview material.
process.env.ASTRO_TELEMETRY_DISABLED = '1';
if (process.argv[2] === 'build') process.env.PORTFOLIO_PUBLIC_ONLY = '1';
await import('../node_modules/astro/bin/astro.mjs');
