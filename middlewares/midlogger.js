export const winstonLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(
      `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`
    );
    next();
  };