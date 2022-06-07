interface User {
    _id: string;
    email: string;
    password: string;
    role: [
      {role: string, groupId: string}
    ];
  }
  
  export default User;
  