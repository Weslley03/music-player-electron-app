export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type UsersResponse = {
  users: User[];
};
