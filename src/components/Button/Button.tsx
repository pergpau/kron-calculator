import './Button.scss';

interface ButtonProps {
  symbol: string;
  handleButtonClick: (symbol: string) => void;
}

const Button = ({ symbol, handleButtonClick }: ButtonProps) => {
  return (
    <div className="button-symbol" onClick={() => handleButtonClick(symbol)}>
      {symbol}
    </div>
  );
};

export default Button;
