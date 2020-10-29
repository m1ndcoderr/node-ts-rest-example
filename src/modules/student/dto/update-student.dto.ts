import { StudentPerformance } from '../../../types/student'

export class UpdateStudentDto {
  id: number
  fullname?: string
  dateOfBirth: string
  performance: StudentPerformance
}
