export type BaseUser = {
    firstName: string;
    lastName: string;
    email: string;
    companyId: string;
  };
  
  export type User = BaseUser & {
    _id: string;
    password?: string;
  };
  
  export type NewUser = BaseUser & {
    password: string;
  };
  