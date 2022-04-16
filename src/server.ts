import App from './app';

App.listen({ port: process.env.PORT || 3333 }, () =>
  console.log(`🚀 Server ready on port: ${process.env.PORT || 3333}!`),
);
