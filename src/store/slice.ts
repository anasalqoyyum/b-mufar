/*
 * Copyright (c) 2023 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { createSlice } from '@reduxjs/toolkit'
import { AsyncReducers } from './AsyncReducers'
import { SyncReducers } from './Reducers'
import { AppState, MemoryGame } from './types'

export const initialMemoryGame: MemoryGame = {
  chosenCard: [],
  correctCard: [],
  point: 0
}

const initialState: AppState = {
  apiList: [],
  isFetchingApiList: false,
  fetchApiListError: null,

  musicStatus: 'idle',

  memoryGameState: initialMemoryGame
}

export const slice = createSlice({
  name: 'reducer',
  initialState,
  reducers: SyncReducers,
  extraReducers: AsyncReducers
})

export const { setMusicStatus, setMemoryGameState } = slice.actions
