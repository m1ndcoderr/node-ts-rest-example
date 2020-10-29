export abstract class BaseException extends Error {
  statusCode: number
  errorMessage: string
  constructor(statusCode: number, errorMessage?: string) {
    super()
    this.statusCode = statusCode
    this.errorMessage = errorMessage || this.message
  }
}
