const chai=require('chai');
const chaiHttp=require('chai-http');
const app=require('../app');
chai.use(chaiHttp);

const {expect}=chai;
describe('PRODUCT CONTROLLER TESTS',()=>{
    it('SHOULD FETCH ALL PRODUCTS',(done)=>{
        chai
            .request(app)
            .get('/products')
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res.body).tobe.an('array');
                done();
            });
    });

    if('SHOULD RETURN 404 FOR A NON-EXISTING PRODUCT',(done)=>{
        chai
            .request(app)
            .get('/products/1')
            .end((err,res)=>{
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
    });

});