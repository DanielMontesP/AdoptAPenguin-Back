const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  getPenguins,
  deletePenguin,
  getPenguin,
  editPenguin,
  createPenguin,
  getFavsPenguins,
  getLikesPenguins,
  searchPenguin,
} = require("./penguinControllers");

const {
  mockPenguin,
  mockPenguins,
  mockToken,
} = require("../../../mocks/mocks");
const Penguin = require("../../../db/models/Penguin/Penguin");

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

describe("Given getFavsPenguins middleware", () => {
  describe("When it receives a request but has an error on finding", () => {
    test("Then it should call it's next method with an error", async () => {
      const req = {
        params: { idPenguin: "22" },
      };

      Penguin.find = jest.fn().mockResolvedValue(null);
      await getPenguins(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("When it receives a request but has an error on finding", () => {
  test("Then it should call it's next method with an error", async () => {
    const req = {
      params: { idPenguin: "22" },
      headers: { authorization: `Bearer ${mockToken}` },
    };

    Penguin.find = jest.fn().mockResolvedValue(null);
    jwt.verify = { username: "user", id: "444" };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getFavsPenguins(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

describe("Given getPenguins middleware", () => {
  describe("When it receives a request but has an error on finding", () => {
    test("Then it should call it's next method with an error", async () => {
      const req = {
        params: { idPenguin: "22" },
      };

      Penguin.find = jest.fn().mockResolvedValue(null);
      await getPenguins(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request but has an error on finding", () => {
    test("Then it should call it's next method with an error", async () => {
      const req = {
        params: { idPenguin: "22" },
      };

      Penguin.find = jest.fn().mockResolvedValue(true);
      await getPenguins(req, null, next);

      expect(Penguin.find).toHaveBeenCalled();
    });
  });

  describe("When it receives a request but has an error on finding", () => {
    test("Then it should call it's next method with an error", async () => {
      const req = {
        params: { idPenguin: "22" },
      };
      const res = {
        status: 200,
        json: jest.fn(),
      };

      Penguin.find = jest.fn().mockRejectedValue(false);
      await getPenguins(req, res, next);

      expect(Penguin.find).toHaveBeenCalled();
    });
  });

  describe("When it receives a request but has an error on finding", () => {
    test("Then it should call it's next method with an error", async () => {
      const req = {
        params: { user: "mockUser" },
        headers: { authorization: `Bearer ${mockToken}` },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      jwt.verify = { username: "user", id: "444" };
      Penguin.find = jest.fn().mockResolvedValue(true);

      await getLikesPenguins(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a request", () => {
    test("Then it should call penguin.find", async () => {
      const req = {
        params: { user: "mockUser" },
        headers: { authorization: `Bearer ${mockToken}` },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      jwt.verify = jest.fn().mockReturnValue({ username: "user", id: "444" });
      Penguin.find = jest.fn().mockResolvedValue(true);

      await getLikesPenguins(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When getFavsPenguins is called", () => {
    test("Then it should call it's next method with an error", async () => {
      const req = {
        params: { user: "mockUser" },
        headers: { authorization: `Bearer ${mockToken}` },
      };
      jwt.verify = jest.fn().mockReturnValue({ username: "user", id: "444" });
      Penguin.find = jest.fn().mockResolvedValue(true);

      await getFavsPenguins(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given deletePenguin middleware", () => {
  describe("When it receives a request with a correct id and correct user rol", () => {
    test("Then it should call it's response json status with 200 and json with the expected object", async () => {
      const req = {
        params: { idPenguin: 22 },
        user: {
          username: "penguin1",
          password: "penguin1",
          name: "penguin1",
        },
        body: { name: "penguin1" },
      };
      const expectedResponse = {
        msg: "Penguin deleted",
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Penguin.findByIdAndDelete = jest.fn().mockResolvedValue(true);
      await deletePenguin(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
  describe("When it receives a request with a correct id and correct user rol", () => {
    test("Then it should call it's response json status with 200 and json with the expected object", async () => {
      const req = {
        params: { idPenguin: 22 },
        user: {
          username: "penguin1",
          password: "penguin1",
          name: "penguin1",
        },
        body: { name: "penguin1" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Penguin.findByIdAndDelete = jest.fn().mockRejectedValue(false);
      await deletePenguin(req, res, jest.fn());

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given getPenguinById middleware", () => {
  describe("When it's called with a correct establishment id at request", () => {
    test("Then it should call it's response json status with 200 and json with the expected object", async () => {
      const req = {
        body: { name: "penguin1" },
        params: { name: "penguin1", idPenguin: "1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedResponse = mockPenguin;

      Penguin.findById = jest.fn().mockResolvedValue(mockPenguin);
      await getPenguin(req, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it's called with undefined", () => {
    test("Then it should throw error", async () => {
      const req = {
        body: { name: "penguin1" },
        params: { name: "penguin1", idPenguin: "undefined" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      Penguin.findById = jest.fn().mockReturnValue(mockPenguin);
      await getPenguin(req, res, null);

      expect(Penguin.findById).not.toHaveBeenCalled();
    });
  });

  describe("When it's called with a incorrect establishment id at request", () => {
    test("Then it should call it's next function with 'Bad request'", async () => {
      const req = {
        params: { idPenguin: 22 },
        body: { name: "penguin1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedError = new Error("Bad request");

      Penguin.findById = jest.fn().mockRejectedValue(expectedError);
      await getPenguin(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given editPenguin middleware", () => {
  describe("When it receives a request with a correct id and correct user rol", () => {
    test("Then it should call it's response json status with 200 and json with the expected object", async () => {
      const req = {
        params: { idPenguin: "1" },
        body: { name: "penguin1" },
        query: { task: "test" },
        headers: {
          authorization: "Bearer hola",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jwt.verify = jest.fn().mockReturnValue({ id: "22" });

      Penguin.findById = jest.fn().mockResolvedValue(true);
      Penguin.findByIdAndUpdate = jest.fn().mockResolvedValue(true);
      await editPenguin(req, res, null);

      expect(req).toHaveProperty("params", { idPenguin: "1" });
    });
  });

  describe("When editPenbguin receives a request with a bad data", () => {
    test("Then it should not call findByIdAndUpdate", async () => {
      const req = {
        params: { idPenguin: "undefined" },
        body: { name: "penguin1" },
        query: { task: "test" },
        headers: {
          authorization: "Bearer hola",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      jwt.verify = jest.fn().mockReturnValue({ id: "22" });

      Penguin.findById = jest.fn().mockResolvedValue(true);
      Penguin.findByIdAndUpdate = jest.fn().mockRejectedValue(false);
      await editPenguin(req, res, null);

      expect(Penguin.findByIdAndUpdate).not.toHaveBeenCalled();
    });
  });

  describe("When it receives a request with a correct id and correct user rol", () => {
    test("Then it should call it's response json status with 200 and json with the expected object", async () => {
      const req = {
        params: { idPenguin: "1" },
        body: { name: "penguin1" },
        query: { task: "test" },
        headers: {
          authorization: "Bearer hola",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jwt.verify = jest.fn().mockReturnValue({ id: "22" });

      Penguin.findById = jest.fn().mockResolvedValue(true);
      Penguin.findByIdAndUpdate = jest.fn().mockRejectedValue(false);
      await editPenguin(req, res, null);

      expect(Penguin.findByIdAndUpdate).toHaveBeenCalled();
    });
  });

  describe("When createPenguin it's invoked", () => {
    test("Then it should receive the next expected function", async () => {
      Penguin.findOne = jest.fn().mockResolvedValue(true);
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const req = { body: { name: "p2", category: "p1" } };
      const res = {
        status: 500,
        json: jest.fn(),
      };

      Penguin.create = jest.fn().mockResolvedValue(true);
      await createPenguin(req, res, next);

      expect(res.status).toBe(500);
    });
  });

  describe("When createPenguin it's invoked", () => {
    test("Then it should receive the next expected function", async () => {
      Penguin.findOne = jest.fn().mockResolvedValue(false);
      Penguin.create = jest.fn().mockResolvedValue(true);

      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const req = { body: { name: "p2", category: "p1" } };
      const res = {
        status: 201,
        json: jest.fn(),
      };

      await createPenguin(req, res, null);

      expect(res.status).toBe(201);
    });
  });

  describe("When newPenguin it's invoked", () => {
    test("Then it should receive the next expected function", async () => {
      Penguin.findOne = jest.fn().mockResolvedValue(true);
      Penguin.create = jest.fn().mockResolvedValue(true);

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const req = {
        body: {
          name: "p2",
          category: "p1",
          likers: [],
          favs: [],
          likes: 1,
          description: "pengu",
          image: "image",
          imageBackup: "imageBackup",
        },
        img: "",
        imgBackup: "",
      };

      const res = {
        status: 500,
        json: jest.fn(),
      };

      await createPenguin(req, res, next);

      expect(res.status).toBe(500);
    });
  });
});

describe("Given searchPenguins middleware", () => {
  describe("When it receives a bad request", () => {
    test("Then it should call it's next method with an error", async () => {
      const req = {
        params: { stringToSearch: "22" },
      };

      Penguin.find = jest.fn().mockReturnValue({ mockPenguins });
      await searchPenguin(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
