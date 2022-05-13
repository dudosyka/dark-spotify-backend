export enum StreamInsertPosition {
  toEnd,
  afterPlay,
  newQueue
}

export enum StreamInsertType {
  Song,
  Album,
  Playlist,
  Artist
}

export interface UpdateStreamDto {
  insertPosition: StreamInsertPosition,
  insertType: StreamInsertType,
  value: number[],
}
