const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Message = require("../../../db/models/Message/Message");
const User = require("../../../db/models/User/User");
const { mockToken } = require("../../../mocks/mocks");
const {
  userLogin,
  userRegister,
  userGet,
  userEdit,
  userGetMessages,
} = require("./userControllers");

const token = "030d715845518298a37ac8fa80f966eb7349d5e2";
jest.mock("../../../db/models/User/User", () => ({
  findOne: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(true),
}));

jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  compare: () =>
    jest.fn().mockResolvedValueOnce(true).mockRejectedValueOnce(false),
}));

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: () => token,
}));

const next = jest.fn();

describe("Given the loginUser controller", () => {
  describe("When it's invoked with a request object with the correct username and password", () => {
    test("Then it should call the response method with status 200, and a body containing a token will be received", async () => {
      const expectedStatus = 200;
      const req = {
        body: { username: "p33", password: "p33" },
        headers: { authorization: `Bearer ${mockToken}` },
      };

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await userLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it's invoked with a request object with the incorrect username and password", () => {
    test("Then it should call the response method with status 200, and a body containing a token will be received", async () => {
      const req = { body: { username: "", password: "" } };

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await userLogin(req, res, next);

      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe("When it's invoked with a request object and the username or password are wrong", () => {
    test("Then it should call the next method function", async () => {
      const req = { body: { username: "p33", password: "p33" } };
      User.findOne = jest.fn().mockResolvedValue(false);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked with a request object containing an incorrect password", () => {
    test("Then it should receive the next expected function", async () => {
      const req = { body: { username: "p33", password: "p33" } };
      User.findOne = jest.fn().mockResolvedValue(true);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it's invoked with a request object containing an incorrect password", () => {
    test("Then it should receive the next expected function", async () => {
      const req = { body: { username: "p33", password: "p33" } };
      User.findOne = jest.fn().mockRejectedValue(false);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When userEdit it's invoked", () => {
    test("Then it should receive the next expected function", async () => {
      const req = {
        body: {
          name: "test",
          category: "test",
          likes: "",
          likers: "",
          favs: "",
          image: "test",
          imageBackup: "",
          description: "",
        },
        query: { task: "task" },
        params: { idUser: "id" },
      };
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(true);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userEdit(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When userEdit it's invoked", () => {
    test("Then it should receive the next expected function", async () => {
      const req = {
        body: {
          name: "test",
          category: "test",
          likes: "",
          likers: "",
          favs: "",
          image: "test",
          imageBackup: "",
          description: "",
        },
        query: { task: "task" },
        params: { idUser: "id" },
      };
      User.findByIdAndUpdate = jest.fn().mockRejectedValue(true);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userEdit(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When userRegister it's invoked", () => {
    test("Then it should receive the next expected function", async () => {
      User.findOne = jest.fn().mockResolvedValue(true);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        body: { name: "penguin1xxx", username: "p2", password: "p2" },
      };

      User.create = jest.fn().mockReturnThis("ok");
      await userRegister(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When userRegister it's invoked badly", () => {
    test("Then it should receive the next expected function", async () => {
      User.findOne = jest.fn().mockResolvedValue(false);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {
        body: { name: "penguin1xxx", username: "p2", password: null },
      };

      User.create = jest.fn().mockReturnThis("ok");
      await userRegister(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When userGet it's invoked", () => {
    test("Then it should receive the next expected function", async () => {
      User.findById = jest.fn().mockResolvedValue(true);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const res = {
        status: jest.fn().mockReturnThis(200),
        json: jest.fn(),
      };

      const req = {
        params: {
          UserId: "",
        },
      };

      await userGet(req, res, next);

      expect(User.findById).toHaveBeenCalled();
    });
  });

  describe("When userGet it's invoked", () => {
    test("Then it should receive the next expected function", async () => {
      User.findById = jest.fn().mockRejectedValue(false);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const res = {
        status: jest.fn().mockReturnThis(200),
        json: jest.fn(),
      };

      const req = {
        params: {
          UserId: "",
        },
      };

      await userGet(req, res, next);

      expect(User.findById).toHaveBeenCalled();
    });
  });

  describe("When userGetMessages it's invoked", () => {
    test("Then it should receive the next expected function", async () => {
      const res = {
        status: jest.fn().mockReturnThis(200),
        json: jest.fn(),
      };

      const req = {
        params: {
          UserId: "",
        },
        headers: { authorization: `Bearer ${mockToken}` },
      };

      Message.find = jest.fn().mockResolvedValue(true);
      jwt.verify = jest.fn().mockReturnValue({ username: "user", id: "444" });

      await userGetMessages(req, res, next);

      expect(Message.find).toHaveBeenCalled();
    });
  });

  describe("When userGetMessages it's invoked with error", () => {
    test("Then it should receive the next expected function", async () => {
      const res = {
        status: jest.fn().mockReturnThis(200),
        json: jest.fn(),
      };

      const req = {
        params: {
          UserId: "",
        },
        headers: { authorization: `Bearer ${mockToken}` },
      };

      Message.find = jest.fn().mockRejectedValue(true);
      jwt.verify = jest.fn().mockReturnValue({ username: "user", id: "444" });

      await userGetMessages(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
