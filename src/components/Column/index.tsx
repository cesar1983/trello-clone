import React from "react";
import AddNewItem from "../AddNewItem";

import * as S from "./styles";

type ColumnProps = {
  //  text: string | undefined;
  title?: string;
  children: React.ReactNode;
};

export const Column = ({ title, children }: ColumnProps) => {
  return (
    <S.ColumnContainer>
      <S.ColumnTitle>{title}</S.ColumnTitle>
      {children}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={console.log}
        dark
      />
    </S.ColumnContainer>
  );
};
