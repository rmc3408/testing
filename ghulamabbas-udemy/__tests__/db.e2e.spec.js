import request from "supertest";
import app from '../app';
import { connectDatabase, closeDatabase } from "../config/db-memory";

beforeAll(async () => await connectDatabase());

afterAll(async () => await closeDatabase());

test('POST - Register User', async () => {
  const res = await request(app).post("/api/v1/register").send({
    name: "Testing User",
    email: "test@gmail.com",
  });

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe("Please enter all values");
})

it("should register the user", async () => {
  const res = await request(app).post("/api/v1/register").send({
    name: "Test User",
    email: "test@gmail.com",
    password: "12345678",
  });

  expect(res.statusCode).toBe(201);
  expect(res.body.token).toBeDefined();
});

it("should see duplicated email error", async () => {
  const res = await request(app).post("/api/v1/register").send({
    name: "Test User",
    email: "test@gmail.com",
    password: "12345678",
  });

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe("Duplicate email");
});


describe("ERROR 404 - Route not found", () => {
  it("should throw route not found error", async () => {
    const res = await request(app).post("/api/v1/sldfjdklf");

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Route not found");
  });
});


describe("(POST) - Login User", () => {
  it("should throw missing field Password error", async () => {
    const res = await request(app).post("/api/v1/login").send({
      email: "test@gmail.com",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Please enter email & Password");
  });

  it("should throw incorrect password error", async () => {
    const res = await request(app).post("/api/v1/login").send({
      email: "test@gmail.com",
      password: "1234567-wrong",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Invalid Email or Password");
  });

  it("should login user", async () => {
    const res = await request(app).post("/api/v1/login").send({
      email: "test@gmail.com",
      password: "12345678",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});