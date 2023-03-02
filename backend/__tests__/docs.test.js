const mongoose = require( "mongoose" );
const request = require( "supertest" );
const Doc = require('../models/Docmnt');
const {app} = require("../app");


/* Connecting to the database before all test. */
beforeEach( async () =>
{
    await mongoose.connect('mongodb://localhost/testDB',{
        useNewUrlParser: true 
    })
});

/* Closing database connection after each test. */
afterEach( async () =>
{
    await mongoose.connection.close();
});


const firstDoc = {
    title: "*** First Document Title ***",
    text: "Using supertest to test POST endpoint",
    falseId: "634dcb3b881e578a2f7xxxx0",
    n0ValidId: "falseId123",
}


describe('GET /api/docs', () => {
    it ('should return all docs and status code 200', async() => {
        await Doc.create({
            title: firstDoc.title,
            text: firstDoc.text
        })

        await request(app)
        .get('/api/docs')
        .then(async (res) => {
            expect(res.status).toEqual(200)
        })
    })
})


describe('GET /api/docs/:id', () => {
    it ('should return a doc matching firstDoc.id and status code 200', async() => {
        const doc = await Doc.create({
            title: firstDoc.title,
            text: firstDoc.text
        })

        await request(app)
        .get(`/api/docs/${doc._id}`)
        .then(async (res) => {
            expect(res.status).toEqual(200)
            expect(res.body.title).toEqual(doc.title)
        })
    })
})


describe('GET /api/docs/:id', () => {
    it ('should return a 404 if document is not found on database', async() => {

        const testDoc = await request(app).get(`/api/docs/${firstDoc.falseId}`);
        expect(testDoc.status).toEqual(404)
        expect(testDoc._body.error).toEqual('The id is not valid id')
    })
})


describe('GET /api/docs/:id', () => {
    it ('should return a 404 if document id is not a valid monogDB id',() => {

        expect(mongoose.Types.ObjectId.isValid(firstDoc.n0ValidId)).toBeFalsy()
    })
})



describe('POST /api/docs/create', () => {
    it ('should create a new doc and return status code 200', async() => {
        const doc = {
            title: "*** TESTING POST ENDPOINT ***",
            text: "Using supertest to test POST endpoint"
        }

        await request(app)
            .post('/api/docs/create')
            .send(doc)
            .expect(200)
            .then(async (res) => {
                expect(res.body._id).toBeTruthy()
                expect(res.body.title).toBe(doc.title)
                expect(res.body.text).toBe(doc.text)
                console.log(`Document with id: ${res.body._id} and title: ${res.body.title} created`)

            })

    })
})



describe('POST /api/docs/create', () => {
    it ('should return status code 400 if document is not valid doc-schema', async() => {
        const doc = {
            title: "*** TESTING POST ENDPOINT ***"
        }

        await request(app)
            .post('/api/docs/create')
            .send(doc)
            .expect(400)
            .then(async (res) => {
                expect(400)
                console.log(res.body)
            })

    })
})



describe('PATCH /api/docs/:id', () => {
    it ('should find and update the doc matching id', async() => {

        const testDoc = await Doc.create({
            title: "*** TESTING POST ENDPOINT ***",
            text: "Using supertest to test POST endpoint"
        })

        const newDoc = {
            title: "*** TESTING UPDATE ENDPOINT ***",
            text: "Using supertest to test POST endpoint"
        }
        
        await request(app)
        .patch(`/api/docs/${testDoc._id}`)
        .send(newDoc)
        .expect(200)
        .then(async (res) => {
            const upd8d = await Doc.findById(res.body._id)
            console.log(`Document with id: ${testDoc._id} and title: ${testDoc.title} has been created and now updated to title: ${upd8d.title}. checking response id: ${upd8d._id}`)
            expect(testDoc._id).toEqual(upd8d._id)
        })

    })
})


describe('DELETE /api/docs/:id', () => {
    it('should find and delete doc with matching id', async() => {

        const testDoc = await Doc.create({
            title: "*** TESTING DELETE ENDPOINT ***",
            text: "Using supertest to test DELETE endpoint"
        })

        await request(app)
        .delete(`/api/docs/${testDoc._id}`)
        .expect(204)
        .then(async () => {
            console.log(`Document with id: ${testDoc._id} and title: ${testDoc.title} created and will be deleted now`)
            expect(await Doc.findOne({_id: testDoc._id})).toBeFalsy()
        })
    })
})
