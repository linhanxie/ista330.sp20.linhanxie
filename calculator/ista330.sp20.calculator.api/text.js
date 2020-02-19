const assert = require('assert');
const calculator = require('./calculator.js');
describe('#calculate(expression)', function () {
    it('should return 5 when the expression is "3+2"', function () {
        assert.equal(calculator.calculate('3+2'), 5);
    });
    it('should return 31 when the expression is "3+2**5+8/4-2*3"', function () {
        assert.equal(calculator.calculate('3+2**5+8/4-2*3'), 31);
    });
    it('should return Infinity when the expression is "34*5+2/0*45-7"', function () {
        assert.equal(calculator.calculate('34*5+2/0*45-7'), Infinity);
    });
    it('should return NaN when the expression is "3-3*1/3-0*2/0"', function () {
        assert.equal(isNaN(calculator.calculate('3-3*1/3-0*2/0')), true);
    });
});
