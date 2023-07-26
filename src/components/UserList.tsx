import { AppDispatch, fetchUsers, addUser } from "../store";
import { Button } from "@cjrojasb/personal-ui-package";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { User } from "../store/slices/usersSlice";
import Skeleton from "./shared/Skeleton";

function UserList() {
  const { data, isLoading, error } = useSelector(({ users }) => users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleAddUser = () => dispatch(addUser());

  if (isLoading) {
    return <Skeleton times={6} className="h-10 w-full" />;
  }

  if (error) {
    return <h1>Error fetching data...</h1>;
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button variation="info" onClick={handleAddUser} disabled={isLoading}>
          + Add User
        </Button>
      </div>
      {data.map(({ id, name }: User) => (
        <div key={id} className="mb-2 border rounded">
          <div className="flex p-2 justify-between items-center cursor-pointer">
            {name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
