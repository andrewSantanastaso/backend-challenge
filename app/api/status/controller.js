const mongodb = require('../../lib/mongodb')

exports.currentStatus = function (req, res) {
  //Check DB connection status
  try {
    //if disconnected throw error
    if (mongodb.readyState == 0) {
      throw new Error('Database not connected')
    }
    //if connected return ok
    if (mongodb.readyState == 1) {
      return res.status(200).json({ status: 'OK' })
    }
    //any other state return error
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
}

