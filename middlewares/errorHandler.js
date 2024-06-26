function errorHandler(err, req, res, next) {
  let [code, message] = [500, 'Internal Server Error'];

  if (err.name == 'Username is required' || err.name == 'Password is required') [code, message] = [400, err.name];
  if (err.name == 'Invalid username/password') [code, message] = [401, err.name];
  if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') [code, message] = [400, err.errors[0].message]
  if (err.name == 'Invalid token' || err.name == 'JsonWebTokenError') [code, message] = [401, 'Invalid token']
  if (err.name == "You are not authorized") [code, message] = [403, err.name]
  if (err.name == 'Data not found') [code, message] = [404, err.name];
  if (err.name == "All fields must be filled") [code, message] = [400, err.name]

  res.status(code).json({ message: message })
}

module.exports = errorHandler;