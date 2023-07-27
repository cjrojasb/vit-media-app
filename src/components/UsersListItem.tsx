import { Button } from "@cjrojasb/personal-ui-package";
import { useUsersThunk } from "../hooks/useUsersThunk";
import { removeUser } from "../store";
import { User } from "../store/slices/usersSlice";
import { GoTrash } from "react-icons/go";

interface UsersListItemProps {
  user: User;
}

function UsersListItem({ user }: UsersListItemProps) {
  const { name, id } = user;
  const [doRemoveUser, isLoading, error] = useUsersThunk(removeUser);

  const handleRemove = () => doRemoveUser(id);

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-start items-center cursor-pointer gap-3">
        <Button variation="secondary" onClick={handleRemove}>
          <GoTrash />
        </Button>
        {error && <div>Error deleting user.</div>}
        {name}
      </div>
    </div>
  );
}

export default UsersListItem;
