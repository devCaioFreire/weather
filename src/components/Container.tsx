import { ReactNode } from "react";

interface IContainer {
  className?: string;
  children: ReactNode;
}

export const Container = ({ className, children }: IContainer) => {
  return (
    <div className={`bg-blur h-full shadow-md backdrop-blur-xl ${className}`}>
      {children}
    </div>
  )
}
