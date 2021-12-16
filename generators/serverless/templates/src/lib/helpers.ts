import { createHash, BinaryToTextEncoding } from 'crypto'

export class Helper {
  static hash(value: string, algorithm: string = 'md5', encoding: BinaryToTextEncoding = 'hex'): string {
    return createHash(algorithm).update(value).digest(encoding)
  }
}
