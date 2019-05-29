function allowCrossDomain(mode = 'development') {
  return (req, res, next) => {
    if (mode === 'development') {
      res.header('Access-Control-Allow-Origin', "*");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
    }
    next();
  }
}

module.exports = { allowCrossDomain };
