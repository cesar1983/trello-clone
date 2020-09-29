import React, { useRef } from 'react'
import { useAppState } from '../../AppStateContext'
import { useItemDrag } from '../../utils/useItemDrag'
import { useDrop } from 'react-dnd'

import AddNewItem from '../AddNewItem'
import { DragItem } from '../../DragItem'
import isHidden from '../../utils/isHidden'
import Card from '../Card'

import * as S from './styles'

type ColumnProps = {
  //  text: string | undefined;
  title: string
  index: number
  id: string
}

const Column = ({ title, index, id }: ColumnProps) => {
  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)

  const { drag } = useItemDrag({ index, id, title, type: 'COLUMN' })
  drag(ref)

  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover(item: DragItem) {
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } })
      item.index = hoverIndex
    }
  })
  drag(drop(ref))

  return (
    <S.ColumnContainer
      ref={ref}
      isHidden={isHidden(state.draggedItem, 'COLUMN', id)}
    >
      <S.ColumnTitle>{title}</S.ColumnTitle>

      {state.lists[index].tasks.map((task) => (
        <Card text={task.text} key={task.id} />
      ))}

      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) =>
          dispatch({ type: 'ADD_TASK', payload: { text, listId: id } })
        }
        dark
      />
    </S.ColumnContainer>
  )
}

export default Column
