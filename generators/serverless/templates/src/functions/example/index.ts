import { ExampleService } from '../../lib/services/example-service'
import { ExampleHandler } from './handler'
import { Logger } from '../../lib/logger'
import { NoopMetric } from '../../lib/metric'

const logger = new Logger({ name: 'example-handler', level: 'debug' })
const metric = new NoopMetric()

const exampleService = new ExampleService()
const exampleHandler = new ExampleHandler(exampleService, logger, metric)

module.exports = {
  example: exampleHandler.example.bind(exampleHandler),
}
