var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var chaiSubset = require('chai-subset');

chai.use(chaiSubset);
chai.use(chaiAsPromised);


var expect = chai.expect;

var model = require("./model")

describe('Test UserDB get user', () => {
    before('insert one user in db', () => {
        model.insert('Gawr')
    })
    after('insert one user in db', () => {
        model.deleteUser('1')
    })
    it('must not get if id does not exist', () => {
        expect(model.retrieve('3')).to.eventually.throw(Error)
    })
    it('must not get if id is not int', () => {
        expect(model.retrieve('2.1')).to.eventually.throw(Error)
    })
    it('must be able to get id', () => {
        expect(model.retrieve('1')).to.eventually.containSubset({ id: 1 })
    })
})