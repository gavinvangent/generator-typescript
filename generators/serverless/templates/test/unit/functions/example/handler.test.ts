import sinon, { stubInterface } from 'ts-sinon'
import { should } from 'chai'
import { SQSEvent, SQSRecord } from 'aws-lambda'

import { ExampleHandler } from '../../../../src/functions/example/handler'
import { ILogger } from '../../../../src/lib/logger'
import { IMetric } from '../../../../src/lib/metric'
import { NotImplementedError } from '../../../../src/lib/errors'
import { ExampleService } from '../../../../src/lib/services/example-service'

describe('ExampleHandler', () => {
  let sandbox: sinon.SinonSandbox = null

  let logger = null
  let metric = null
  let exampleService = null
  let handler: ExampleHandler = null

  beforeEach(() => {
    sandbox = sinon.createSandbox()

    logger = stubInterface<ILogger>()
    metric = stubInterface<IMetric>()
    exampleService = stubInterface<ExampleService>()
    handler = new ExampleHandler(exampleService, logger, metric)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('Constructor', () => {
    it('should construct an instance as expected', () => {
      handler.should.be.deep.equal({
        exampleService,
        logger,
        metric,
      })
    })
  })

  describe('example', () => {
    it('should reject with a NotImplementedError if invoked by a resource that is not supported', () => {
      const event = {}

      const detectEventSourceStub = sandbox.stub(handler, 'detectEventSource')
      detectEventSourceStub.returns(undefined)

      return handler.example(event)
        .then(() => {
          throw new Error('Expected an error to be thrown but got success')
        }, err => {
          detectEventSourceStub.should.have.been.calledOnce
          detectEventSourceStub.should.have.been.calledWithExactly(event)

          exampleService.captureIssue.should.not.have.been.called

          err.should.be.an.instanceOf(NotImplementedError)
          err.message.should.be.equal('No handling implemented to handle this request')
        })
    })

    describe('SQS', () => {
      let message: any
      let event: SQSEvent

      beforeEach(() => {
        message = { id: 'test' }
        event = wrapMessageAsSQSEvent(message)
      })

      const wrapMessageAsSQSEvent = (message: any): SQSEvent => {
        return {
          Records: [{
            eventSource: 'aws:sqs',
            body: JSON.stringify({
              Message: JSON.stringify(message),
            }),
          } as SQSRecord],
        }
      }

      it('should reject with any error thrown by exampleService', () => {
        const error = new Error('Some fake error')

        const detectEventSourceStub = sandbox.stub(handler, 'detectEventSource')
        detectEventSourceStub.callThrough()

        exampleService.example.rejects(error)

        return handler.example(event)
          .then(() => {
            throw new Error('Expected an error to be thrown but got success')
          }, err => {
            detectEventSourceStub.should.have.been.calledOnce
            detectEventSourceStub.should.have.been.calledWithExactly(event)

            exampleService.example.should.have.been.calledOnce
            exampleService.example.should.have.been.calledWithExactly(message.id)

            err.should.be.equal(error)
          })
      })

      it('should resolve void if no errors are thrown', () => {
        const detectEventSourceStub = sandbox.stub(handler, 'detectEventSource')
        detectEventSourceStub.callThrough()

        exampleService.example.resolves()

        return handler.example(event)
          .then(result => {
            detectEventSourceStub.should.have.been.calledOnce
            detectEventSourceStub.should.have.been.calledWithExactly(event)

            exampleService.example.should.have.been.calledOnce
            exampleService.example.should.have.been.calledWithExactly(message.id)

            should().not.exist(result)
          })
      })
    })
  })
})
