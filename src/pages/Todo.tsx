import { useState } from 'react'
import CreateTodosWidget from '../components/CreateTodoWidget'
import { TodoListType, TodoType } from '../types/Todo'
import TodosList from '../components/TodoList'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import {
  COMPLETED,
  COMPLTED_TODO_LIST,
  PENDING,
  PENDING_TODO_LIST,
} from '../constants'

const TodoRenderer: React.FC = () => {
  const [pendingTodoList, setPendingTodoList] = useState<TodoType[]>([])
  const [completedTodoList, setCompletedTodoList] = useState<TodoType[]>([])

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

  const onDragEnd: (result: DropResult) => void = (result) => {
    const { source, destination } = result
    if (!destination) {
      return
    }
    const { droppableId: sourceId, index: sourceIndex } = source
    const { droppableId: destId, index: destIndex } = destination
    if (sourceId === destId && sourceIndex === destIndex) {
      return
    }
    const { list: sourceList } = getListType(sourceId as TodoListType)
    const { list: destinationList, setList: setDestinationList } = getListType(
      destId as TodoListType
    )
    let itemToAdd = sourceList[sourceIndex]
    itemToAdd = {
      ...itemToAdd,
      status: destId === COMPLTED_TODO_LIST ? COMPLETED : PENDING,
    }
    sourceList.splice(sourceIndex, 1)
    destinationList.splice(destIndex, 0, itemToAdd)
    setDestinationList(destinationList)
  }
  return (
    <>
      <span className="heading">Kaary Soochi</span>
      <DragDropContext onDragEnd={onDragEnd}>
        <CreateTodosWidget setPendingTodoList={setPendingTodoList} />
        <TodosList
          pendingTodoList={pendingTodoList}
          setPendingTodoList={setPendingTodoList}
          completedTodoList={completedTodoList}
          setCompletedTodoList={setCompletedTodoList}
        />
      </DragDropContext>
    </>
  )
}

export default TodoRenderer
