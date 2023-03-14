import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionRejectValue } from './types'

export const AsyncActions = {
  testFetch: wrapAsyncThunk<any, any>('testFetch', async () => {
    return console.log('test')
  })
}

// Helper functions.
function wrapAsyncThunk<TReturnType, TParamType>(actionName: string, fn: (params: TParamType) => Promise<TReturnType>) {
  return createAsyncThunk<TReturnType, TParamType, { rejectValue: ActionRejectValue }>(actionName, async (params: TParamType, thunkAPI) => {
    try {
      return await fn(params)
    } catch (err) {
      return thunkAPI.rejectWithValue(err as ActionRejectValue)
    }
  })
}
