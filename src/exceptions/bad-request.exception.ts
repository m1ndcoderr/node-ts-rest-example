import { BaseException } from './base-exception'

export class BadRequestException extends BaseException {
  constructor(errorMessage?: string) {
    super(400, errorMessage || 'Bad request')
  }
}
