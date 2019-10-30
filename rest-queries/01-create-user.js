module.exports = ({ expect, response, assert }) => ({
  path: "users",
  method: "post",
  body: {
    name: "Nala",
    email: "nala@admin.se",
    phone: "072666666",
    password: "1234",
    activated: false,
    role: "admin"
  },
  test() {
    // does the server say user created
    expect(response.name).to.equal("Nala");
    expect(response.phone).to.equal("072666666");
  }
});
