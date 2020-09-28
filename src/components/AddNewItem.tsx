import React, { useState } from 'react'
import * as S from '../styles'
import NewItemForm from './NewItemForm'

type AddNewItemProps = {
  onAdd(text: string): void
  toggleButtonText: string
  dark?: boolean
}

const AddNewItem = (props: AddNewItemProps) => {
  const [showForm, setShowForm] = useState(false)
  const { onAdd, toggleButtonText, dark } = props

  if (showForm) {
    return (
      <NewItemForm
        handleAddButtonClick={(text) => {
          onAdd(text)
          setShowForm(false)
        }}
      />
    )
  }

  return (
    <S.AddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </S.AddItemButton>
  )
}

export default AddNewItem
