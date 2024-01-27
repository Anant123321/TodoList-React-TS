import { useRef, useState } from 'react'
import './index.css'
import { TodoType } from '../../types/Todo'
import { PENDING } from '../../constants'

type Props = {
  setTodoList: React.Dispatch<React.SetStateAction<TodoType[]>>
}

const CreateTaskWidget: React.FC<Props> = ({ setTodoList }) => {
  const [todoValue, setTodoValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const taskInputChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTodoValue(value)
  }

  const addTodo: () => void = () => {
    if (todoValue) {
      const toDo: TodoType = {
        title: todoValue,
        status: PENDING,
        id: Date.now(),
      }
      setTodoList((prev) => [...prev, toDo])
      setTodoValue('')
      inputRef.current?.blur()
    }
  }
  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e
    if (key === 'Enter') {
      addTodo()
    }
  }
  return (
    <div className="task_input_widget">
      <input
        ref={inputRef}
        onChange={taskInputChangeHandler}
        onKeyPress={keyPressHandler}
        className="task_input_widget_field"
        placeholder="Create a task"
        value={todoValue}
      ></input>
      <button className="task_input_widget_button" onClick={addTodo}>
        GO
      </button>
    </div>
  )
}

export default CreateTaskWidget
