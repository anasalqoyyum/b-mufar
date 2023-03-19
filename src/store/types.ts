export type ActionRejectValue = Error

export type MusicStatusType = 'idle' | 'playing' | 'paused'

export type MemoryGame = {
  chosenCard: string[]
  correctCard: string[]
  point: number
}

export interface AppState {
  apiList: any
  isFetchingApiList: boolean
  fetchApiListError: unknown

  musicStatus: MusicStatusType

  memoryGameState: MemoryGame
}
