const jwt = require("jsonwebtoken");
const {
  createMessage,
  getMessages,
  getMessage,
  deleteMessage,
  editMessage,
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
        params: { idPenguin: "" },
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

  describe("When getMessages is called  with idPenguin correct data", () => {
    test("Then it should return messages", async () => {
      const req = {
        body: {
          idMessage: "id",
          content: "content test",
        },
        query: { task: "task" },
        params: { idMessage: "id", idPenguin: "" },
        headers: { authorization: mockUserCredentials },
        subject: "",
        content: "content test",
        data: "data",
        read: false,
        idUser: "idUser",
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnValue(mockMessages[0]),
      };

      Message.find = jest.fn().mockReturnValue(mockMessages);

      await getMessage(req, res, next);

      expect(Message.find).toHaveBeenCalled();
    });
  });

  describe("When getMessage is callled with idMessage undefined", () => {
    test("Then it should return messages", async () => {
      const req = {
        body: {
          idMessage: "undefined",
          idPenguin: mockPenguin.id,
          content: "content test",
        },
        query: { task: "task" },
        params: { idMessage: "undefined" },
        headers: { authorization: mockUserCredentials },
        subject: "",
        content: "content test",
        data: "data",
        read: false,
        idUser: "idUser",
        idPenguin: "idPenguin",
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnValue(mockMessages[0]),
      };

      Message.find = jest.fn().mockReturnValue(mockMessages);

      await getMessage(req, res, next);

      expect(Message.find).not.toHaveBeenCalled();
    });
  });

  describe("When getMessage throw an error", () => {
    test("Then it should return error", async () => {
      const req = {
        body: {
          idPenguin: mockPenguin.id,
          content: "content test",
        },
        query: { task: "task" },
        params: { idMessage: "2" },
        headers: { authorization: mockUserCredentials },
        subject: "",
        content: "content test",
        data: "data",
        read: false,
        idUser: "idUser",
        idPenguin: "idPenguin",
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedError = new Error({ message: "Bad request", code: "404" });

      Message.find = jest.fn().mockRejectedValue(expectedError);

      await getMessage(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When createMessage return error", () => {
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

      Message.create = jest.fn().mockResolvedValue(mockMessages[0]);

      await createMessage(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When deleteMessage is called", () => {
    test("Then it should call it's next method with an error", async () => {
      const req = {
        body: {
          idMessage: "id",
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

      Message.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deleteMessage(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When editMessage is called", () => {
    test("Then it should call Message.findByIdAndUpdate", async () => {
      const req = {
        body: {
          idMessage: "id",
          idPenguin: mockPenguin.id,
          content: "content test",
        },
        query: { task: "task" },
        params: { idMessage: "id" },
        headers: { authorization: mockUserCredentials },
        subject: "",
        content: "content test",
        data: "data",
        read: false,
        idUser: "idUser",
        idPenguin: "idPenguin",
      };

      const res = {
        status: jest.fn().mockReturnValue(201),
        json: jest.fn().mockReturnValue({ mockMessages }),
      };

      Message.findByIdAndUpdate = jest.fn().mockReturnValue(mockMessages[0]);

      await editMessage(req, res, next);

      expect(Message.findByIdAndUpdate).toHaveBeenCalled();
    });
  });
});
