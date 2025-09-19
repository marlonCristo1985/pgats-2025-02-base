const request = require('supertest');
const { expect } = require('chai');


describe('User', () => {
    describe('POST /api/users', () => {
        it('Quando informe dados do usuário válidos devo receber 201 CREATED', async() => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/register')
                .send({
                    name: "marlon",
                    email: "email@email.com",
                    password: "123456"
                })
            expect(resposta.status).to.equal(201);
        })

        it('Quando tento informar um usuario que ja tenha email cadastrado devo receber 400 via http', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/register')
                .send({
                    name: "marlon",
                    email: "email@email.com",
                    password: "123456"
                })
            expect(resposta.status).to.equal(400);
        })
        it('Quando tento informar um usuario que ja tenha email cadastrado devo receber a mensagem "Email já cadastrado', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/register')
                .send({
                    name: "marlon",
                    email: "email@email.com",
                    password: "123456"
                })
            expect(resposta.body).to.have.property('error', 'Email já cadastrado');
        })
    })
})