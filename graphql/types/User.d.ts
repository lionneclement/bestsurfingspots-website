export interface User {
  id: number;
}

export interface UserVariable {
  firebase_id: string;
}

export interface AddUserVariable {
  firebase_id: string;
  email: string | null;
  display_name: string | null;
  photo_url: string | null;
}

export interface UpdateUserVariable {
  userId: number;
  display_name: string | null;
  photo_url: string | null;
}
