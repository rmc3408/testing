import User from "./users";

afterEach(() => {
  jest.resetAllMocks();
});

describe('User Model', () => {
  it("should create a new user", () => {
    const user = new User({
      name: "Ghulam",
      email: "test@gmail.com",
      password: "12345678",
    });

    // console.log(user)
    expect(user).toHaveProperty("_id");
    expect(user).toBeInstanceOf(User);
  });

  it("should throw validation error for REQUIRED fields", async () => {
    const emptyUser = new User();

    try {
      await emptyUser.validate();
    } catch (err) {
      //console.log(err.errors)
      expect(err.errors['name'].message).toBe('Please enter your name');
      expect(err.errors.email).toBeDefined();
      expect(err.errors.password).toBeDefined();
    }
  });

  it("should throw password length error", async () => {
    const user = new User({
      name: "Ghulam",
      email: "test@gmail.com",
      password: "123456",
    });

    jest.spyOn(user, "validate").mockRejectedValueOnce({
      errors: {
        password: {
          message: "Your password must be at least 8 characters long",
        },
      },
    });

    try {
      await user.validate();
    } catch (err) {
      expect(err.errors.password).toBeDefined();
      expect(err.errors.password.message).toMatch(/at least 8 characters long/i);
    }
  });
})