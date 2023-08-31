import React, {useState, useRef, useEffect} from 'react';

function CustomMulti () {
  const [inputValue, setInputValue] = useState ('');
  const [selectedOptions, setSelectedOptions] = useState ([]);
  const [filteredOptions, setFilteredOptions] = useState ([]);
  const inputRef = useRef (null);

  useEffect (
    () => {
      inputRef.current.focus ();
    },
    [selectedOptions]
  );

  const handleInputChange = newValue => {
    setInputValue (newValue);
    filterOptions (newValue);
  };

  const handleKeyDown = event => {
    if (event.key === ' ' && '+-*/'.includes (inputValue.trim ())) {
      const newOption = {value: inputValue.trim (), label: inputValue.trim ()};
      setSelectedOptions ([...selectedOptions, newOption]);
      setInputValue ('');
      setFilteredOptions ([]);
    } else if (event.key === 'Enter') {
      event.preventDefault ();
      if (inputValue && inputValue.trim () !== '') {
        const newOption = {value: inputValue, label: inputValue};
        setSelectedOptions ([...selectedOptions, newOption]);
        setInputValue ('');
        setFilteredOptions ([]);
      }
    } else if (event.key === 'Backspace' && inputValue.trim () === '') {
      const newSelectedOptions = selectedOptions.slice (
        0,
        selectedOptions.length - 1
      );
      setSelectedOptions (newSelectedOptions);
    }
  };

  const handleRemoveOption = removedOption => {
    setSelectedOptions (
      selectedOptions.filter (option => option.value !== removedOption.value)
    );
  };

  const filterOptions = searchValue => {
    if (searchValue.trim () === '') {
      setFilteredOptions ([]);
      return;
    }

    const searchWords = searchValue.trim ().split (' ');
    const filtered = defaultOptions.filter (option =>
      searchWords.every (word =>
        option.label.toLowerCase ().includes (word.toLowerCase ())
      )
    );

    setFilteredOptions (filtered);
  };

  const defaultOptions = [
    {value: 'payment', label: 'Payment Processing Fee'},
    {value: 'payrollTax', label: 'Payroll Tax'},
    {value: 'bonus', label: 'Payroll Bonus'},
    {value: 'payrollgst', label: 'Payroll GST'},
    {value: 'gst', label: 'GST Custom Fee'},
    {value: 'income tax', label: 'Income Tax%'},
    {value: 'sum', label: 'Sum'},

  ];

  return (
    <div className="p-4 space-y-2">
      <div className="border flex space-x-2">
        {selectedOptions.map (option => (
          <div
            key={option.value}
            className={`px-2 my-2 py-2 mx-2 ${defaultOptions.some (item => item.value === option.value) ? 'bg-gray-200 text-gray-800 rounded-md cursor-pointer' : 'text-gray-800 cursor-pointer'}`}
            onClick={() =>
              defaultOptions.some (item => item.value === option.value) &&
              handleRemoveOption (option)}
          >
            {option.label}{' '}
            {defaultOptions.some (item => item.value === option.value) &&
              <span
                className="text-red-500 font-bold"
                onClick={() => handleRemoveOption (option)}
              >
                &#10006;
              </span>}
          </div>
        ))}
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={e => handleInputChange (e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add new tag"
          className="flex-grow px-2 py-1 outline-none"
        />
      </div>
      <div className="flex-col border-2 border-black">
        {filteredOptions.map (option => (
          <div
            key={option.value}
            className={`px-2 py-1 ${defaultOptions.some (item => item.value === option.value) ? 'bg-gray-200 text-gray-800 mx-2 border-black w-max my-2 border cursor-pointer' : 'cursor-pointer'}`}
            onClick={() => {
              setSelectedOptions ([...selectedOptions, option]);
              setInputValue ('');
              setFilteredOptions ([]);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomMulti;
