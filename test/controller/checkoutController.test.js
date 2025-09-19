const request = require('supertest');
const sinon = require('sinon');
const {expect} = require('chai');

const app = require('../../rest/app')

describe('Checkout Controller', ()=>{
    describe('POST /api/checkout', ()=>{
        it('Quando tento fazer um checkout sem informar as credenciais o retorno deve ser 401', async()=>{
            const resposta = await request(app)
                .post('/api/checkout')
                .send({
                    userId:"",
                    items:"",
                    freight:"",
                    paymentMethod:"",
                    cardData:""
                })
                expect(resposta.status).to.equal(401)
        })
        it('Quando tento fazer um checkout sem informar as credenciais o retorno deve retornar a mensagem "token inválido"', async()=>{
            const resposta = await request(app)
                .post('/api/checkout')
                .send({
                    userId:"",
                    items:"",
                    freight:"",
                    paymentMethod:"",
                    cardData:""
                })
                expect(resposta.body).to.have.property('error','Token inválido')
        })
    })
});