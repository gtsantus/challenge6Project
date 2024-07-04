import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddCard from "../src/pages/AddCard";
import authService from "../src/services/auth.service";

vi.mock("../src/services/auth.service", () => ({
  default: {
    getCurrentUser: vi.fn(),
    handleInputChange: vi.fn(),
  },
}));

describe("AddCard Component", () => {
  it("should display unauthorized message for non-admin users", async () => {
    authService.getCurrentUser.mockResolvedValue({ admin: false });
    render(<AddCard />);
    expect(
      await screen.findByText("You are not authorised to see this page")
    ).toBeInTheDocument();
  });

  it("should display the form for admin users", async () => {
    authService.getCurrentUser.mockResolvedValue({ admin: true });
    render(<AddCard />);
    expect(await screen.findByPlaceholderText("Name")).toBeInTheDocument();
    expect(await screen.findByPlaceholderText("Cost")).toBeInTheDocument();
    expect(await screen.findByPlaceholderText("Power")).toBeInTheDocument();
    expect(await screen.findByPlaceholderText("Toughness")).toBeInTheDocument();
    expect(await screen.findByPlaceholderText("Card Text")).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText("Flavour Text")
    ).toBeInTheDocument();
  });
});
