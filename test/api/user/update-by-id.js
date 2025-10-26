let should
let agent
let mockData

before(() => {
    should = require('should')
    agent = require('test/lib/agent')
    mockData = require('test/lib/mock-data')
})

describe('api', () => {
    describe('user', () => {
        describe('update-by-user', () => {
            //create and assign two users
            let validUser, anotherUser

            before(async () => {
                validUser = await mockData.mockAuthAndUser()
                anotherUser = await mockData.mockAuthAndUser()


            })

            it('should allow the current user to update their own data', async () => {
                //data to update
                const updatedData = {
                    firstName: 'UpdatedName'
                }

                const user = await agent
                    .client()
                    .put(`/user/${validUser.user}`)
                    .set('authorization', validUser.token)
                    .send(updatedData)
                    .expect(200)
                    .promise()

                //verify the update

                should.exist(user)
                user.id.should.equal(validUser.user)
                user.firstName.should.equal(updatedData.firstName)

            })

            it('should forbid a user from updating another user\'s data', async () => {
                const updatedData = {
                    firstName: 'HackerName',
                    email: 'hacker@example.com',
                }

                await agent
                    .client()
                    .put(`/user/${validUser.user}`)
                    .set('authorization', anotherUser.token)
                    .send(updatedData)
                    .expect(403)
                    .promise()
            })
        })
    })
})
