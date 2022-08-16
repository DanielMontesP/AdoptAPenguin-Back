const { notFoundError, generalError } = require("./errors");

let req = jest.fn();

describe("Given the notFoundError function", () => {
  describe("When its invoked", () => {
    test("Then it should call the next function with an error", () => {
      const nextFunction = jest.fn();
      const error = new Error();

      notFoundError(req, null, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given the generalError function", () => {
  describe("When its invoked with an empty error", () => {
    test("Then it should call the response's status method with a 500", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedError = 500;
      const error = {};

      generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When its invoked with an empty error", () => {
    test("Then it should call the response's status method with a 500", () => {
      const res = {
        status: jest.fn().mockReturnThis(500),
        json: jest.fn(),
      };
      req = {
        status: jest.fn().mockReturnThis(500),
        json: jest.fn(),
      };
      jest.mock("express-validation");

      const expectedError = 500;
      const error = " { true: true }";

      generalError(error, req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedError);
    });
  });
});
