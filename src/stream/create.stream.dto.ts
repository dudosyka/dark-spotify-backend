export interface StreamOnPlay {
  songId: number,
  playlistPosition: number
}

export interface CreateStreamDto {
  userId: number,
  onPlay: StreamOnPlay,
  playList: number[],
  album: number | null,
}
