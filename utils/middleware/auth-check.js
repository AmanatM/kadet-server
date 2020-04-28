const jwt = require('jsonwebtoken')

module.exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Not authorized'
    })
  }
}

exports.checkAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    if(decoded.admin) next();
    else throw new Error()
  } catch (err) {
    return res.status(401).json({
      message: 'Not authorized'
    })
  }
}
