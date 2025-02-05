const chai=require('chai');
const chaiHttp=require('chai-http');
const app=require('../app');
const { execute } = require('../config/db');
chai.use(chaiHttp);
const {expect}=chai;

describe('ROLE-BASED ACCESS TESTS',()=>{
    let adminToken;
    let userToken;

    before((done)=>{

        //Login as admin
        chai.request(app)
            .post('/users/login')
            .send({username:'admin',password:'adminpassword'})
            .end((err,res)=>{
                adminToken=res.body.token;

                //Login as regular user
                chai.request(app)
                    .post('/users/login')
                    .send({username:'user',password:'userpassword'})
                    .end((err,res)=>{
                        userToken=res.body.token;
                        done();
                    });

            });
    });

    it('SHOULD ALLOW ADMIN TO ADD A PRODUCT',(done)=>{
        chai.request(app)
            .post('/products')
            .set('Authorization',`Bearer ${adminToken}`)
            .send({name:'NEW PRODUCT',description:'Test',price:100,stock:5})
            .end((err,res)=>{
                expect(res).to.have.status(201);
                done();
            });
    });

    it('SHOULD PREVENT REGULAR USERS FROM ADDING A PRODUCT',(done)=>{
        chai.request(app)
            .post('/products')
            .set('Authorization',`Bearer ${userToken}`)
            .send({name:'INVALID PRODUCT',description:'Test',price:100,stock:5})
            .end((err,res)=>{
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('message','FORBIDDEN:INSUFFICENT PERMISSIONS');
                done();
            });
    });
});