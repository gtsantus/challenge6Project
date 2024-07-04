import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Header from "../src/components/Header";

vi.mock("../services/auth.service", () => ({
  logout: vi.fn(),
}));

describe("Header Component", () => {
  it("should display the login button when no user is logged in", () => {
    render(<Header setCurrentUser={() => {}} showAdminContent={false} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.queryByText(/log out/i)).toBeNull();
  });

  it("should display the logout button when a user is logged in", () => {
    render(
      <MemoryRouter>
        <Header
          currentUser={{ name: "Test User" }}
          setCurrentUser={() => {}}
          showAdminContent={false}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/log out/i)).toBeInTheDocument();
    expect(screen.queryByText(/login/i)).toBeNull();
  });

  it("should display admin content when showAdminContent is true", () => {
    render(
      <MemoryRouter>
        <Header
          currentUser={{ name: "Admin User" }}
          setCurrentUser={() => {}}
          showAdminContent={true}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/add card/i)).toBeInTheDocument();
  });

  it("should not display admin content when showAdminContent is false", () => {
    render(
      <MemoryRouter>
        <Header
          currentUser={{ name: "Regular User" }}
          setCurrentUser={() => {}}
          showAdminContent={false}
        />
      </MemoryRouter>
    );
    expect(screen.queryByText(/add card/i)).toBeNull();
  });

  it("should call logout when the logout button is clicked", () => {
    const setCurrentUser = vi.fn();
    render(
      <MemoryRouter>
        <Header
          currentUser={{ name: "Test User" }}
          setCurrentUser={setCurrentUser}
          showAdminContent={false}
        />
      </MemoryRouter>
    );
    screen.getByText(/log out/i).click();
    expect(setCurrentUser).toHaveBeenCalledWith(undefined);
  });
});
