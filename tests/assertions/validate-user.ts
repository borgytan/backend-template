export default (user: any) => {
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('firstName');
    expect(user).toHaveProperty('lastName');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');
};
