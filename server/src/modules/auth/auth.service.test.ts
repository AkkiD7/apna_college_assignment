import bcrypt from "bcryptjs";
import type { Mock } from "vitest";

import { AppError } from "../../utils/app-error.js";
import { loginUser } from "./auth.service.js";
import { User } from "./user.model.js";

vi.mock("bcryptjs", () => ({
  default: {
    compare: vi.fn()
  }
}));

vi.mock("./user.model.js", () => ({
  User: {
    findOne: vi.fn()
  }
}));

describe("loginUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a signed-in user and token for valid credentials", async () => {
    (User.findOne as unknown as Mock).mockResolvedValue({
      _id: {
        toString: () => "user-1"
      },
      email: "demo@apnacollege.com",
      passwordHash: "hashed-password"
    });
    (bcrypt.compare as unknown as Mock).mockResolvedValue(true);

    const response = await loginUser({
      email: "demo@apnacollege.com",
      password: "Pass@123"
    });

    expect(User.findOne).toHaveBeenCalledWith({ email: "demo@apnacollege.com" });
    expect(response.user).toEqual({
      id: "user-1",
      email: "demo@apnacollege.com"
    });
    expect(response.token).toEqual(expect.any(String));
  });

  it("throws when the password is invalid", async () => {
    (User.findOne as unknown as Mock).mockResolvedValue({
      _id: {
        toString: () => "user-1"
      },
      email: "demo@apnacollege.com",
      passwordHash: "hashed-password"
    });
    (bcrypt.compare as unknown as Mock).mockResolvedValue(false);

    await expect(
      loginUser({
        email: "demo@apnacollege.com",
        password: "wrong-password"
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

