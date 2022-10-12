const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../../../db/models/User/User");
const connectDB = require("../../../../db");
const app = require("../../../index");
const {
  userRegister,
} = require("../../../controllers/userControllers/userControllers");

let mongoServer;

jest.mock("../../../middlewares/auth/auth", () => ({
  auth: (req, res, next) => {
    req.user = { userId: "629d4b2e2145d66cc942e839" };
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

describe("Given a post /users/login endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status code and a token", async () => {
      const response = await request(app).post("/users/login").send({
        username: "penguin1",
        password: "penguin1",
      });

      expect(response.body.token).not.toBeNull();
    });
  });
});

describe("Given a post /users/register endpoint", () => {
  describe("When it receives a new user request", () => {
    test("Then it should respond with a 201 status code and a username", async () => {
      jest.mock("bcrypt", () => ({
        ...jest.requireActual("bcrypt"),
        compare: () =>
          jest.fn().mockResolvedValueOnce(true).mockRejectedValueOnce(false),
      }));
      const token = "030d715845518298a37ac8fa80f966eb7349d5e2";
      jest.mock("jsonwebtoken", () => ({
        ...jest.requireActual("jsonwebtoken"),
        sign: () => token,
      }));
      let req = { body: { username: "p367553", password: "p33" } };
      const next = jest.fn();

      const res = { status: jest.fn().mockReturnValue(200), json: jest.fn() };
      await userRegister(req, res, next);
      expect(next).toHaveBeenCalled();

      jest.mock("express-validation", () => ({
        validate: () => true,
      }));
      req = { body: { username: "p367553", password: "p33" } };

      User.finOne = jest.fn().mockReturnValue(false);

      await userRegister(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives a bad register call", () => {
    test("Then it should respond with a 201 status code and a username", async () => {
      jest.mock("bcrypt", () => ({
        ...jest.requireActual("bcrypt"),
        compare: () =>
          jest.fn().mockResolvedValueOnce(true).mockRejectedValueOnce(false),
      }));
      const token = "030d715845518298a37ac8fa80f966eb7349d5e2";
      jest.mock("jsonwebtoken", () => ({
        ...jest.requireActual("jsonwebtoken"),
        sign: () => token,
      }));
      let req = { body: { username: "p367553", password: "p33" } };
      const next = jest.fn();

      let res = { status: jest.fn().mockReturnValue(200), json: jest.fn() };
      await userRegister(req, res, next);
      expect(next).toHaveBeenCalled();

      jest.mock("express-validation", () => ({
        ...jest.requireActual("express-validation"),
        validate: jest.fn().mockRejectedValue(false),
      }));

      jest.mock("../../../schemas/userSchema", () => ({
        ...jest.requireActual("../../../schemas/userSchema"),
        userLoginSchema: jest.fn().mockRejectedValue(false),
      }));

      req = { body: { badField: "badData" } };

      User.finOne = jest.fn().mockRejectedValue(false);
      res = {
        status: jest.fn().mockRejectedValue(false),
        json: jest.fn().mockRejectedValue(false),
      };
      await userRegister(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives a bad register call", () => {
    test("Then it should respond with a 201 status code and a username", async () => {
      jest.mock("bcrypt", () => ({
        ...jest.requireActual("bcrypt"),
        compare: () =>
          jest.fn().mockResolvedValueOnce(true).mockRejectedValueOnce(false),
      }));

      jest.mock("express-validation", () => ({
        ...jest.requireActual("express-validation"),
        validate: () => false,
      }));

      let req = { body: { username: "p367553", password: "p33" } };
      const next = jest.fn();

      let res = { status: jest.fn().mockReturnValue(200), json: jest.fn() };
      await userRegister(req, res, next);
      expect(next).toHaveBeenCalled();

      jest.mock("../../../schemas/userSchema", () => ({
        ...jest.requireActual("../../../schemas/userSchema"),
        userLoginSchema: jest.fn().mockRejectedValue(true),
      }));

      req = { body: { badField: "badData" } };

      User.finOne = jest.fn().mockRejectedValue(false);
      res = {
        status: jest.fn().mockRejectedValue(false),
        json: jest.fn().mockRejectedValue(false),
      };
      await userRegister(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
