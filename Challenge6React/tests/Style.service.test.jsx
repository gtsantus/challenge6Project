
import { describe, it, expect} from "vitest";
import styleService from "../src/services/style.service";

describe("Style Service", () => { 
    it("should return the correct style for Tech", () => {
        expect(styleService.getFactionClass("Tech")).toBe("faction-orange");
    });

        it("should return the correct style for Undead", () => {
        expect(styleService.getFactionClass("Undead")).toBe("faction-grey");
        });
    
        it("should return the correct style for Order", () => {
        expect(styleService.getFactionClass("Order")).toBe("faction-silver");
        });
    
        it("should return the correct style for Druid", () => {
        expect(styleService.getFactionClass("Druid")).toBe("faction-green");
        });
    
        it("should return the correct style for Guerilla", () => {
        expect(styleService.getFactionClass("Guerilla")).toBe("faction-brown");
    });

    it("should return the correct style for Wizard", () => {
        expect(styleService.getFactionClass("Wizard")).toBe("faction-purple");
    });

    it("should return the default style for an unknown faction", () => {
        expect(styleService.getFactionClass("Unknown")).toBe("faction-default");
    });

    it("should return the correct colour for Tech", () => {
        expect(styleService.getFactionColour("Tech")).toEqual({
            bg: "bg-warning",
            text: "text-dark",
            button: "btn btn-danger"
        });
    });

    it("should return the correct colour for Undead", () => {
        expect(styleService.getFactionColour("Undead")).toEqual({
            bg: "bg-secondary-subtle",
            text: "text-secondary-emphasis",
            button: "btn btn-secondary"
        });
    });

    it("should return the correct colour for Order", () => {
        expect(styleService.getFactionColour("Order")).toEqual({
            bg: "bg-light",
            text: "text-dark",
            button: "btn btn-dark"
        });
    }); 

    it("should return the correct colour for Druid", () => {
        expect(styleService.getFactionColour("Druid")).toEqual({
            bg: "bg-success",
            text: "text-white",
            button: "btn btn-light"
        });
    });

    it("should return the correct colour for Guerilla", () => {
        expect(styleService.getFactionColour("Guerilla")).toEqual({
            bg: "bg-success-subtle",
            text: "text-success-emphasis",
            button: "btn btn-success"
        });
    });

    it("should return the correct colour for Wizard", () => {
        expect(styleService.getFactionColour("Wizard")).toEqual({
            bg: "bg-info",
            text: "text-dark",
            button: "btn btn-primary"
        });
    });

    it("should return the default colour for an unknown faction", () => {
        expect(styleService.getFactionColour("Unknown")).toEqual({
            bg: "bg-white",
            text: "text-dark",
            button: "btn btn-dark"
        });
    });

    it("should format the card text correctly", () => {
        const text = "Leading: Perfect Cast: die";
        const card = { type: "Spell" };
        const expectedResult = [
        { key: 0, prefix: "", word: "Leading:" },
        { key: 1, prefix: "\n", word: "Perfect Cast:" },
        { key: 2, prefix: " ", word: "Cast:" },
        { key: 3, prefix: " ", word: "die" },
    ];
        expect(styleService.formatCardText(text, card)).toStrictEqual(expectedResult);
    });
});