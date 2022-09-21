const { createMessage, getMessages } = require("./messageControllers");
const { mockMessages } = require("../../../mocks/mockMessages");
const Message = require("../../../db/models/Message/Message");
const { mockPenguin, mockUserId } = require("../../../mocks/mocks");

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
    test("Then it should call it's next method with an error", async () => {
      const req = {
        body: { idUser: "22", idPenguin: "62a80601b912ac301b85eeac" },
      };

      Message.find = jest.fn().mockResolvedValue({ idUser: "id" });
      await getMessages(req, null, next);

      expect(next).toHaveBeenCalled();
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
