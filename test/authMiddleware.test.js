const chai=require('chai');
const chaiHttp=require('chai-http');
const app=require('../app');
chai.use(chaiHttp);
const {expect}=chai;

describe('Authentication Middleware Tests',()=>{
    it('SHOULD BLOCK ACCESS WITHOUT TOKEN',(done)=>{
        chai.request(app)
            .get('/products')
            .end((err,res)=>{
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message','ACCESS TOKEN REQUIRED');
                done();
            });
    });

    it('SHOULD ALLOW ACCESS WITH VALID TOKEN',(done)=>{
        chai.request(app)
            .post('/users/login')
            .send({username:'testuser',password:'password123'})
            .end((err,res)=>{
                const token=res.body.token;
                chai.request(app)
                    .get('/products')
                    .set('Authorization',`Bearer${token}`)
                    .end((err,res)=>{
                        expect(res).to.have.status(200);
                        done();
                    });
            });
    });

    it('SHOULD DENY ACCESS WITH INVALID TOKEN',(done)=>{
        chai.request(app)
            .get('/proudcts')
            .set('Authorization','BEARER INVALID TOKEN')
            .end((err,res)=>{
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('message','INVALID OR TOKEN EXPIRED');
                done();
            });
    });

});