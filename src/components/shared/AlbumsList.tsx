import { Button } from "@cjrojasb/personal-ui-package";
import { FaSpinner } from "react-icons/fa6";
import { useAddAlbumMutation, useFetchAlbumsQuery } from "../../store";
import { User } from "../../store/slices/usersSlice";
import Skeleton from "./Skeleton";
import { Album } from "../../domain/Album";
import AlbumListItem from "../AlbumListItem";

interface AlbumListProps {
  user: User;
}

function AlbumList({ user }: AlbumListProps) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, { isLoading: isAddLoading }] = useAddAlbumMutation();
  let content: JSX.Element = <></>;

  const handleAddAlbum = () => {
    addAlbum(user);
  };
  if (isFetching) {
    content = <Skeleton className="p-5" times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content =
      data.length > 0 ? (
        data.map((album: Album) => (
          <AlbumListItem key={album.id} album={album} />
        ))
      ) : (
        <h1>No hay resultados</h1>
      );
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3 items-center">
        <h3 className="m-2 text-lg font-bold">Albums for {user.name}</h3>
        <Button
          variation="info"
          onClick={handleAddAlbum}
          disabled={isAddLoading}
        >
          {isAddLoading ? <FaSpinner /> : "+ Add Album"}
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumList;
