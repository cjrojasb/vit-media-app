import { Button } from "@cjrojasb/personal-ui-package";
import { FaSpinner } from "react-icons/fa6";
import {
  useAddAlbumMutation,
  useFetchAlbumsQuery,
  useRemoveAlbumMutation,
} from "../../store";
import { User } from "../../store/slices/usersSlice";
import ExpandablePanel from "./ExpandablePanel";
import Skeleton from "./Skeleton";
import { GoTrash } from "react-icons/go";

interface AlbumListProps {
  user: User;
}

function AlbumList({ user }: AlbumListProps) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user.id.toString());
  const [addAlbum, { isLoading: isAddLoading }] = useAddAlbumMutation();
  const [removeAlbum, { error: removeError, isLoading: isRemoveLoading }] =
    useRemoveAlbumMutation();
  let content: JSX.Element = <></>;

  const handleAddAlbum = (userId: string) => {
    addAlbum(userId);
  };

  const handleRemove = (albumId: string) => {
    removeAlbum(albumId);
  };

  const getHeader = (album: any) => (
    <>
      <Button
        variation="warning"
        onClick={() => handleRemove(album.id)}
        className="mr-3"
      >
        <GoTrash />
      </Button>
      {removeError && <div>Error deleting album.</div>}
      {album.title}
    </>
  );

  if (isLoading) {
    content = <Skeleton className="p-5" times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content =
      data.length > 0 ? (
        data.map((album) => (
          <ExpandablePanel key={album.id} header={getHeader(album)}>
            List of Photos in the album
          </ExpandablePanel>
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
          onClick={() => handleAddAlbum(user.id.toString())}
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
