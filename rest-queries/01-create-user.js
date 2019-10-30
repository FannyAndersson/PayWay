module.exports = ({ expect, response, assert }) => ({
  path: "users",
  method: "post",
  body: {
    name: "Lennon",
    email: "lennon@gmail.se",
    phone: "666",
    password: "11111",
    activated: false,
    role: "user"
  },
  test() {
    // does the server say user created
    expect(response.name).to.equal("Lennon");
    expect(response.phone).to.equal("666");
  }
});
