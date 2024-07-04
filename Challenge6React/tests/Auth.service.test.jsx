import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import Cookies from "js-cookie";
import authService from "../src/services/auth.service";

vi.mock("axios");
vi.mock("js-cookie");

describe("Auth Service", () => {
  describe("validatePassword", () => {
    it("should return true if the password passes the regex", () => {
      expect(authService.validatePassword("NewPassword1!")).toBe(true);
    });

    it("should return false if the password does not pass the regex", () => {
      expect(authService.validatePassword("password")).toBe(false);
    });
  });

  describe("login", () => {
    it("should successfully log in a user", async () => {
      const mockResponse = { data: { accessToken: "fakeToken" } };
      axios.post.mockResolvedValue(mockResponse);
      const result = await authService.login("testUser", "testPass");
      expect(result).toEqual(mockResponse.data);
      expect(Cookies.set).toHaveBeenCalledWith(
        "user",
        JSON.stringify(mockResponse.data),
        { expires: 1 }
      );
    });

    it("should handle login failure", async () => {
      axios.post.mockRejectedValue(new Error("Login failed"));
      const result = await authService.login("wrongUser", "wrongPass");
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe("Login failed");
    });
  });

  describe("signUp", () => {
    it("should successfully sign up a user", async () => {
      const mockResponse = { data: { accessToken: "fakeToken  " } };
      axios.post.mockResolvedValue(mockResponse);
      const result = await authService.signUp("testUser", "testPass");
      expect(result).toEqual(mockResponse.data);
      expect(Cookies.set).toHaveBeenCalledWith(
        "user",
        JSON.stringify(mockResponse.data),
        { expires: 1 }
      );
    });

    it("should handle sign up failure", async () => {
      axios.post.mockRejectedValue(new Error("Sign up failed"));
      const result = await authService.signUp("wrongUser", "wrongPass");
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe("Sign up failed");
    });
  });

  describe("logout", () => {
    it("should log out a user", async () => {
      authService.logout();
      expect(Cookies.remove).toHaveBeenCalledWith("user");
    });
  });

  describe("getCurrentUser", () => {
    it("should return the current user", async () => {
      const mockUser = { name: "Test User" };
      Cookies.get.mockReturnValue(JSON.stringify(mockUser));
      const result = await authService.getCurrentUser();
      expect(result).toEqual(mockUser);
    });

    it("should return undefined if there is no current user", async () => {
      Cookies.get.mockReturnValue(undefined);
      const result = await authService.getCurrentUser();
      expect(result).toBeUndefined();
    });
  });
});
