export type createUserBody = {
  id?:string
  email: string;
  password: string;
  role?: string;
};

export type updateUser = {
  idUser: string;
  email: string;
  password: string;
};

export interface user {
  id_user: string;
  email_user: string;
  password_user: string;
  point?: number;
  role?: string;
  profileIdProfile?: number;
}

