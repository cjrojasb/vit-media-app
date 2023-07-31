import { Button } from "@cjrojasb/personal-ui-package";
import { FaSpinner } from "react-icons/fa6";
import { Photo, PhotoListProps } from "../domain/Photo";
import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Skeleton from "./shared/Skeleton";
import PhotosListItem from "./PhotosListItem";

function PhotosList({ album }: PhotoListProps) {
  const { data: photos = [], isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, { isLoading: isAddLoading, error: isAddError }] =
    useAddPhotoMutation();
  let content: JSX.Element = <></>;

  const handleAddPhoto = () => addPhoto(album);

  if (isFetching) {
    content = <Skeleton className="p-5" times={3} />;
  } else if (error) {
    content = <div>Error loading photos.</div>;
  } else {
    content =
      photos.length > 0 ? (
        photos.map((photo: Photo) => (
          <PhotosListItem key={photo.id} photo={photo} />
        ))
      ) : (
        <h1>No hay fotos disponibles</h1>
      );
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3 items-center">
        <h3 className="m-2 text-lg font-bold">Photos in {album.title}</h3>
        <Button
          variation="info"
          onClick={handleAddPhoto}
          disabled={isAddLoading}
        >
          {isAddLoading ? <FaSpinner /> : "+ Add Photo"}
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
}

export default PhotosList;
