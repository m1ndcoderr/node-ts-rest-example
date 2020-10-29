import { Student } from '../../entities'
import { BadRequestException } from '../../exceptions'
import { StudentsCollection } from '../../types/db'
import { StudentPerformance } from '../../types/student'
import {
  CreateStudentDto,
  DeleteStudentDto,
  GetStudentDto,
  ListStudentsDto,
  UpdateStudentDto
} from './dto'

export class StudentService {
  private db: StudentsCollection

  constructor(db: StudentsCollection) {
    this.db = db
  }

  public getStudent(data: GetStudentDto) {
    const student = this.db.students.find(student => student.id === data.id)
    if (student) return student
    throw new BadRequestException('Student not found')
  }

  public listStudents(_data: ListStudentsDto): Student[] {
    return this.db.students
  }

  public createStudent(data: CreateStudentDto) {
    if (
      !Object.keys(data).includes('fullname') &&
      !Object.keys(data).includes('dateOfBirth')
    ) {
      throw new BadRequestException('Invalid data input')
    }
    if (!this.isValidDateString(data.dateOfBirth))
      throw new BadRequestException('Invalid date format')

    this.db.students.push({
      ...data,
      id: Math.floor(Math.random() * 100 * 100) + 1,
      dateOfBirth: new Date(data.dateOfBirth)
    })
  }

  public updateStudent(data: UpdateStudentDto) {
    if (!this.isValidDateString(data.dateOfBirth))
      throw new BadRequestException('Invalid date format')

    if (
      data.performance !== undefined &&
      !Object.values(StudentPerformance).includes(data.performance)
    )
      throw new BadRequestException('Invalid performance value')

    const student = this.db.students.find(student => student.id === data.id)
    if (!student) {
      throw new BadRequestException('Student not found')
    }

    const index = this.db.students.indexOf(student)
    this.db.students[index] = new Student({
      ...this.db.students[index],
      ...data
    })
  }

  public deleteStudent(data: DeleteStudentDto) {
    const student = this.db.students.find(student => student.id === data.id)
    if (!student) throw new BadRequestException('Student not found')
    this.db.students.splice(this.db.students.indexOf(student), 1)
  }

  private isValidDateString(date: string): boolean {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(date)
  }
}
