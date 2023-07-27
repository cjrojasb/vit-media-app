import { User } from "../../store/slices/usersSlice";

interface AlbumListProps {
  user: User;
}

function AlbumList({ user }: AlbumListProps) {
  return <h3>Albums for {user.name}</h3>;
}

export default AlbumList;
