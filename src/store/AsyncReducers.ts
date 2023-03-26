import { ActionReducerMapBuilder } from '@reduxjs/toolkit/src/mapBuilders'
import { NoInfer } from '@reduxjs/toolkit/src/tsHelpers'
import { AsyncActions } from './Actions'
import { AppState } from './types'

export const AsyncReducers = (builder: ActionReducerMapBuilder<NoInfer<AppState>>) => {
  builder
    .addCase(AsyncActions.testFetch.pending, (state, _action) => {
      state.isFetchingApiList = true
    })

    .addCase(AsyncActions.testFetch.rejected, (state, action) => {
      state.isFetchingApiList = false
      state.fetchApiListError = action.error
    })

    .addCase(AsyncActions.testFetch.fulfilled, (state, action) => {
      state.isFetchingApiList = false
    })
}
