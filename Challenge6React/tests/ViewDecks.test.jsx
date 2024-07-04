import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ViewDecks from "../src/pages/ViewDecks";
import decksService from "../src/services/decks.service";

vi.mock("../src/services/decks.service", () => ({
  default: {
    getDecks: vi.fn(),
    addDeck: vi.fn(),
  },
}));

const mockDecks = [{ _id: "1", name: "Deck 1", faction: "Tech" }];

describe("ViewDecks Component", () => {
  it("displays loading initially", () => {
    render(<ViewDecks currentUser={{ id: "user1" }} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("renders decks for logged in user", async () => {
    decksService.getDecks.mockResolvedValue(mockDecks);
    render(<ViewDecks currentUser={{ id: "user1" }} />, {
      wrapper: MemoryRouter,
    });
    await waitFor(() =>
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
    );
    expect(
      screen.getByText(/choose a deck to edit, or create a new one!/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/deck 1/i)).toBeInTheDocument();
  });

  it("prompts to log in when no user is present", () => {
    render(<ViewDecks />, { wrapper: MemoryRouter });
    expect(
      screen.getByText(/please log in to view your decks/i)
    ).toBeInTheDocument();
  });

  it("displays error message when unable to fetch decks", async () => {
    decksService.getDecks.mockRejectedValue(new Error("Failed to fetch decks"));
    render(<ViewDecks currentUser={{ id: "user1" }} />, {
      wrapper: MemoryRouter,
    });
    await waitFor(() =>
      expect(screen.getByText(/failed to fetch decks/i)).toBeInTheDocument()
    );
  });

  it("creates a new deck", async () => {
    decksService.getDecks.mockResolvedValue(mockDecks);
    decksService.addDeck.mockResolvedValue();
    render(<ViewDecks currentUser={{ id: "user1" }} />, {
      wrapper: MemoryRouter,
    });
    await waitFor(() =>
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
    );
    const newDeckName = "New Deck";
    const newDeckFaction = "Druid";
    const input = screen.getByLabelText(/deck name/i);
    const select = screen.getByLabelText(/faction/i);
    const button = screen.getByText(/create deck/i);
    fireEvent.change(input, { target: { value: newDeckName } });
    fireEvent.change(select, { target: { value: newDeckFaction } });
    button.click();
    await waitFor(() =>
      expect(decksService.addDeck).toHaveBeenCalledWith(
        "user1",
        newDeckName,
        newDeckFaction,
        []
      )
    );
    expect(input.value).toBe("");
  });
});
