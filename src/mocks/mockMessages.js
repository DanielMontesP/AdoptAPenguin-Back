const { mockPenguin, mockUser } = require("./mocks");

const mockMessages = [
  {
    idUser: mockUser.id,
    idPenguin: mockPenguin.id,
    content: "content1",
  },
  {
    idUser: mockUser.id,
    idPenguin: mockPenguin.id,
    content: "content2",
  },
];

module.exports = {
  mockMessages,
};
