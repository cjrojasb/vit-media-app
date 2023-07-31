import { Button } from "@cjrojasb/personal-ui-package";
import { useUsersThunk } from "../hooks/useUsersThunk";
import { removeUser } from "../store";
import { User } from "../store/slices/usersSlice";
import { GoTrash } from "react-icons/go";
import ExpandablePanel from "./shared/ExpandablePanel";
import AlbumList from "./AlbumsList";

interface UsersListItemProps {
  user: User;
}

function UsersListItem({ user }: UsersListItemProps) {
  const { name, id } = user;
  const [doRemoveUser, isLoading, error] = useUsersThunk(removeUser);

  const handleRemove = () => doRemoveUser(id);

  const header = (
    <>
      <Button variation="secondary" onClick={handleRemove} className="mr-3">
        <GoTrash />
      </Button>
      {error && <div>Error deleting user.</div>}
      {name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
