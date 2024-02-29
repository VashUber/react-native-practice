export const inhaleTime = 750
export const exhalationTime = 750
export const songsMap = {
  calming: {
    title: 'Успокаивающая',
    src: import('~/assets/songs/calming.mp3')
  },
  lofi: {
    title: 'Lofi',
    src: import('~/assets/songs/lofi.mp3')
  },
  nature: {
    title: 'Природа',
    src: import('~/assets/songs/nature.mp3')
  }
}
export const songsType = Object.keys(songsMap) as (keyof typeof songsMap)[]
