import firebase from 'firebase/app';
import React, {Dispatch, SetStateAction} from 'react';

export const UserContext = React.createContext<{
  user: firebase.User | null;
  setUser: Dispatch<SetStateAction<firebase.User | null>>;
}>({user: null, setUser: () => {}});
