const reportMiddleware = (req, res, next) => {
    const { method, url, query } = req;
  const timestamp = new Date().toISOString();
  
  console.log(`[${timestamp}] ${method} ${url}`);
  console.log('Query Params:', query);
  
    next();
  };
  
  module.exports = reportMiddleware;