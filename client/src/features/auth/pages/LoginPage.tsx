import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../AuthContext";
import type { LoginCredentials } from "../../../types/api";

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

const demoCredentials: LoginCredentials = {
  email: "demo@apnacollege.com",
  password: "Pass@123"
};

export const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const [formState, setFormState] = useState<LoginCredentials>({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await login(formState);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Unable to log in right now."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const useDemoCredentials = () => {
    setFormState(demoCredentials);
    setErrorMessage("");
  };

  return (
    <div className="bg-surface-container-lowest min-h-screen flex items-center justify-center p-4 antialiased selection-primary">
      {/* Main Login Card */}
      <main className="w-full max-w-[400px] bg-surface border border-surface-container-high rounded-xl p-[40px] flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col items-center text-center gap-3">
          <span className="material-symbols-outlined text-primary text-[32px]">code</span>
          <div className="flex flex-col gap-1">
            <h1 className="font-headline-lg text-headline-lg text-on-background">DSA.sheet</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Track your DSA journey</p>
          </div>
        </header>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="rounded-lg border border-surface-container-high bg-surface-container-low px-4 py-3 flex flex-col gap-3">
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Demo Credentials</p>
              <p className="font-body-sm text-body-sm text-on-surface mt-1">Email: {demoCredentials.email}</p>
              <p className="font-body-sm text-body-sm text-on-surface">Password: {demoCredentials.password}</p>
            </div>
            <button
              type="button"
              onClick={useDemoCredentials}
              className="w-fit rounded-md border border-primary/40 px-3 py-1.5 font-body-sm text-body-sm text-primary hover:bg-primary/10 transition-all duration-150"
            >
              Use Demo Credentials
            </button>
          </div>

          <div className="flex flex-col gap-element-gap">
            <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-150"
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="dev@example.com"
              required
            />
          </div>
          <div className="flex flex-col gap-element-gap">
            <div className="flex items-center justify-between">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="password">
                Password
              </label>
            </div>
            <input
              className="w-full bg-surface-container-low border border-surface-container-high rounded-xl px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-150"
              id="password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          {errorMessage ? (
            <div className="rounded-lg border border-error/20 bg-error-container/10 px-4 py-3 text-sm text-error">
              {errorMessage}
            </div>
          ) : null}

          <button
            className="w-full bg-primary text-on-primary border border-transparent rounded-xl py-3 mt-2 font-body-md text-body-md font-medium hover:bg-primary-fixed hover:border-primary-fixed-dim transition-all duration-150 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Continuing..." : "Continue"}
          </button>
        </form>
      </main>
    </div>
  );
};
