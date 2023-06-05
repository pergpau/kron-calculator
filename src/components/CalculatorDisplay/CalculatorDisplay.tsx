import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './CalculatorDisplay.scss';

interface CalculatorDisplayProps {}

const CalculatorDisplay = ({}: CalculatorDisplayProps) => {
  const [currentInput, setCurrentInput] = useState<string>('');
  const [result, setResult] = useState<number>(0);

  const operations = {
    '+': (a: number, b: number) => a + b,
    '-': (a: number, b: number) => a - b,
    '*': (a: number, b: number) => a * b,
    '/': (a: number, b: number) => a / b,
  };

  type OperatorType = '+' | '-' | '*' | '/';
  const operators: OperatorType[] = ['+', '-', '*', '/'];
  const digits = [...Array(10).keys()];

  const lastIsOperator = () => {
    if (operators.includes(currentInput.slice(-1) as OperatorType)) {
      return true;
    }
    return false;
  };

  const addToInput = (newInput: string) => {
    setCurrentInput(currentInput + newInput);
  };

  const handleDigitInput = (digit: string) => {
    addToInput(digit);
  };

  const handleOperatorInput = (operatorSymbol: string) => {
    if (currentInput !== '') {
      if (!lastIsOperator()) {
        addToInput(operatorSymbol);
      } else {
        setCurrentInput(currentInput.slice(0, -1) + operatorSymbol);
      }
    }
  };

  const handleCommaClick = () => {
    const lastCharacter = currentInput.charAt(currentInput.length - 1);
    if (!['.', ''].includes(lastCharacter) && !lastIsOperator()) {
      addToInput('.');
    }
  };

  const handleClearClick = () => {
    setCurrentInput('');
    setResult(0);
  };

  useEffect(() => {
    if (!lastIsOperator() && currentInput !== '') {
      const splitInput = currentInput.split(/([-+*\/])/);
      if (splitInput.length >= 3) {
        const firstValue = parseFloat(splitInput[0]);
        let accumulatedResult = firstValue;
        for (let i = 0; i < splitInput.length - 1; i += 2) {
          const secondValue = parseFloat(splitInput[i + 2]);
          const operator = splitInput[i + 1] as OperatorType;
          accumulatedResult = operations[operator](
            accumulatedResult,
            secondValue
          );
          setResult(accumulatedResult);
        }
      }
    }
  }, [currentInput]);

  return (
    <div className="calculator-display">
      <div className="calculator-display-main-view">
        <div className="calculator-display-input">{currentInput}</div>
        <div className="calculator-display-result">{result}</div>
      </div>
      <div className="calculator-display-digit-board">
        {digits.map((digit) => {
          return (
            <Button
              symbol={digit.toString()}
              handleButtonClick={handleDigitInput}
            />
          );
        })}
        <Button symbol={'.'} handleButtonClick={handleCommaClick} />
      </div>
      <div className="calculator-display-operators">
        {operators.map((digit) => {
          return (
            <Button
              symbol={digit.toString()}
              handleButtonClick={handleOperatorInput}
            />
          );
        })}
      </div>
      <div className="calculator-display-bottom-row">
        <Button
          symbol="Clear"
          handleButtonClick={() => handleClearClick()}
        ></Button>
      </div>
    </div>
  );
};

export default CalculatorDisplay;
