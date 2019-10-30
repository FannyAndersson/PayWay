module.exports = ({ expect, response }) => ({
  path: "users",
  method: "post",
  body: {
    name: "MagnusUggla",
    password: "23456",
    email: "prippsmange@hotmail.se",
    phone: "0701485999"
  },
  test() {
    expect(response.name).to.equal("MagnusUggla");
    expect(response.role).to.equal("user");
  }
});
