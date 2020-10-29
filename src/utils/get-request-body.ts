import { IncomingMessage } from 'http'

export const getRequestBody = async (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = ''
    req
      .on('error', e => reject(e))
      .on('data', chunk => (body += chunk))
      .on('end', () => resolve(JSON.parse(body)))
  })
}
