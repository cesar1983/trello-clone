import React from 'react'
import Column from './components/Column'
import AddNewItem from './components/AddNewItem'
import { useAppState } from './AppStateContext'

import * as S from './styles'

function App() {
  const { state, dispatch } = useAppState()

  return (
    <S.AppContainer>
      {state.lists.map((list, i) => (
        <Column title={list.text} key={list.id} index={i} id={list.id} />
      ))}

      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch({ type: 'ADD_LIST', payload: text })}
      />
    </S.AppContainer>
  )
}

export default App
