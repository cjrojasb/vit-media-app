export interface Album {
  userId: string;
  title: string;
  id: number;
}

export interface AlbumListItemProps {
  album: Album;
}
