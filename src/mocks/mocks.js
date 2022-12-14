const mockPenguin = {
  name: "penguin1",
  category: "penguin",
  likes: 10,
  description: "pengu description",
  image: "pingu.jpg",
  imageBackup: "pingu.jpg",
  id: "id",
  idPenguin: "",
};

const mockPenguins = [
  {
    name: "penguin1",
    category: "penguin",
    likes: 10,
    description: "pengu description",
    image: "pingu.jpg",
    imageBackup: "pingu.jpg",
    id: "2",
    owner: "22",
  },
  {
    name: "penguin2",
    category: "penguin2",
    likes: 50,
    description: "pengu2 description",
    image: "pingu2.jpg",
    imageBackup: "pingu.jpg",
    id: "3",
  },
];

const mockUsers = [
  {
    name: "user1",
    username: "user2",
  },
  {
    name: "user2",
    username: "user2",
  },
];

const mockUser = {
  name: "penguin1",
  username: "penguin1",
  password: "penguin1",
};

const mockUserId = {
  id: "22",
};

const newMockUser = {
  name: "t1",
  username: "tete",
  password: "tete",
};

const mockToken =
  "$2a$12$peSDadvE1SzKKiKWL1ayBeIGl6B/9XOtTSxnK20sJYsrIOvDCROu6";

const mockUserCredentials = {
  username: "johndoe",
  password: "johndoe",
};

module.exports = {
  mockPenguin,
  mockPenguins,
  newMockUser,
  mockUsers,
  mockUserId,
  mockUser,
  mockToken,
  mockUserCredentials,
};
