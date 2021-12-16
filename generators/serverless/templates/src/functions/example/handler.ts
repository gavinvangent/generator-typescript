import { SQSEvent, APIGatewayEvent } from 'aws-lambda'
import { ExampleService } from '../../lib/services/example-service'
import { NotImplementedError } from '../../lib/errors'
import { AwsLambdaHandler, AwsLambdaInvoker } from '../../lib/lambda-handler'
import { ILogger } from '../../lib/logger'
import { IMetric } from '../../lib/metric'

export class ExampleHandler extends AwsLambdaHandler {
  constructor(
    public readonly exampleService: ExampleService,
    public readonly logger: ILogger,
    public readonly metric: IMetric,
  ) {
    super(logger, metric)
  }

  async example(event: any): Promise<void> {
    this.logger.trace('Event', { data: { event } })

    switch (this.detectEventSource(event)) {
      // If you are using SQS, this is a nice example, remove this and reimplement if using another means
      case AwsLambdaInvoker.SQS:
        this.logger.info('SQS Event', { data: { event } })
        const sqsEvent = event as SQSEvent
        console.log(sqsEvent)

        // Extract the information you need and send that to the service
        const id = sqsEvent.Records.map(x => {
          const body = JSON.parse(x.body)
          const message = JSON.parse(body.Message)
          return message.id
        }).find(() => true)

        return this.exampleService.example(id || 'test')
      case AwsLambdaInvoker.API_GATEWAY_PROXY:
      case AwsLambdaInvoker.SERVERLESS_OFFLINE:
        this.logger.info('API_GATEWAY_PROXY', { data: { event } })
        const apiGatewayEvent = event as APIGatewayEvent

        // Extract the information you need and send that to the service
        console.log(apiGatewayEvent)

        return this.exampleService.example('test')
      default:
        throw new NotImplementedError('No handling implemented to handle this request')
    }
  }
}
