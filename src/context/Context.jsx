import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (customInput) => {
    const inputToUse = customInput || input;
    if (!inputToUse) return;

    try {
      setLoading(true);
      setShowResult(true);

      const response = await run(inputToUse);

      // Only clear input and update prompts if we got a valid response
      if (response) {
        setResultData(response);

        // Don't add initial prompt to history
        if (inputToUse !== "What is react js?") {
          setRecentPrompt(inputToUse);
          setPrevPrompt((prev) => [...prev, inputToUse]);
        }

        // Only clear input if it wasn't a custom input (like the initial prompt)
        if (!customInput) {
          setInput("");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setResultData(
        "An error occurred while fetching the response. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Move this specific call outside of useEffect
  const initialPrompt = () => {
    onSent("What is react js?");
  };

  useEffect(() => {
    initialPrompt();
  }, [initialPrompt]); // Empty dependency is fine now since initialPrompt is defined outside

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    setLoading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
// export default ContextProvider;
