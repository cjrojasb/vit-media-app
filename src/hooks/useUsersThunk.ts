import { SerializedError } from "@reduxjs/toolkit";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

export function useUsersThunk(thunk: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<SerializedError | null>(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    (args?: any) => {
      setIsLoading(true);
      dispatch(thunk(args))
        .unwrap()
        .catch((err: SerializedError) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
}
