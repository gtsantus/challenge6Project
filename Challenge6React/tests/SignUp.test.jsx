import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import authService from "../src/services/auth.service";
import SignUp from "../src/pages/SignUp";

vi.mock("../src/services/auth.service", () => ({
  default: {
    validatePassword: vi.fn(),
    signUp: vi.fn(),
    getCurrentUser: vi.fn(),
  },
}));

describe("Login Component", () => {
  it("should attempt login on button press", async () => {
    authService.validatePassword.mockReturnValue(true);
    authService.signUp.mockResolvedValue({ id: "user1" });
    authService.getCurrentUser.mockReturnValue({ id: "user1" });

    render(<SignUp setCurrentUser={() => {}} />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button"));

    expect(authService.signUp).toHaveBeenCalledWith("testuser", "password123");
    expect(authService.validatePassword).toHaveBeenCalledWith("password123");
  });

  it("should display error message on invalid password", async () => {
    authService.validatePassword.mockReturnValue(false);
    authService.signUp.mockResolvedValue({ id: "user1" });
    authService.getCurrentUser.mockReturnValue({ id: "user1" });

    render(<SignUp setCurrentUser={() => {}} />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button"));

    expect(authService.validatePassword).toHaveBeenCalledWith("password123");
    expect(
      screen.getByText(/Invalid Username or Password/i)
    ).toBeInTheDocument();
  });

  it("should display error message on invalid username", async () => {
    authService.validatePassword.mockReturnValue(true);
    authService.signUp.mockResolvedValue(null);
    authService.getCurrentUser.mockReturnValue(undefined);

    render(<SignUp setCurrentUser={() => {}} />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button"));

    expect(authService.signUp).toHaveBeenCalledWith("testuser", "password123");
    expect(authService.getCurrentUser).toHaveBeenCalled();
  });
});
