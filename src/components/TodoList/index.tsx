import { Droppable } from 'react-beautiful-dnd'
import {
  COMPLETED,
  COMPLTED_TODO_LIST,
  PENDING,
  PENDING_TODO_LIST,
} from '../../constants'
import { TodoListType, TodoType } from '../../types/Todo'
import TodoCard from '../TodoCard'
import './index.css'

type Props = {
  pendingTodoList: TodoType[]
  setPendingTodoList: React.Dispatch<React.SetStateAction<TodoType[]>>
  completedTodoList: TodoType[]
  setCompletedTodoList: React.Dispatch<React.SetStateAction<TodoType[]>>
}
const TodosList: React.FC<Props> = ({
  pendingTodoList,
  setPendingTodoList,
  completedTodoList,
  setCompletedTodoList,
}) => {
  const getListType: (type: TodoListType) => {
    list: TodoType[]
    setList: React.Dispatch<React.SetStateAction<TodoType[]>>
  } = (type) => {
    switch (type) {
      case PENDING_TODO_LIST:
        return { list: pendingTodoList, setList: setPendingTodoList }
      default:
        return { list: completedTodoList, setList: setCompletedTodoList }
    }
  }
  const deleteTodo: (id: number, listType: TodoListType) => void = (
    id,
    listType
  ) => {
    const { list, setList } = getListType(listType)
    const updatedList: TodoType[] = list.filter((todo) => {
      return todo.id !== id
    })
    setList(updatedList)
  }
  const completeTodo: (todo: TodoType, listType: TodoListType) => void = (
    todo,
    listType
  ) => {
    const updatedTodo: TodoType = {
      ...todo,
      status: todo.status === COMPLETED ? PENDING : COMPLETED,
    }
    const { list: sourceList, setList: setSourceList } = getListType(listType)
    const { list: destinationList, setList: setDestinationList } = getListType(
      updatedTodo.status === COMPLETED ? COMPLTED_TODO_LIST : PENDING_TODO_LIST
    )
    const updatedSourceList = sourceList.filter((todoItem) => {
      return todoItem.id !== todo.id
    })
    destinationList.push(updatedTodo)
    setSourceList(updatedSourceList)
    setDestinationList(destinationList)
  }
  const updateTodo: (updatedTodo: TodoType, listType: TodoListType) => void = (
    updatedTodo,
    listType
  ) => {
    const { list, setList } = getListType(listType)
    const updatedList: TodoType[] = list.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo
      }
      return todo
    })
    setList(updatedList)
  }

  return (
    <div className="todo-list-container">
      <Droppable droppableId={PENDING_TODO_LIST}>
        {(provided, snapshot) => (
          <div
            className={`todo-list-pending ${snapshot.isDraggingOver ? 'drag-active' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <p className="task-title">Active tasks</p>
            {pendingTodoList.map((todo, index) => {
              return (
                <TodoCard
                  index={index}
                  key={todo.id}
                  todo={todo}
                  deleteTodo={(id: number) => deleteTodo(id, PENDING_TODO_LIST)}
                  completeTodo={(todo: TodoType) =>
                    completeTodo(todo, PENDING_TODO_LIST)
                  }
                  updateTodo={(todo: TodoType) =>
                    updateTodo(todo, PENDING_TODO_LIST)
                  }
                />
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={COMPLTED_TODO_LIST}>
        {(provided, snapshot) => (
          <div
            className={`todo-list-completed ${snapshot.isDraggingOver ? 'drag-active' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <p className="task-title">Completed tasks</p>
            {completedTodoList.map((todo, index) => {
              return (
                <TodoCard
                  index={index}
                  key={todo.id}
                  todo={todo}
                  deleteTodo={(id: number) =>
                    deleteTodo(id, COMPLTED_TODO_LIST)
                  }
                  completeTodo={(todo: TodoType) =>
                    completeTodo(todo, COMPLTED_TODO_LIST)
                  }
                  updateTodo={(todo: TodoType) =>
                    updateTodo(todo, COMPLTED_TODO_LIST)
                  }
                />
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TodosList
