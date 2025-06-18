import he from "he";
import { useState } from "react";
export default function Options({
  options,
  correctOption,
  selectedOption,
  handleSelect,
}) {
  const [mixedOptions, setMixedOptions] = useState(
    options
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  );
  return (
    <div className="options-container">
      <ul className="options-list">
        {mixedOptions.map((option, index) => (
          <li
            key={index}
            className={`${selectedOption ? "option" : "beforeSelection"} ${
              selectedOption === option && "selected"
            } ${selectedOption && option === correctOption && "correct"}`}
            onClick={() => handleSelect(option)}
          >
            {he.decode(option)}
          </li>
        ))}
      </ul>
    </div>
  );
}
