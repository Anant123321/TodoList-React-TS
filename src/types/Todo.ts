import { COMPLETED, PENDING } from '../constants'

export type TodoStatusType = typeof PENDING | typeof COMPLETED
export type TodoType = {
  title: string
  status: TodoStatusType
  id: number
}
