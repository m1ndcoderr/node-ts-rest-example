import { BaseException } from '../exceptions'
import { ServerResponse } from 'http'

export function catchException(res: ServerResponse, e: BaseException): void {
  return res
    .writeHead(e.statusCode, { 'Content-Type': 'application/json' })
    .end(JSON.stringify(e))
}
