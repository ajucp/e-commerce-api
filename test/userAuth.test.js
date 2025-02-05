const chai=require('chai');
const chaiHttp=require('chai-http');
const app=require('../app');

chai.use(chaiHttp);

const {expect}=chai;

describe('USER AUTHENTICATION TESTS',()=>{
    it('SHOULD REGISTER A NEW USER ',(done)=>{
        chai    
            .request(app)
            .post('/user/register')
            .send({
                username:'testuser',
                password:'password123',
                email:'test@example.com',
                address:'123 test street',
            })
            .end((err,res)=>{
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('id');
                done();
            });
    });

    it('SHOULD LOGIN A USER AND REURN A TOKEN',(done)=>{
        chai
            .request(app)
            .post('/users/login')
            .send({
                username:'testuser',
                password:'password123'
            })
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                done();
            });
    });
});