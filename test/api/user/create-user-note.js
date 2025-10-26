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
        describe('create-user-note', () => {
            //create and authenticate a user
            let validUser

            before(async () => {
                validUser = await mockData.mockAuthAndUser()

            })

            it('should allow a logged-in user to create a note', async () => {
                //create test note data
                const noteData = {
                    title: 'Test Note',
                    message: 'This is a test note.',


                }

                const note = await agent
                    .client()
                    .post(`/note`)
                    .set('authorization', validUser.token)
                    .send(noteData)
                    .expect(201)
                    .promise()

                //verify the created note
                should.exist(note)
                note.title.should.equal(noteData.title)
                note.message.should.equal(noteData.message)


            })

            it('should not allow an unauthenticated user to create a note', async () => {
                const noteData = {
                    title: 'Unauthorized Note',
                    message: 'This should not be created.'
                }

                await agent
                    .client()
                    .post(`/note`)
                    .send(noteData)
                    .expect(401)
                    .promise()
            })
        })


    })
})