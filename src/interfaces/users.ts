interface User {
  name: string;
  email: string;
  role: string;
  password: string;
}

interface ITUserModel extends User {
  matchPassword: (enteredPassword: string) => boolean;
  getSignedJwtToken: () => string;
}
