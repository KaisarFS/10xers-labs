

function authorization(allowedRoles) {
  return (req, res, next) => {
    const { role } = req.user;
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden, You are not authorize to access' });
    }
    next();
  }
}
module.exports = authorization;