const request = require('supertest');
const chai= require('chai');
const  chaiAP = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAP);

describe('functional - Pet',async () => {

    // Create Pet positive
    it('should create a pet', async () => {
        const pet = {
            name: 'Lilo',
            age: 4,
            colour: 'Brown'
        }
        
        const res = await request(app).post('/pets').send(pet);
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal(pet.name);
        expect(res.body.age).to.equal(pet.age);
        expect(res.body.colour).to.equal(pet.colour);
    })
    
    // Create Pet negative
    it('should fail to create a pet', async () => {
        const pet = {
            name: 'Lilo',
            age: 4,
            color: 'Brown'
        }
        
        const res = await request(app).post('/pets').send(pet);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('"colour" is required');
    })
});