import React from "react";

interface GridProps {
  columns: number;
}

export const Grid: React.FC<GridProps> = ({ children, columns }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridGap: 30,
      padding: 50,
    }}
  >
    {children}
  </div>
);
