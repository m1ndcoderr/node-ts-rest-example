import { Student } from '../../entities'
import { StudentsCollection } from '../../types/db'
import { StudentPerformance } from '../../types/student/index'

export class Db {
  private static instance: Db

  private constructor() {}

  public static get Instance() {
    return this.instance || (this.instance = new this())
  }

  public getDb(): StudentsCollection {
    return {
      students: [
        new Student({
          fullname: 'John Doe',
          dateOfBirth: '2011-10-11',
          id: 1,
          performance: StudentPerformance.BAD
        }),
        new Student({
          fullname: 'Freddy Bono',
          dateOfBirth: '1998-05-15',
          id: 2,
          performance: StudentPerformance.PERFECT
        }),
        new Student({
          fullname: 'Bob Newbie',
          dateOfBirth: '1970-06-21',
          id: 3,
          performance: StudentPerformance.GOOD
        })
      ]
    }
  }
}
