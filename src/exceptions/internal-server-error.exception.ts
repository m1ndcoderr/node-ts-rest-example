import { BaseException } from './base-exception'

export class InternalServerErrorException extends BaseException {
  constructor(errorMessage?: string) {
    super(500, errorMessage || 'Internal server error')
  }
}
