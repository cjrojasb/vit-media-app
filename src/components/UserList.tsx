import { fetchUsers, addUser } from "../store";
import { Button } from "@cjrojasb/personal-ui-package";
import { FaSpinner } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { User } from "../store/slices/usersSlice";
import { useUsersThunk } from "../hooks/useUsersThunk";
import Skeleton from "./shared/Skeleton";
import UsersListItem from "./UsersListItem";
import ExpandablePanel from "./shared/ExpandablePanel";

function UserList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useUsersThunk(fetchUsers);
  const [doAddUser, isCreatingUser] = useUsersThunk(addUser);
  const { data } = useSelector(({ users }) => users);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleAddUser = () => doAddUser();

  let content: JSX.Element = <div></div>;

  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <h1>Error fetching data...</h1>;
  } else {
    content = data.map((user: User) => (
      <UsersListItem key={user.id} user={user} />
    ));
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3 items-center">
        <h1 className="m-2 text-xl">Users</h1>
        <Button
          variation="info"
          onClick={handleAddUser}
          disabled={isCreatingUser}
        >
          {isCreatingUser ? <FaSpinner /> : "+ Add User"}
        </Button>
      </div>
      {content}
    </div>
  );
}

export default UserList;
