export interface StreamOnPlay {
  songId: number,
  playlistPosition: number
}

export interface CreateStreamDto {
  userId: number,
  onPlay: StreamOnPlay,
  playlist: number[],
  album: number,
}
