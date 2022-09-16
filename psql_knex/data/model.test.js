var chai = require("chai")
var chaiAsPromised = require("chai-as-promised")
var chaiSubset = require('chai-subset')
var chaiHttp = require('chai-http')
var { server } = require('../index')

chai.use(chaiHttp)
// chai.use(chaiSubset)
// chai.use(chaiAsPromised)

var should = chai.should()
var expect = chai.expect

var model = require("./model")

describe('GET /v1/users', () => {
    it('should return 500 if id does not exist', (done) => {
        chai.request(server)
        .get('/users/1000')
        .end((err, res) => {
            res.should.have.status(500)
            done()
        })
    })
    it('should return 500 if no id is not int', (done) => {
        chai.request(server)
        .get('/users/10.1')
        .end((err, res) => {
            res.should.have.status(500)
            done()
        })
    })
    it('should return user if id exists', (done) => {
        chai.request(server)
        .get('/users/1')
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })
})