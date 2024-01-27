import { COMPLETED } from '../../constants'
import { TodoType } from '../../types/Todo'
import TodoCard from '../TodoCard'
import './index.css'

type Props = {
  todoList: TodoType[]
  setTodoList: React.Dispatch<React.SetStateAction<TodoType[]>>
}
const TodosList: React.FC<Props> = ({ todoList, setTodoList }) => {
  const deleteTodo: (id: number) => void = (id) => {
    const updatedList: TodoType[] = todoList.filter((todo) => {
      return todo.id !== id
    })
    setTodoList(updatedList)
  }
  const completeTodo: (id: number) => void = (id) => {
    const updatedList: TodoType[] = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: COMPLETED,
        }
      }
      return todo
    })
    setTodoList(updatedList)
  }
  const updateTodo: (todo: TodoType) => void = (updatedTodo) => {
    const updatedList: TodoType[] = todoList.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo
      }
      return todo
    })
    setTodoList(updatedList)
  }
  return (
    <div className="todo-list">
      {todoList.map((todo) => {
        return (
          <TodoCard
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
            updateTodo={updateTodo}
          />
        )
      })}
    </div>
  )
}

export default TodosList
