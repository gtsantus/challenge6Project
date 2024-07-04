import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ViewCards from "../src/pages/ViewCards";
import cardService from "../src/services/cards.service";

vi.mock("../src/services/cards.service", () => ({
  default: {
    getAllCards: vi.fn(),
  },
}));

const mockCards = [
  {
    name: "Test Card",
    cost: 2,
    cardText: "Test Text",
    type: "Minion",
    power: 3,
    toughness: 1,
    rows: ["Front", "Middle", "Back"],
    legendary: true,
  },
];

describe("ViewCards Component", () => {
  it("displays loading initially", () => {
    render(<ViewCards currentUser={{ id: "user1" }} />, {
      wrapper: MemoryRouter,
    });
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("renders cards", async () => {
    cardService.getAllCards.mockResolvedValue(mockCards);
    render(<ViewCards currentUser={{}} />, {
      wrapper: MemoryRouter,
    });
    await waitFor(() =>
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
    );
    expect(screen.getByText(/Test Card/i)).toBeInTheDocument();
    expect(screen.getByText(/Legendary/i)).toBeInTheDocument();
  });

  it("displays error message when unable to fetch cards", async () => {
    cardService.getAllCards.mockRejectedValue(
      new Error("Failed to fetch cards")
    );
    render(<ViewCards currentUser={{ id: "user1" }} />, {
      wrapper: MemoryRouter,
    });
    await waitFor(() =>
      expect(screen.getByText(/failed to fetch cards/i)).toBeInTheDocument()
    );
  });
});
