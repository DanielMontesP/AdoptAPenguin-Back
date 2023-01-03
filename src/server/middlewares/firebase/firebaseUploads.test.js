const fs = require("fs");
const path = require("path");
const firebaseUploads = require("./firebaseUploads");

jest.mock("firebase/storage", () => ({
  ref: jest.fn().mockReturnValue("checkRef"),
  uploadBytes: jest.fn().mockResolvedValue({}),
  getStorage: jest.fn().mockReturnValueOnce(true),
  getDownloadURL: jest.fn().mockResolvedValue("url"),
}));

describe("Given a firebaseUploads middleware", () => {
  describe("When the rename method fails", () => {
    test("Then it should call the received next function with the error 'renameError'", async () => {
      const req = { file: { filename: "file" } };

      jest
        .spyOn(path, "join")
        .mockReturnValue(`${path.join("uploads", "images")}`);

      jest
        .spyOn(fs, "rename")
        .mockImplementation((oldpath, newpath, callback) => {
          callback("renameError");
        });

      const next = jest.fn();
      await firebaseUploads(req, null, next);

      expect(next).toHaveBeenCalledWith("renameError");
    });
  });

  describe("When the readFile method files", () => {
    test("Then it should call the received next function with the error 'readFileError'", async () => {
      const req = { file: { filename: "file" } };

      jest
        .spyOn(path, "join")
        .mockReturnValue(`${path.join("uploads", "images")}`);

      jest
        .spyOn(fs, "rename")
        .mockImplementation((oldpath, newpath, callback) => {
          callback();
        });

      jest.spyOn(fs, "readFile").mockImplementation((pathToRead, callback) => {
        callback("readFileError");
      });

      const next = jest.fn();
      await firebaseUploads(req, null, next);

      expect(next).toHaveBeenCalledWith("readFileError");
    });
  });

  describe("When the readFile with file method files", () => {
    test("Then it should call the received next function with the error 'readFileError'", async () => {
      const req = { file: { filename: "file" } };

      jest
        .spyOn(path, "join")
        .mockReturnValue(`${path.join("uploads", "images")}`);

      jest
        .spyOn(fs, "rename")
        .mockImplementation((oldpath, newpath, callback) => {
          callback();
        });

      jest.spyOn(fs, "readFile").mockImplementation((pathToRead, callback) => {
        callback("");
      });

      const next = jest.fn();
      const dispatch = jest.fn();
      const res = jest.fn().mockResolvedValue(true);

      await dispatch(firebaseUploads(req, res, next));

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When the readFile with no file method files", () => {
    test("Then it should call the received next function with the error 'readFileError'", async () => {
      const req = {};

      jest
        .spyOn(path, "join")
        .mockReturnValue(`${path.join("uploads", "images")}`);

      jest
        .spyOn(fs, "rename")
        .mockImplementation((oldpath, newpath, callback) => {
          callback();
        });

      jest.spyOn(fs, "readFile").mockImplementation((pathToRead, callback) => {
        callback("");
      });

      const next = jest.fn();
      const dispatch = jest.fn();
      const res = jest.fn().mockResolvedValue(true);

      await dispatch(firebaseUploads(req, res, next));

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When the readFile with no file method files", () => {
    test("Then it should call the received next function with the error 'readFileError'", async () => {
      const req = {};

      jest
        .spyOn(path, "join")
        .mockReturnValue(`${path.join("uploads", "images")}`);

      jest
        .spyOn(fs, "rename")
        .mockImplementation((oldpath, newpath, callback) => {
          callback();
        });

      jest.spyOn(fs, "readFile").mockImplementation((pathToRead, callback) => {
        callback("");
      });

      const next = jest.fn();
      const dispatch = jest.fn();
      const res = jest.fn().mockResolvedValue(true);

      await dispatch(firebaseUploads(req, res, next));

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When throw error", () => {
    test("Then it should call next function", async () => {
      jest.mock("firebase/app", () => ({
        ...jest.requireActual("firebase/app"),
        initializeApp: () => jest.fn().mockReturnValue(null),
      }));

      const req = {};

      const next = jest.fn();

      await firebaseUploads(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
