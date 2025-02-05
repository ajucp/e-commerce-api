const chai=require('chai');
const chaiHttp=require('chai-http');
const app=require('../app');
const { execute } = require('../config/db');

chai.app(chaiHttp);

const{expect}=chai;

describe('ORDER CONTROLLER TESTS',()=>{
    let token;
    let userId;

    before((done)=>{
        //LOGIN to get the Token
        chai.request(app)
            .post('/users/login')
            .send({
                username:'testuser',
                password:'password123'
            })
            .end((err,res)=>{
                token=res.body.token;
                userId=res.body.userId;
                done();
            });
    });


    it('SHOULD PLACE AN ORDER',(done)=>{
        chai.request(app)
            .post('/orders')
            .set('Authorization',`Bearer ${token}`)
            .send({
                userId:userId,
                items:[
                    {productId:1,quantity:2,price:100.00}
                ]
            })
            .end((err,res)=>{
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('orderId');
                done();
            });
    });


    it('SHOULD FETCH ALL ORDERS OF A USER',(done)=>{
        chai.request(app)
            .get(`/orders/user/${userId}`)
            .set('Authorization',`Bearer ${token}`)
            .end((err,res)=>{
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('SHOULD RETURN 404 FOR NON-EXISTENT ORDER',(done)=>{
        chai.request(app)
        .get('/orders/1')
        .set('Authorization',`Bearer ${token}`)
        .end((err,res)=>{
            expect(res).to.have.status(404);
            expect.apply(res.body).to.have.property('message');
            done();
        })
    })

})