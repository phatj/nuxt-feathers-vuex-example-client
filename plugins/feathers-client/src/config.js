const scheme = process.env.USE_SSL ? 'https' : 'http';

// This is constant and will never change on server initialization
export const apiServer = `${scheme}://${process.env.API_HOST}:${process.env.API_PORT}`;
