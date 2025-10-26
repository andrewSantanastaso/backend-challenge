let should
let agent
let mockData
let noteService

before(() => {
    should = require('should')
    agent = require('test/lib/agent')
    mockData = require('test/lib/mock-data')
    noteService = require('app/modules/notes')
})

describe('api', () => {
    describe('user', () => {
        describe('read-user-notes', () => {
            let validUser

            before(async () => {
                validUser = await mockData.mockAuthAndUser()

            })

            it('should allow a logged-in user to read their notes', async () => {
                //create some notes for the user
                const noteData1 = {
                    title: 'First Note', message: 'This is the first note.',
                    user: validUser.user
                }
                const noteData2 = {
                    title: 'Second Note', message: 'This is the second note.',
                    user: validUser.user
                }


                await agent
                    .client()
                    .post(`/note`)
                    .set('authorization', validUser.token)
                    .send(noteData1)
                    .expect(201)
                    .promise()

                await agent
                    .client()
                    .post(`/note`)
                    .set('authorization', validUser.token)
                    .send(noteData2)
                    .expect(201)
                    .promise()

                //retrieve the notes for the user
                const notes = await agent
                    .client()
                    .get(`/user/${validUser.user}/notes`)
                    .set('authorization', validUser.token)
                    .expect(200)
                    .promise()

                should.exist(notes)
                notes.should.be.an.Array()
                console.log('Retrieved Notes:', notes)




            })

            it('should not allow an unauthenticated user to read notes', async () => {
                await agent
                    .client()
                    .get(`/user/${validUser.user}/notes`)
                    .expect(401)
                    .promise()
            })
        })
    })
})