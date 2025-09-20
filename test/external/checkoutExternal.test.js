const request = require('supertest');
const { expect } = require('chai');


describe('Checkout', () => {

    let token = null;

    beforeEach(async () => {

        const respostaLogin = await request('http://localhost:3000')
            .post('/api/users/login')
            .send({
                email: "livia@email.com",
                password: "321lkj"
            });

        token = respostaLogin.body.token;
    })

    describe('POST /api/checkout', () => {
        it('Quando tento fazer um checkout sem informar as credenciais o retorno deve ser 401', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/checkout')
                .send({
                    userId: "",
                    items: "",
                    freight: "",
                    paymentMethod: "",
                    cardData: ""
                });

            expect(resposta.status).to.equal(401);
        })

        it('Quando tento fazer um checkout sem informar as credenciais o retorno deve retornar a mensagem "token inválido"', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/checkout')
                .send({
                    userId: "",
                    items: "",
                    freight: "",
                    paymentMethod: "",
                    cardData: ""
                });

            expect(resposta.body).to.have.property('error', 'Token inválido');
        })

        it('Quando informo dados válidos o checkout é realizado e o retorno será 200', async () => {

            const respostacheckout = await request('http://localhost:3000')
                .post('/api/checkout')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    items: [{
                        productId: 2,
                        quantity: 10
                    }
                    ],
                    freight: 200,
                    paymentMethod: "boleto"
                });

            expect(respostacheckout.status).to.equal(200)
        })
        it('COM FIXTURE: Quando informo dados válidos o checkout é realizado e o dados do pedido são retornados', async () => {

            const respostacheckout = await request('http://localhost:3000')
                .post('/api/checkout')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    items: [{
                        productId: 2,
                        quantity: 10
                    }
                    ],
                    freight: 200,
                    paymentMethod: "boleto"
                });

            const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosoCheckoutEhRealizado.json');
            delete respostaEsperada.userId;
            delete respostacheckout.body.userId;

            expect(respostacheckout.body).to.eql(respostaEsperada);
        })
    })
});