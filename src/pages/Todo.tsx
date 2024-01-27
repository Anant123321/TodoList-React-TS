import { useState } from 'react'
import CreateTodosWidget from '../components/CreateTodoWidget'
import { TodoType } from '../types/Todo'
import TodosList from '../components/TodoList'

const TodoRenderer: React.FC = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([])
  return (
    <>
      <span className="heading">Kaary Soochi</span>
      <CreateTodosWidget setTodoList={setTodoList} />
      <TodosList todoList={todoList} setTodoList={setTodoList} />
    </>
  )
}

export default TodoRenderer
