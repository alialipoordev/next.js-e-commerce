import React, { ReactNode } from "react";

interface GridViewProps {
  children: ReactNode;
}

const GridView = ({ children }: GridViewProps) => {
  return (
    <div className="max-w-screen-xl m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {children}
    </div>
  );
};

export default GridView;
