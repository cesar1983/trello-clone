import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer
} from 'react'
import { nanoid } from 'nanoid'

import { findItemIndexById } from './utils/findItemIndexById'

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
  ]
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
    default: {
      return state
    }
  }
}
