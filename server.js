const express = require('express');
const helmet = require('helmet');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const redirectToHost = (request, response, next) => {
  if (request.headers.host.slice(0, 4) === 'www.') {
    /* We do this because Google Cloud Load Balancer is not yet ready to send HSTS header on redirects, see issue: https://issuetracker.google.com/issues/191995375 */
    const newHost = request.headers.host.slice(4);

    return response.redirect(301, 'https://' + newHost + request.originalUrl);
  }

  next();
};

app.prepare().then(() => {
  const server = express();
  server.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginEmbedderPolicy: false
    })
  );

  if (!dev) {
    server.set('trust proxy', true);
    server.use(redirectToHost);
  }

  server.all('*', (request, response) => {
    return handle(request, response);
  });

  const serverInstance = server.listen(port, (error) => {
    if (error) throw error;
  });

  process.on('SIGTERM', () => {
    console.log('Instance is shutting down');
    serverInstance.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});
