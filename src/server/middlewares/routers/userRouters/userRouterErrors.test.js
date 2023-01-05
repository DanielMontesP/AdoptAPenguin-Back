const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const connectDB = require("../../../../db");
const User = require("../../../../db/models/User/User");
const {
  userLogin,
} = require("../../../controllers/userControllers/userControllers");

let mongoServer;

jest.mock("../../../middlewares/auth/auth", () => ({
  auth: (req, res, next) => {
    req.user = { userId: "629d4b2e2145d66cc942e839" };
    req.body = { username: "name", password: "password" };
    next();
  },
}));

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  const encryptedPassword = await bcrypt.hash("password", 10);
  await User.create({
    _id: "629d4b2e2145d66cc942e839",
    username: "penguin1",
    password: encryptedPassword,
    name: "p1",
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a post to userRouters login", () => {
  describe("When it receives a request with error", () => {
    test("Then it should no login", async () => {
      jest.mock("express-validation", () => ({
        ...jest.requireActual("express-validation"),
        validate: jest.fn().mockRejectedValue(new Error("Error")),
      }));

      const req = { body: { username: "p367553", password: "p33" } };
      const next = jest.fn();

      const response = await userLogin(req, null, next);

      expect(response).toBeUndefined();
    });
  });
});
