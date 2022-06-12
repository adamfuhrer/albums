import React from "react";

interface GridProps {
  columns: number;
}

export const Grid: React.FC<GridProps> = ({ children, columns }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(auto-fill, 200px)`,
      gridGap: 30,
      justifyContent: "center"
    }}
  >
    {children}
  </div>
);
