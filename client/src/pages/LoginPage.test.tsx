import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { AuthContext } from "../features/auth/AuthContext";
import { LoginPage } from "./LoginPage";
import type { AuthContextValue } from "../types/auth";

describe("LoginPage", () => {
  it("submits credentials through auth context", async () => {
    const user = userEvent.setup();
    const login = vi.fn().mockResolvedValue({ id: "1", email: "demo@apnacollege.com" });
    const authValue: AuthContextValue = {
      token: null,
      user: null,
      login,
      logout: vi.fn(),
      isBootstrapping: false,
      isAuthenticated: false
    };

    render(
      <AuthContext.Provider value={authValue}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await user.clear(screen.getByLabelText(/email/i));
    await user.type(screen.getByLabelText(/email/i), "demo@apnacollege.com");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(login).toHaveBeenCalledWith({
      email: "demo@apnacollege.com",
      password: "Pass@123"
    });
  });
});

