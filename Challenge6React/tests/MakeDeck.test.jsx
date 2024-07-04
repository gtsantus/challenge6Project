import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render } from "@testing-library/react";
import MakeDeck from "../src/pages/MakeDeck";
import { MemoryRouter } from "react-router-dom";
import cardService from "../src/services/cards.service";

vi.mock("../src/services/cards.service", () => ({
  default: {
    getAllCards: vi.fn(),
    getCardById: vi.fn(),
  },
}));

vi.mock("../src/services/decks.service", () => ({
  default: {
    updateDeck: vi.fn(),
  },
}));

describe("MakeDeck", () => {
  const mockCards = [
    { _id: "1", name: "Card 1", cost: 1 },
    { _id: "2", name: "Card 2", cost: 2 },
  ];
  const currentUser = { id: "user1" };

  beforeEach(() => {
    cardService.getAllCards.mockResolvedValue(mockCards);
    cardService.getCardById.mockImplementation((id) =>
      Promise.resolve(mockCards.find((card) => card._id === id))
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders login prompt when user is not logged in", () => {
    const { getByText } = render(<MakeDeck />, { wrapper: MemoryRouter });
    expect(getByText(/Please log in to create a deck/i)).toBeInTheDocument();
  });

  it('renders "select a deck" message when no deck is loaded', () => {
    const { getByText } = render(<MakeDeck currentUser={currentUser} />, {
      wrapper: MemoryRouter,
    });
    expect(
      getByText(
        /Deck not loaded. Please select a deck through your My Decks page./i
      )
    ).toBeInTheDocument();
  });
});
