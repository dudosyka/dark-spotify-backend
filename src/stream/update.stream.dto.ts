export enum UpdateStreamType {
  PlayListEnd,
  PlaylistAfterPlay,
  SongEnd,
  SongAfterPlay
}

export interface UpdateStreamDto {
  type: UpdateStreamType,
  value: number[],
}
