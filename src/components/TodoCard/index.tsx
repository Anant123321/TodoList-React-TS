/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useRef, useState } from 'react'
import { COMPLETED } from '../../constants'
import { TodoType } from '../../types/Todo'
import './index.css'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
  todo: TodoType
  deleteTodo: (id: number) => void
  completeTodo: (todo: TodoType) => void
  updateTodo: (todo: TodoType) => void
  index: number
}
const TodoCard: React.FC<Props> = ({
  todo,
  deleteTodo,
  completeTodo,
  updateTodo,
  index,
}) => {
  const { title, id, status } = todo
  const [enableEdit, setEnableEdit] = useState(false)
  const [todoTitle, setTodoTitle] = useState(title)
  const todoCardRef = useRef<HTMLInputElement>(null)
  const isCompleted = status === COMPLETED

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
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={`todo-card ${snapshot.isDragging ? 'drag' : ''}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {enableEdit ? (
            <input
              ref={todoCardRef}
              value={todoTitle}
              onChange={todoEditHandler}
              onKeyPress={saveTodo}
              className="todo-title"
            />
          ) : isCompleted ? (
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
            <span className="todo-icon" onClick={() => completeTodo(todo)}>
              {isCompleted ? <RxCross2 /> : <MdDone />}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TodoCard
