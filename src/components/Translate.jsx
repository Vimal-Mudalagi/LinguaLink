import React, { useState } from "react";
import countries from "../data";

const Translate = () => {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromLang, setFromLang] = useState("en-GB");
  const [toLang, setToLang] = useState("hi-IN");

  const handleExchange = () => {
    let tempText = fromText;
    let tempLang = fromLang;
    setFromText(toText);
    setToText(tempText);
    setFromLang(toLang);
    setToLang(tempLang);
  };

  const handleTranslate = async () => {
    if (!fromText) return;
    setToText("Translating...");
    try {
      let apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLang}|${toLang}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setToText(data.responseData.translatedText);
      data.matches.forEach((data) => {
        if (data.id === 0) {
          setToText(data.translation);
        }
      });
    } catch (error) {
      console.error("Error fetching translation:", error);
      setToText("Translation failed");
    }
  };

  return (
    <>
      <h1 className="text-center text-4xl p-3 font-bold">LinguaLink</h1>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="wrapper">
          <div className="text-input">
            <textarea
              spellCheck="false"
              className="from-text"
              placeholder="Enter Your text"
              value={fromText}
              onChange={(e) => setFromText(e.target.value)}
            ></textarea>
            <textarea
              spellCheck="false"
              readOnly
              disabled
              className="to-text"
              placeholder="Translation"
              value={toText}
            ></textarea>
          </div>
          <ul className="controls">
            <li className="row from">
              <div className="icons">
                <i className="fas fa-volume-up" onClick={() => {}}></i>
                <i className="fas fa-copy" onClick={() => {}}></i>
              </div>
              <select value={fromLang} onChange={(e) => setFromLang(e.target.value)}>
                {Object.entries(countries).map(([country_code, country_name]) => (
                  <option key={country_code} value={country_code}>
                    {country_name}
                  </option>
                ))}
              </select>
            </li>
            <li className="exchange" onClick={handleExchange}>
              <i className="fas fa-exchange-alt"></i>
            </li>
            <li className="row to">
              <select value={toLang} onChange={(e) => setToLang(e.target.value)}>
                {Object.entries(countries).map(([country_code, country_name]) => (
                  <option key={country_code} value={country_code}>
                    {country_name}
                  </option>
                ))}
              </select>
              <div className="icons">
                <i className="fas fa-volume-up" onClick={() => {}}></i>
                <i className="fas fa-copy" onClick={() => {}}></i>
              </div>
            </li>
          </ul>
        </div>
        <button onClick={handleTranslate}>Translate Text</button>
      </div>
    </>
  );
};

export default Translate;
