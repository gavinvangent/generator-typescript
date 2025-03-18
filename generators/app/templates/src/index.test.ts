import sinon from 'ts-sinon'

describe('Index', () => {
  let sandbox: sinon.SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
    sandbox = undefined
  })

  describe('your tests go here', () => {
    it('and hopefully they succeed always', () => {
      const value = 5
      return Promise.resolve(value)
        .then(result => {
          result.should.be.equal(value)
        })
    })
  })
})
