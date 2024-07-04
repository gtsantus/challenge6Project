import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from "axios";
import cardsService from "../src/services/cards.service";

vi.mock("axios");

describe("Cards Service", () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
  });
  describe("getAllCards", () => {
    it("should return all cards", async () => {
      const mockResponse = { data: [{ name: "Test Card" }] };
      axios.get.mockResolvedValue(mockResponse);
      const result = await cardsService.getAllCards();
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle failure", async () => {
      axios.get.mockRejectedValue(new Error("Failed to get cards"));
      const result = await cardsService.getAllCards();
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe("Failed to get cards");
    });
  });

  describe("getCardById", () => {
    it("should return a card by id", async () => {
      const mockResponse = { data: { name: "Test Card" } };
      axios.get.mockResolvedValue(mockResponse);
      const result = await cardsService.getCardById(1);
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle failure", async () => {
      axios.get.mockRejectedValue(new Error("Failed to get card"));
      const result = await cardsService.getCardById(1);
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe("Failed to get card");
    });
  });

  describe("addCard", () => {
    it("should add a card", async () => {
      const mockResponse = { data: { name: "Test Card" } };
      axios.post.mockResolvedValue(mockResponse);
      const result = await cardsService.addCard({ name: "Test Card" });
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle failure", async () => {
      axios.post.mockRejectedValue(new Error("Failed to add card"));
      const result = await cardsService.addCard({ name: "Test Card" });
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe("Failed to add card");
    });
  });
});
