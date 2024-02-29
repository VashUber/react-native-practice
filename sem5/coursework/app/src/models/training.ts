export type StageTypeT = 'breathing' | 'breath-holding' | 'air-holding' | 'chill'
export interface StageI {
  type: StageTypeT
  title: string
  time: number
}
