module.exports = ({ expect, response }) => ({
  path: "login",
  method: "post",
  body: {
    name: "Aleksandra",
    password: "23456"
  },
  test() {
    expect(response.name).to.equal("Aleksandra");
  }
});
