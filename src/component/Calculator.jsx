import React, { useState, useEffect } from "react"; 

export default function Calculator() {
  // State for form inputs and result
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // useEffect to log result whenever it changes
  useEffect(() => {
    if (result !== null) {
      console.log('Calculation result:', result);
    }
  }, [result]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate inputs
    if (firstNumber === '' || secondNumber === '') {
      setError('Please enter both numbers');
      return;
    }
    
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    
    if (isNaN(num1) || isNaN(num2)) {
      setError('Please enter valid numbers');
      return;
    }
    
    // Perform calculation based on selected operation
    let calculationResult;
    switch (operation) {
      case 'add':
        calculationResult = num1 + num2;
        break;
      case 'subtract':
        calculationResult = num1 - num2;
        break;
      case 'multiply':
        calculationResult = num1 * num2;
        break;
      case 'divide':
        if (num2 === 0) {
          setError('Cannot divide by zero');
          return;
        }
        calculationResult = num1 / num2;
        break;
      default:
        calculationResult = 0;
    }
    
    // Set result (round to 4 decimal places to avoid floating point issues)
    setResult(Math.round(calculationResult * 10000) / 10000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-xl border border-blue-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-800 border-b-2 border-indigo-200 pb-4">Simple Calculator</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstNumber" className="block text-sm font-semibold text-indigo-700 mb-2">
                First Number
              </label>
              <input
                type="number"
                id="firstNumber"
                value={firstNumber}
                onChange={(e) => setFirstNumber(e.target.value)}
                className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none bg-white shadow-sm"
                placeholder="Enter first number"
              />
            </div>
            
            <div>
              <label htmlFor="secondNumber" className="block text-sm font-semibold text-indigo-700 mb-2">
                Second Number
              </label>
              <input
                type="number"
                id="secondNumber"
                value={secondNumber}
                onChange={(e) => setSecondNumber(e.target.value)}
                className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none bg-white shadow-sm"
                placeholder="Enter second number"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="operation" className="block text-sm font-semibold text-indigo-700 mb-2">
              Operation
            </label>
            <select
              id="operation"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none bg-white shadow-sm appearance-none cursor-pointer"
            >
              <option value="add">Add (+)</option>
              <option value="subtract">Subtract (−)</option>
              <option value="multiply">Multiply (×)</option>
              <option value="divide">Divide (÷)</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition duration-200 hover:scale-105"
          >
            Calculate
          </button>
        </form>
        
        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 font-medium rounded-lg border-l-4 border-red-500 shadow-sm">
            {error}
          </div>
        )}
        
        {result !== null && !error && (
          <div className="mt-8 p-6 bg-indigo-50 rounded-lg border-2 border-indigo-200 shadow-inner">
            <h3 className="font-medium text-indigo-700 text-center mb-2">Result:</h3>
            <p className="text-3xl font-bold text-indigo-900 text-center">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}