export type ActionRejectValue = Error

export type MusicStatusType = 'idle' | 'playing' | 'paused'

export interface AppState {
  apiList: any
  isFetchingApiList: boolean
  fetchApiListError: unknown

  musicStatus: MusicStatusType
}
