import React, { useState } from 'react'
import useFocus from '../../utils/useFocus'

import * as S from './styles'

interface NewItemFormProps {
  handleAddButtonClick(text: string): void
}

const NewItemForm = ({ handleAddButtonClick }: NewItemFormProps) => {
  const [text, setText] = useState('')
  const inputRef = useFocus()

  return (
    <S.NewItemFormContainer>
      <S.NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <S.NewItemButton onClick={() => handleAddButtonClick(text)}>
        Create
      </S.NewItemButton>
    </S.NewItemFormContainer>
  )
}

export default NewItemForm
