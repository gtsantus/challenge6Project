import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";

describe("App Component", () => {
  it("should render the App component", () => {
    render(<App />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
