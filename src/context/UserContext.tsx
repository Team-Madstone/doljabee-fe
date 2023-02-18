import React, { createContext, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { getMyProfile } from '../services/user';
import { TUser } from '../types/user';

type TUserContext = {
  user?: TUser;
  isLoading: boolean;
  removeUser: () => void;
  getUser: () => void;
};

export const UserContext = createContext<TUserContext>({
  user: undefined,
  isLoading: true,
  removeUser: () => {},
  getUser: () => {},
});

type TUserProvider = {
  children: ReactNode;
};

export const UserProvider = ({ children }: TUserProvider) => {
  const { data, isLoading, remove, refetch } = useQuery(
    'myProfile',
    getMyProfile
  );

  const handleRemoveUser = () => {
    remove();
    refetch();
  };

  return (
    <UserContext.Provider
      value={{
        user: data?.data,
        isLoading,
        removeUser: handleRemoveUser,
        getUser: refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
