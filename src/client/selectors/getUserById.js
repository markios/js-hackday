const getUserById = (id, users) => users.find((user) => user.id === id);
export default getUserById;
