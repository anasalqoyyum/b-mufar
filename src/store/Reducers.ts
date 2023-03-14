import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { AppState, MusicStatusType } from './types'

export const SyncReducers: {
  setMusicStatus: CaseReducer<AppState, PayloadAction<MusicStatusType>>
} = {
  setMusicStatus(state, data) {
    state.musicStatus = data.payload
  }
}
