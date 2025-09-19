const request = require('supertest');
const sinon = require('sinon');
const {expect} = require('chai');

const app = require('../../rest/app')

describe('User Controller', ()=>{
    describe('POST /api/users',()=>{
        it('Quanto tento informar um usuario que ja tenha email cadastrado devo receber 400',async()=>{
            const resposta = await request(app)
            .post('/api/users/register')
            .send({
                name:"marlon",
                email:"email@email.com",
                password:"123456"
            })
            expect(resposta.status).to.equal(400)
        })
        
        it('Quando informo credenciais válidas de um usuário devo receber 201 ',async()=>{
            const resposta = await request(app)
            .post('/api/users/register')
            .send({
                name:"Alice",
                email:"alice@email.com",
                password:"123456"
            })
            expect(resposta.status).to.equal(201);
        })
    })

})