export type SignupPayload = {
  email: string;
  password: string;
  displayName?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupCometPayload = {
  uid: string;
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
};
