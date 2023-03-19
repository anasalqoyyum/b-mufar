import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { AppState, MemoryGame, MusicStatusType } from './types'

export const SyncReducers: {
  setMusicStatus: CaseReducer<AppState, PayloadAction<MusicStatusType>>
  setMemoryGameState: CaseReducer<AppState, PayloadAction<MemoryGame>>
} = {
  setMusicStatus(state, data) {
    state.musicStatus = data.payload
  },

  setMemoryGameState(state, data) {
    state.memoryGameState = data.payload
  }
}
