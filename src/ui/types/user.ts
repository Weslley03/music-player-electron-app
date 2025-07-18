export type User = {
  id: number;
  name: string;
  email: string;
  imglogo: string;
};

export type UsersResponse = {
  users: User[];
};
