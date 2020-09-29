import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer
} from 'react'
import { nanoid } from 'nanoid'

import { findItemIndexById } from './utils/findItemIndexById'
import { moveItem } from './utils/moveItem'
import { DragItem } from './DragItem'

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }]
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c1', text: 'Learn Typescript' }]
    },
    {
      id: '2',
      text: 'Information needed',
      tasks: [{ id: 'c2', text: 'More information needed...' }]
    },
    {
      id: '3',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Begin to use static typing' }]
    }
  ],
  draggedItem: undefined
}

interface Task {
  id: string
  text: string
}

interface List {
  id: string
  text: string
  tasks: Task[]
}

export interface AppState {
  lists: List[]
  draggedItem: DragItem | undefined
}

interface AppStateContextProps {
  state: AppState
  dispatch: React.Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)

export const AppStateProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData)

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}

/*
//opcao para a forma acima.

type Props = {
  children: React.ReactNode
}
export const AppStateProvider = ({
  children
}: Props) => {
  return (
    <AppStateContext.Provider value={{ state: appData }}>
      {children}
    </AppStateContext.Provider>
  )
}
*/

export const useAppState = () => {
  return useContext(AppStateContext)
}

/* REDUCER LOGIC */

type Action =
  | {
      type: 'ADD_LIST'
      payload: string
    }
  | {
      type: 'ADD_TASK'
      payload: { text: string; listId: string }
    }
  | {
      type: 'MOVE_LIST'
      payload: {
        dragIndex: number
        hoverIndex: number
      }
    }
  | {
      type: 'SET_DRAGGED_ITEM'
      payload: DragItem | undefined
    }

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_LIST': {
      // Reducer logic here...
      return {
        ...state,
        lists: [
          ...state.lists,
          {
            id: nanoid(),
            text: action.payload,
            tasks: []
          }
        ]
      }
    }
    case 'ADD_TASK': {
      // Reducer logic here...

      const targetLaneIndex = findItemIndexById(
        state.lists,
        action.payload.listId
      )
      state.lists[targetLaneIndex].tasks.push({
        id: nanoid(),
        text: action.payload.text
      })
      return {
        ...state
      }
    }
    case 'MOVE_LIST': {
      const { dragIndex, hoverIndex } = action.payload
      state.lists = moveItem(state.lists, dragIndex, hoverIndex)
      return { ...state }
    }

    case 'SET_DRAGGED_ITEM': {
      return { ...state, draggedItem: action.payload }
    }

    default: {
      return state
    }
  }
}
