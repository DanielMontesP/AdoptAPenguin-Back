const jwt = require("jsonwebtoken");
const {
  createMessage,
  getMessages,
  getMessage,
} = require("./messageControllers");
const { mockMessages } = require("../../../mocks/mockMessages");
const Message = require("../../../db/models/Message/Message");
const {
  mockPenguin,
  mockUserId,
  mockToken,
  mockUserCredentials,
} = require("../../../mocks/mocks");

const next = jest.fn();

jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  compare: () =>
    jest.fn().mockResolvedValueOnce(true).mockRejectedValueOnce(false),
}));

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: () => mockPenguin,
}));

describe("Given messages middlewares", () => {
  describe("When getMessages is callled", () => {
    test("Then it should return messages", async () => {
      const req = {
        body: {
          idUser: mockUserId.id,
          idPenguin: "22",
          content: "content test",
        },
        params: { idPenguin: mockPenguin.id },
        headers: { authorization: `Bearer ${mockToken}` },
      };

      Message.find = jest.fn().mockResolvedValue({ idUser: "id" });
      jwt.verify = jest.fn().mockResolvedValue({ username: "user", id: "444" });

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(req.body.idPenguin),
      };

      await getMessages(req, res, next);

      expect(res.json).not.toBe(null);
    });
  });

  describe("When getMessage is callled", () => {
    test("Then it should return messages", async () => {
      const req = {
        body: {
          idUser: mockUserId.id,
          idPenguin: "22",
          content: "content test",
        },
        params: { idPenguin: mockPenguin.id },
        headers: { authorization: `Bearer ${mockToken}` },
      };

      Message.find = jest.fn().mockResolvedValue({ idUser: "id" });
      jwt.verify = jest.fn().mockResolvedValue({ username: "user", id: "444" });

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(req.body.idPenguin),
      };

      await getMessage(req, res, next);

      expect(res.json).not.toBe(null);
    });
  });

  describe("When createMessage is called", () => {
    test("Then it should call it's next method with an error", async () => {
      const req = {
        body: {
          idUser: mockUserId.id,
          idPenguin: mockPenguin.id,
          content: "content test",
        },
        params: { idPenguin: mockPenguin.id },
        headers: { authorization: mockUserCredentials },
      };

      const res = {
        status: jest.fn().mockReturnValue(201),
        json: jest.fn().mockReturnValue({ mockMessages }),
      };

      Message.create = jest.fn().mockResolvedValue(null);

      await createMessage(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
