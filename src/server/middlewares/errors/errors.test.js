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
    test("Then it should call the response's status method with a 400", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      req = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.mock("express-validation");

      const expectedError = 404;
      const error = {
        status: 400,
        statusCode: 400,
        json: jest.fn(),
        details: "details",
        message: "message",
      };

      generalError(error, req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When its invoked with an empty error", () => {
    test("Then it should call the response's status method with a 404", () => {
      const res = {
        status: jest.fn().mockReturnThis(404),
        json: jest.fn(),
      };
      req = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        body: jest.fn(),
      };
      jest.mock("express-validation");

      const expectedError = 404;
      const error = {
        status: 404,
        statusCode: 404,
        json: jest.fn(),
        details: "details",
        message: "message",
      };

      generalError(error, req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedError);
    });
  });
});
