const request = require('supertest');
const { expect } = require('chai');

const app = require('../../rest/app')

describe('User', () => {
    describe('POST /api/users', () => {
        it('Quanto tento informar um usuario que ja tenha email cadastrado devo receber 400 via http', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/register')
                .send({
                    name: "marlon",
                    email: "email@email.com",
                    password: "123456"
                })
            expect(resposta.status).to.equal(400)
        })
        it('Quanto tento informar um usuario que ja tenha email cadastrado devo receber a mensagem "Email já cadastrado', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/register')
                .send({
                    name: "marlon",
                    email: "email@email.com",
                    password: "123456"
                })
            expect(resposta.body).to.have.property('error', 'Email já cadastrado')
        })
    })
})