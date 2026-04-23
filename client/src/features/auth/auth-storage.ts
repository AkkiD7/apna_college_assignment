const TOKEN_KEY = "dsa-sheet-token";

export const authStorage = {
  getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    window.localStorage.setItem(TOKEN_KEY, token);
  },
  clearToken() {
    window.localStorage.removeItem(TOKEN_KEY);
  }
};

