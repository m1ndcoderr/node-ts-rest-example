import { BaseEntity } from './base.entity'
import { StudentPerformance } from '../types/student/index'

export class Student extends BaseEntity {
  fullname: string
  dateOfBirth: Date
  performance?: StudentPerformance

  constructor(data: {
    fullname: string
    dateOfBirth: string
    id?: number
    performance?: StudentPerformance
  }) {
    super(data.id)
    this.fullname = data.fullname
    this.dateOfBirth = new Date(data.dateOfBirth)
    this.performance = data.performance
  }
}
