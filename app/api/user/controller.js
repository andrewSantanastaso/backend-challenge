const userService = require('app/modules/user')
const noteService = require('app/modules/notes')


/**
 * @method read
 */
exports.read = async (req, res) => {
  const user = await userService.findById(req.params.id)
  res.status(200).send(user)
}

/**
 * @method update
 */
exports.update = async (req, res) => {

  if (req.userId !== req.params.id) {
    return res.status(403).send({ message: 'Forbidden' })
  }

  const user = await userService.readAndUpdate(req.params.id, req.body)
  res.status(200).send(user)
}

/**
 * 
 * @method readUserNotes
 */

exports.readUserNotes = async (req, res) => {
  if (req.userId !== req.params.id) {
    return res.status(403).send({ message: 'Forbidden' })
  }
  const notes = await noteService.find({ user: req.userId })
  res.status(200).send(notes)
}


/** * 
 * @method create
 */
exports.createUserNote = async (req, res) => {
  try {
    const note = await noteService.create({
      title: req.body.title,
      message: req.body.message,
      user: req.userId
    })
    res.status(201).send(note)
  } catch (error) {
    console.error('Error creating note:', error)
    res.status(500).send({ message: 'The error is int create user note' })
  }

}