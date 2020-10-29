import { createServer, IncomingMessage, ServerResponse } from 'http'
import { Db } from './modules/db/db'
import { StudentController } from './modules/student/student.controller'
import { StudentService } from './modules/student/student.service'

const studentService = new StudentService(Db.Instance.getDb())
const studentController = new StudentController(studentService)

createServer(
  async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    await studentController.use(req, res)
    if (!res.headersSent) res.writeHead(404).end()
  }
).listen(3000, () => console.log('Server is running...'))
