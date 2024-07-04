import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Card from "../src/components/Card";

describe("Card Component", () => {
  it("should render a card with the correct name", () => {
    const card = {
      name: "Test Card",
      cost: 2,
      cardText: "Test Text",
      type: "Minion",
      power: 3,
      toughness: 1,
      rows: ["Front", "Middle", "Back"],
      legendary: true,
    };
    render(<Card displayCard={card} />);
    expect(screen.getByText(/Test Card/i)).toBeInTheDocument();
  });

  it("should render a card with the correct cost", () => {
    const card = {
      name: "Test Card",
      cost: 2,
      cardText: "Test Text",
      type: "Minion",
      power: 3,
      toughness: 1,
      rows: ["Front", "Middle", "Back"],
      legendary: true,
    };
    render(<Card displayCard={card} />);
    expect(screen.getByText(/2/i)).toBeInTheDocument();
  });

  it("should render a card with the correct text", () => {
    const card = {
      name: "Test Card",
      cost: 2,
      cardText: "Test Text",
      type: "Minion",
      power: 3,
      toughness: 1,
      rows: ["Front", "Middle", "Back"],
      legendary: true,
    };
    render(<Card displayCard={card} />);
    expect(screen.getByText(/Text/i)).toBeInTheDocument();
  });

  it("should render a card with the correct power", () => {
    const card = {
      name: "Test Card",
      cost: 2,
      cardText: "Test Text",
      type: "Minion",
      power: 3,
      toughness: 1,
      rows: ["Front", "Middle", "Back"],
      legendary: true,
    };
    render(<Card displayCard={card} />);
    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });

  it("should render a card with the correct toughness", () => {
    const card = {
      name: "Test Card",
      cost: 2,
      cardText: "Test Text",
      type: "Minion",
      power: 3,
      toughness: 1,
      rows: ["Front", "Middle", "Back"],
      legendary: true,
    };
    render(<Card displayCard={card} />);
    expect(screen.getByText(/1/i)).toBeInTheDocument();
  });

  it("should render a card with the correct rows", () => {
    const card = {
      name: "Test Card",
      cost: 2,
      cardText: "Test Text",
      type: "Minion",
      power: 3,
      toughness: 1,
      rows: ["Front", "Middle", "Back"],
      legendary: true,
    };
    render(<Card displayCard={card} />);
    expect(screen.getByText(/Front Middle Back/i)).toBeInTheDocument();
  });

  it("should render a card with the correct legendary status", () => {
    const card = {
      name: "Test Card",
      cost: 2,
      cardText: "Test Text",
      type: "Minion",
      power: 3,
      toughness: 1,
      rows: ["Front", "Middle", "Back"],
      legendary: true,
    };
    render(<Card displayCard={card} />);
    expect(screen.getByText(/Legendary/i)).toBeInTheDocument();
  });

  it("should not render a cost for a camp card", () => {
    const card = {
      name: "Test Card",
      cost: 2,
      cardText: "Test Text",
      type: "Camp",
      power: 3,
      toughness: 1,
      rows: ["Front", "Middle", "Back"],
      legendary: true,
    };
    render(<Card displayCard={card} />);
    expect(screen.queryByText(/2/i)).toBeNull();
  });

  it("should not render power and toughness for a camp card", () => {
    const card = {
      name: "Test Card",
      cost: 2,
      cardText: "Test Text",
      type: "Camp",
      power: 3,
      toughness: 1,
      rows: ["Front", "Middle", "Back"],
      legendary: true,
    };
    render(<Card displayCard={card} />);
    expect(screen.queryByText(/3/i)).toBeNull();
    expect(screen.queryByText(/1/i)).toBeNull();
  });

  it("should not render rows for a spell card", () => {
    const card = {
      name: "Test Card",
      cost: 2,
      cardText: "Test Text",
      type: "Spell",
      power: 3,
      toughness: 1,
      rows: ["Front", "Middle", "Back"],
      legendary: true,
    };
    render(<Card displayCard={card} />);
    expect(screen.queryByText(/Front Middle Back/i)).toBeNull();
  });

  it("should not render power and toughness for a spell card", () => {
    const card = {
      name: "Test Card",
      cost: 2,
      cardText: "Test Text",
      type: "Spell",
      power: 3,
      toughness: 1,
      rows: ["Front", "Middle", "Back"],
      legendary: true,
    };
    render(<Card displayCard={card} />);
    expect(screen.queryByText(/3/i)).toBeNull();
    expect(screen.queryByText(/1/i)).toBeNull();
  });

  it("should render the add to deck button when showAddToDeckButton is true", () => {
    const card = {
      name: "Test Card",
      cost: 2,
      cardText: "Test Text",
      type: "Minion",
      power: 3,
      toughness: 1,
      rows: ["Front", "Middle", "Back"],
      legendary: true,
    };
    render(<Card displayCard={card} showAddToDeckButton={true} />);
    expect(screen.getByText(/Add to Deck/i)).toBeInTheDocument();
  });

  it("should not render the add to deck button when showAddToDeckButton is false", () => {
    const card = {
      name: "Test Card",
      cost: 2,
      cardText: "Test Text",
      type: "Minion",
      power: 3,
      toughness: 1,
      rows: ["Front", "Middle", "Back"],
      legendary: true,
    };
    render(<Card displayCard={card} showAddToDeckButton={false} />);
    expect(screen.queryByText(/Add to Deck/i)).toBeNull();
  });

  it("should run the onAddToDeck function when the add to deck button is clicked", () => {
    const card = {
      name: "Test Card",
      cost: 2,
      cardText: "Test Text",
      type: "Minion",
      power: 3,
      toughness: 1,
      rows: ["Front", "Middle", "Back"],
      legendary: true,
    };
    const onAddToDeck = vi.fn();
    render(
      <Card
        displayCard={card}
        showAddToDeckButton={true}
        onAddToDeck={onAddToDeck}
      />
    );
    screen.getByText(/Add to Deck/i).click();
    expect(onAddToDeck).toHaveBeenCalledTimes(1);
  });
});
