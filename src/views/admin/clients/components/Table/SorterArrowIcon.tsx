import { BsArrowDownUp } from "react-icons/bs";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

interface SorterArrowIconProps {
  sortState: string | boolean;
}

export function SorterArrowIcon({ sortState }: SorterArrowIconProps) {
  if (sortState === "asc") return <MdArrowDownward />;
  if (sortState === "desc") return <MdArrowUpward />;
  return <BsArrowDownUp />;
}
