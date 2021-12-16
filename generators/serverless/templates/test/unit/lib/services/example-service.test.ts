import { ExampleService } from '../../../../src/lib/services/example-service'

import { AppError, InputInvalidError, NotImplementedError } from '../../../../src/lib/errors'

describe('ExampleService', () => {
  let service: ExampleService = undefined

  beforeEach(() => {
    service = new ExampleService()
  })

  describe('Constructor', () => {
    it('should construct the instance as expected', () => {
      service.should.be.deep.equal({})
    })
  })

  describe('default', () => {
    it('should reject with an InputInvalidError if no id is supplied', () => {
      return service.example(undefined)
        .then(() => {
          throw new Error('Expected an error to be thrown but got success')
        }, err => {
          err.should.be.an.instanceOf(AppError)
          err.should.be.an.instanceOf(InputInvalidError)
        })
    })

    it('should reject with a NotImplementedError if id is supplied', () => {
      return service.example('some-id')
        .then(() => {
          throw new Error('Expected an error to be thrown but got success')
        }, err => {
          err.should.be.an.instanceOf(AppError)
          err.should.be.an.instanceOf(NotImplementedError)
        })
    })
  })
})
