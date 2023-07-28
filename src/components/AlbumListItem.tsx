import { Button } from "@cjrojasb/personal-ui-package";
import { useRemoveAlbumMutation } from "../store";
import { GoTrash } from "react-icons/go";
import ExpandablePanel from "./shared/ExpandablePanel";
import { AlbumListItemProps } from "../domain/Album";

function AlbumListItem({ album }: AlbumListItemProps) {
  const { title, id: albumId } = album;
  const [removeAlbum, { error: removeError, isLoading: isRemoveLoading }] =
    useRemoveAlbumMutation();

  const handleRemove = () => {
    removeAlbum(album);
  };

  const header = (
    <>
      <Button
        variation="warning"
        onClick={handleRemove}
        className="mr-3"
        disabled={isRemoveLoading}
      >
        <GoTrash />
      </Button>
      {removeError && <div>Error deleting album.</div>}
      {title}
    </>
  );

  return (
    <ExpandablePanel key={albumId} header={header}>
      List of Photos in the album
    </ExpandablePanel>
  );
}

export default AlbumListItem;
