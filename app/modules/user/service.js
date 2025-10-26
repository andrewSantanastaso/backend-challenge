const { Service } = require('app/modules/common')

class UserService extends Service {
    async readAndUpdate(id, data) {
        const user = await this.model.findByIdAndUpdate(id, data, { new: true })
        if (!user) {
            throw new Error('User not found')
        }
        return user
    }
}

module.exports = UserService
