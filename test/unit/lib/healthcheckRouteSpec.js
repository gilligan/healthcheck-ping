'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    healthcheckRoute = require('../../../lib/healthcheckRoute');

chai.use(sinonChai);

describe('healthcheck route', function () {
    var response;

    beforeEach(function () {
        response = {
            status: sinon.stub().returnsThis(),
            end: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis()
        };
    });

    it('should send status code 200', function () {
        healthcheckRoute(null, response);

        expect(response.status).to.have.been.calledOnce;
        expect(response.status).to.have.been.calledWithExactly(200);
    });

    it('should send a payload with status=OK', function () {
        var expectedPayload = { status: 'OK' };

        healthcheckRoute(null, response);

        expect(response.json).to.have.been.calledOnce;
        expect(response.json).to.have.been.calledWithExactly(expectedPayload);
    });

    it('should flush the response sending', function () {
        healthcheckRoute(null, response);

        expect(response.end).to.have.been.calledOnce;
        expect(response.end).to.have.been.calledWithExactly();
    });
});
