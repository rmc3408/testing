import jwt from "jsonwebtoken";
import User from "../models/users";
import { isAuthenticatedUser } from "./auth";

const mockReq = {
  headers: {
    authorization: "Bearer"
  }
}

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis()
}

const mockNext = jest.fn();


const mockUser = {
  _id: "6368dadd983d6c4b181e37c1",
  name: "Test User",
  email: "test@gmail.com",
  password: "hashedPassword",
};

describe('Authorization Tokens', () => {

  it("should throw Missing authorization header error", async () => {
    const mockEmptyReq = { headers: {} };

    await isAuthenticatedUser(mockEmptyReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json.mock.lastCall[0]).toEqual({
      error: "Missing Authorization header with Bearer token",
    });
  });

  it("should throw missing JWT error", async () => {

    await isAuthenticatedUser(mockReq, mockRes, mockNext);

    expect(mockRes.status.mock.lastCall[0]).toEqual(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Authentication Failed",
    });
  });

  it("should authenticate the user", async () => {
    jest.spyOn(jwt, "verify").mockResolvedValueOnce({ id: mockUser._id });

    jest.spyOn(User, "findById").mockResolvedValueOnce(mockUser);

    const mockReq = {
      headers: { authorization: "Bearer token" },
    };
    await isAuthenticatedUser(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledTimes(1);
  })

  it("should NOT authenticate the user", async () => {
    mockNext.mockReset()
    jest.spyOn(User, "findById").mockResolvedValueOnce(mockUser);
    jest.spyOn(jwt, "verify").mockRejectedValueOnce();

    const mockReq = {
      headers: { authorization: "Bearer token" },
    };
    await isAuthenticatedUser(mockReq, mockRes, mockNext);
    

    expect(mockNext).toBeCalledTimes(0);
    expect(mockRes.status.mock.lastCall[0]).toEqual(500);

  })
})