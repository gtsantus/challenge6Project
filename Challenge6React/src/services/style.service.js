const getFactionClass = (faction) => {
    switch (faction) {
      case "Tech":
        return "faction-orange";
      case "Undead":
        return "faction-grey";
      case "Order":
        return "faction-silver";
      case "Druid":
        return "faction-green";
      case "Guerilla":
        return "faction-brown";
      case "Wizard":
        return "faction-purple";
      default:
        return "faction-default";
    }
};
  
const getFactionColour = (faction) => {
    switch (faction) {
      case "Tech":
        return {
          bg: "bg-warning",
          text: "text-dark",
          button: "btn btn-danger",
        };
      case "Undead":
        return {
          bg: "bg-secondary-subtle",
          text: "text-secondary-emphasis",
          button: "btn btn-secondary",
        };
      case "Order":
        return { bg: "bg-light", text: "text-dark", button: "btn btn-dark" };
      case "Druid":
        return {
          bg: "bg-success",
          text: "text-white",
          button: "btn btn-light",
        };
      case "Guerilla":
        return {
          bg: "bg-success-subtle",
          text: "text-success-emphasis",
          button: "btn btn-success",
        };
      case "Wizard":
        return { bg: "bg-info", text: "text-dark", button: "btn btn-primary" };
      default:
        return { bg: "bg-white", text: "text-dark", button: "btn btn-dark" };
    }
};
    
const formatCardText = (text, displayCard) => {

  if (!text || text.trim() === "") {
    return [];
  }

  return text.split(" ").map((word, index, words) => {
    const nextWord = words[index + 1] ? ` ${words[index + 1]}` : "";
    const phrase = word + nextWord;
    const isLeading = word === "Leading:";
    const isPerfectCast =
      phrase.startsWith("Perfect Cast:") && displayCard.type === "Spell";
    const prefix =
      index === 0 ? "" : isLeading || isPerfectCast ? '\n' : " ";
    const modifiedWord = isPerfectCast ? phrase : word;
      

    return { key: index, prefix, word: modifiedWord };
  });
};

const styleService = {
  getFactionColour,
  getFactionClass,
  formatCardText
};

export default styleService;