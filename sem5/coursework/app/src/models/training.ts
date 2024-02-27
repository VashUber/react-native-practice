export type StageTypeT = 'breathing' | 'breath-holding' | 'air-holding'
export interface StageI {
  type: StageTypeT
  title: string
  time: number
}
