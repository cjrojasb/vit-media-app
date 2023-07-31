import { Album } from "./Album";

export interface Photo {
  albumId: string;
  url: string;
  id: number;
}

export interface PhotoListProps {
  album: Album;
}


export interface PhotoListItemProps {
  photo: Photo;
}
