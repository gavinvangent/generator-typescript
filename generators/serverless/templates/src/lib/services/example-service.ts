import { InputInvalidError, NotImplementedError } from '../errors'

export class ExampleService {
  async example(id: string): Promise<void> {
    if (!id) {
      throw new InputInvalidError()
    }

    throw new NotImplementedError()
  }
}
