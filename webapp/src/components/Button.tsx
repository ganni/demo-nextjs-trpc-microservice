import React, { ReactNode } from 'react';
type Props = {
  children: ReactNode;
  color: 'red' | 'green' | 'blue';
};

const Button: React.FC<Props> = (props) => {
  return (
    <button className="rounded bg-red-500 px-4 py-1 text-white hover:bg-red-600">
      {props.children}
    </button>
  );
};

export default Button;
