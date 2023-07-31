import { PhotoListItemProps } from "../domain/Photo";
import { Button } from "@cjrojasb/personal-ui-package";
import { GoTrash } from "react-icons/go";
import { useRemovePhotoMutation } from "../store";
import ExpandablePanel from "./shared/ExpandablePanel";
import PhotosList from "./PhotosList";

function PhotoListItem({ photo }: PhotoListItemProps) {
  const [removePhoto] = useRemovePhotoMutation();

  const handleRemove = () => removePhoto(photo);

  return (
    <div className="relative cursor-pointer m-2" onClick={handleRemove}>
      <img src={photo.url} alt="random pic" className="h20-w-20" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrash className="text-3xl" />
      </div>
    </div>
  );
}

export default PhotoListItem;
