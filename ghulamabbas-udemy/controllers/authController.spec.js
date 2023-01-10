import { registerUser, loginUser } from './authController';
import User from "../models/users.js";
import bcrypt from "bcryptjs";

jest.mock('../utils/helpers.js', () => {
  return {
    getJwtToken: jest.fn().mockImplementation(() => 'jwt_token')
  }
})

const mockRequest = {
  body: {
    email: 'test@gmail.com',
    name: 'Testing',
    password: '1234'
  }
}

const mockUser = {
  _id: 'sjdhonmfo4r9382384',
  email: 'test@gmail.com',
  name: 'Testing',
  password: '1234'
}

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis()
}

const mockUserLogin = {
  body: {
      email: 'test@gmail.com',
  password: '1234'
  }
}

afterEach(() => {
  jest.restoreAllMocks();
})

describe('Auth Controller - Register', () => {

  test('register user', async () => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
    jest.spyOn(User, 'create').mockResolvedValueOnce();

    await registerUser(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(bcrypt.hash).toHaveBeenCalledWith('1234', 10);
    expect(User.create).toBeCalledWith({
      "email": "test@gmail.com",
      "name": "Testing",
      "password": "hashedPassword"
    });
  });

  test('validation errors', async () => {
    const mockWrongRequest = {
      body: {}
    }

    await registerUser(mockWrongRequest, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Please enter all values'});
    
  })

  test('duplicate email throw errors', async () => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
    jest.spyOn(User, 'create').mockRejectedValueOnce({ code: 11000 });


    await registerUser(mockRequest, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Duplicate email'});
    
  })
})


describe('Auth Controller - Login', () => {

  test('Should throw missing data errors', async () => {
    const mockWrongRequest = {
      body: {}
    }

    await loginUser(mockWrongRequest, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Please enter email & Password'});
  })

  test('Login should not find any user', async () => {
    jest.spyOn(User, "findOne").mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(null)
    }))

    await loginUser(mockUserLogin, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid Email or Password'});
  });

  test('Login should Invalid Password', async () => {
    jest.spyOn(User, "findOne").mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(mockUser)
    }));
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

    await loginUser(mockUserLogin, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid Email or Password'});
  });

  test('Login should sucessfull', async () => {
    jest.spyOn(User, "findOne").mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(mockUser)
    }));
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

    await loginUser(mockUserLogin, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ token: "jwt_token"});
  });
})