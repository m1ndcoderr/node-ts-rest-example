import { createServer, IncomingMessage, ServerResponse } from 'http'

createServer((_req: IncomingMessage, res: ServerResponse): void => {
  res.writeHead(404).end()
}).listen(3000, () => console.log('Server is running...'))
