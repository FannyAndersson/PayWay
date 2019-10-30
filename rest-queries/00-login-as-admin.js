module.exports = ({ expect, response }) => ({
  path: "login",
  method: "post",
  body: {
    name: "Nala",
    password: "1234"
  },
  test() {
    expect(response.name).to.equal("Nala");
    expect(response.role).to.equal("admin");
  }
});
