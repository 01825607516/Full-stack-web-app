
export const getQuote = async (): Promise<string | null> => {
  try {
    const response = await fetch("https://type.fit/api/quotes");
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const quotes = await response.json();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    return `"${quote.text}" - ${quote.author || 'Unknown'}`;
  } catch (error) {
    console.error("Could not fetch quote:", error);
    return "The journey of a thousand miles begins with a single step.";
  }
};
