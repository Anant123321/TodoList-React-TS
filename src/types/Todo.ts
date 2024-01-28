import {
  COMPLETED,
  COMPLTED_TODO_LIST,
  PENDING,
  PENDING_TODO_LIST,
} from '../constants'

export type TodoStatusType = typeof PENDING | typeof COMPLETED
export type TodoListType = typeof PENDING_TODO_LIST | typeof COMPLTED_TODO_LIST
export type TodoType = {
  title: string
  status: TodoStatusType
  id: number
}
