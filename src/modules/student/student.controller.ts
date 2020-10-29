import { IncomingMessage, ServerResponse } from 'http'
import { StudentService } from './student.service'
import { catchException, getIdFromUrl, getRequestBody } from '../../utils'

export class StudentController {
  private readonly studentService: StudentService

  constructor(studentService: StudentService) {
    this.studentService = studentService
  }

  public async use(req: IncomingMessage, res: ServerResponse): Promise<void> {
    this.getStudent(req, res)
    this.listStudents(req, res)
    this.deleteStudent(req, res)

    await this.createStudent(req, res)
    await this.updateStudent(req, res)
  }

  private getStudent(req: IncomingMessage, res: ServerResponse): void {
    if (req.method === 'GET' && this.isUrlContainsId(req.url!)) {
      try {
        return res
          .writeHead(200, { 'Content-Type': 'application/json' })
          .end(
            JSON.stringify(
              this.studentService.getStudent({ id: getIdFromUrl(req.url!) })
            )
          )
      } catch (e) {
        catchException(res, e)
      }
    }
  }

  private listStudents(req: IncomingMessage, res: ServerResponse): void {
    if (req.method === 'GET' && req.url === '/students') {
      try {
        return res
          .writeHead(200, { 'Content-Type': 'application/json' })
          .end(JSON.stringify(this.studentService.listStudents({})))
      } catch (e) {
        catchException(res, e)
      }
    }
  }

  private async createStudent(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    if (req.method === 'POST' && req.url === '/students') {
      try {
        const data = await getRequestBody(req)
        this.studentService.createStudent(data)
        return res.writeHead(200, { 'Content-Type': 'application/json' }).end()
      } catch (e) {
        catchException(res, e)
      }
    }
  }

  private async updateStudent(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    if (req.method === 'PUT' && this.isUrlContainsId(req.url!)) {
      try {
        const data = await getRequestBody(req)
        this.studentService.updateStudent({
          id: getIdFromUrl(req.url!),
          ...data
        })
        return res.writeHead(200, { 'Content-Type': 'application/json' }).end()
      } catch (e) {
        catchException(res, e)
      }
    }
  }

  private deleteStudent(req: IncomingMessage, res: ServerResponse): void {
    if (req.method === 'DELETE' && this.isUrlContainsId(req.url!)) {
      try {
        this.studentService.deleteStudent({ id: getIdFromUrl(req.url!) })
        return res.writeHead(200, { 'Content-Type': 'application/json' }).end()
      } catch (e) {
        catchException(res, e)
      }
    }
  }

  private isUrlContainsId(url: string): boolean {
    return /\/students\/\d+$/.test(url)
  }
}
