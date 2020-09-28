import React from 'react'
import AddNewItem from '../AddNewItem'

import { useAppState } from '../../AppStateContext'

import * as S from './styles'
import Card from '../Card'

type ColumnProps = {
  //  text: string | undefined;
  title?: string
  index: number
  id: string
}

const Column = ({ title, index, id }: ColumnProps) => {
  const { state, dispatch } = useAppState()

  return (
    <S.ColumnContainer>
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
