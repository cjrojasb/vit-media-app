import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, fetchUsers } from "../store";
import { useEffect } from "react";
import { User } from "../store/slices/usersSlice";

function UserList() {
  const { data, isLoading, error } = useSelector(({ users }) => users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error fetching data...</h1>;
  }

  return (
    <div>
      User List
      {data.map(({ id, name }: User) => (
        <h1 key={id}>{name}</h1>
      ))}
    </div>
  );
}

export default UserList;
