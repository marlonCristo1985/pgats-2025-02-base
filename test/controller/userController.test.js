const request = require('supertest');
const sinon = require('sinon');
const {expect} = require('chai');

const app = require('../../rest/app')

describe('User Controller', ()=>{
    describe('POST /api/users',()=>{

        it('Quando informo credenciais válidas de um usuário devo receber 201 ',async()=>{
            const resposta = await request(app)
            .post('/api/users/register')
            .send({
                name:"jamile",
                email:"jamile@email.com",
                password: 123456
            })
            expect(resposta.status).to.equal(201);
        })

        it('Quanto tento informar um usuario que ja tenha email cadastrado devo receber 400',async()=>{
            const resposta = await request(app)
            .post('/api/users/register')
            .send({
                name:"jamile",
                email:"jamile@email.com",
                password:"123456"
            })
            expect(resposta.status).to.equal(400);
        })
        
        it('Quando tento informar um usuario que ja tenha email cadastrado devo receber a mensagem "Email já cadastrado', async () => {
            const resposta = await request(app)
                .post('/api/users/register')
                .send({
                    name: "jamile",
                    email: "jamile@email.com",
                    password: "123456"
                })
            expect(resposta.body).to.have.property('error', 'Email já cadastrado');
        })
    })

})