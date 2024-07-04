import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import decksService from "../src/services/decks.service";

vi.mock("axios");

describe("Decks Service", () => {
  describe("getDecks", () => {
    it("should return all decks", async () => {
      const mockResponse = { data: [{ name: "Test Deck" }] };
      axios.get.mockResolvedValue(mockResponse);
      const result = await decksService.getDecks();
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle failure", async () => {
      axios.get.mockRejectedValue(new Error("Failed to get decks"));
      const result = await decksService.getDecks();
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe("Failed to get decks");
    });
  });

  describe("addDeck", () => {
    it("should add a deck", async () => {
      const mockResponse = { data: { name: "Test Deck" } };
      axios.post.mockResolvedValue(mockResponse);
      const result = await decksService.addDeck({ name: "Test Deck" });
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle failure", async () => {
      axios.post.mockRejectedValue(new Error("Failed to add deck"));
      const result = await decksService.addDeck({ name: "Test Deck" });
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe("Failed to add deck");
    });
  });

  describe("updateDeck", () => {
    it("should update a deck", async () => {
      const mockResponse = { data: { name: "Test Deck" } };
      axios.put.mockResolvedValue(mockResponse);
      const result = await decksService.updateDeck({ name: "Test Deck" });
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle failure", async () => {
      axios.put.mockRejectedValue(new Error("Failed to update deck"));
      const result = await decksService.updateDeck({ name: "Test Deck" });
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe("Failed to update deck");
    });
  });

  describe("deleteDeck", () => {
    it("should delete a deck", async () => {
      const mockResponse = { data: { name: "Test Deck" } };
      axios.delete.mockResolvedValue(mockResponse);
      const result = await decksService.deleteDeck({ name: "Test Deck" });
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle failure", async () => {
      axios.delete.mockRejectedValue(new Error("Failed to delete deck"));
      const result = await decksService.deleteDeck({ name: "Test Deck" });
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe("Failed to delete deck");
    });
  });
});
