import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Deck from "../src/components/Deck";

describe("Deck Component", () => {
  beforeEach(() => {
    const deck = {
      name: "Test Deck",
      faction: "Test Faction",
    };
    render(<Deck displayDeck={deck} />, { wrapper: MemoryRouter });
  });

  it("should render a deck with the correct name", () => {
    expect(screen.getByText(/Test Deck/i)).toBeInTheDocument();
  });

  it("should render a deck with the correct faction", () => {
    expect(screen.getByText(/Test Faction/i)).toBeInTheDocument();
  });

  it("should get the correct style for the faction", () => {
    expect(screen.getByText(/Edit Deck/i)).toHaveClass("btn btn-dark");
  });
});
