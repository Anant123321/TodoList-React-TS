/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useRef, useState } from 'react'
import { COMPLETED } from '../../constants'
import { TodoType } from '../../types/Todo'
import './index.css'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'

type Props = {
  todo: TodoType
  deleteTodo: (id: number) => void
  completeTodo: (id: number) => void
  updateTodo: (todo: TodoType) => void
}
const TodoCard: React.FC<Props> = ({
  todo,
  deleteTodo,
  completeTodo,
  updateTodo,
}) => {
  const { title, id, status } = todo
  const [enableEdit, setEnableEdit] = useState(false)
  const [todoTitle, setTodoTitle] = useState(title)
  const todoCardRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    todoCardRef.current?.focus()
  }, [enableEdit])

  const todoEditHandler: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const { value } = e.target
    setTodoTitle(value)
  }

  const saveTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateTodo({
        ...todo,
        title: todoTitle,
      })
      setEnableEdit(false)
    }
  }
  return (
    <div className="todo-card">
      {enableEdit ? (
        <input
          ref={todoCardRef}
          value={todoTitle}
          onChange={todoEditHandler}
          onKeyPress={saveTodo}
          className="todo-title"
        />
      ) : status === COMPLETED ? (
        <s className="todo-title">{title}</s>
      ) : (
        <span className="todo-title">{title}</span>
      )}
      <div className="todo-icons">
        <span className="todo-icon" onClick={() => setEnableEdit(true)}>
          <AiFillEdit />
        </span>
        <span className="todo-icon" onClick={() => deleteTodo(id)}>
          <AiFillDelete />
        </span>
        <span className="todo-icon" onClick={() => completeTodo(id)}>
          <MdDone />
        </span>
      </div>
    </div>
  )
}

export default TodoCard
