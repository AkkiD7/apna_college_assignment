import type { Mock } from "vitest";

import { User } from "../modules/auth/user.model.js";
import { AppError } from "../utils/app-error.js";
import { signToken } from "../utils/jwt.js";
import { requireAuth } from "./auth.middleware.js";

vi.mock("../modules/auth/user.model.js", () => ({
  User: {
    findById: vi.fn()
  }
}));

const createResponseDouble = () => ({});

describe("requireAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects requests without an authorization header", async () => {
    const next = vi.fn();

    await requireAuth({ headers: {} } as never, createResponseDouble() as never, next);

    expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
    expect(next.mock.calls[0][0].statusCode).toBe(401);
  });

  it("rejects requests with an invalid token", async () => {
    const next = vi.fn();

    await requireAuth(
      { headers: { authorization: "Bearer invalid-token" } } as never,
      createResponseDouble() as never,
      next
    );

    expect(next.mock.calls[0][0]).toBeInstanceOf(AppError);
    expect(next.mock.calls[0][0].statusCode).toBe(401);
  });

  it("attaches the user to the request for valid tokens", async () => {
    const next = vi.fn();
    const token = signToken({ sub: "user-1", email: "demo@apnacollege.com" });
    const request = {
      headers: { authorization: `Bearer ${token}` }
    } as {
      headers: { authorization: string };
      user?: { id: string; email: string };
    };

    (User.findById as unknown as Mock).mockResolvedValue({
      _id: {
        toString: () => "user-1"
      },
      email: "demo@apnacollege.com"
    });

    await requireAuth(request as never, createResponseDouble() as never, next);

    expect(request.user).toEqual({
      id: "user-1",
      email: "demo@apnacollege.com"
    });
    expect(next).toHaveBeenCalledWith();
  });
});

