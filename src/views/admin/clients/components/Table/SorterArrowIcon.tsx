import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { BsArrowDownUp } from "react-icons/bs";

interface SorterArrowIconProps {
  sortState: string | boolean;
}

const SorterArrowIcon = ({ sortState }: SorterArrowIconProps) => {
  if (sortState === "asc") return <MdArrowDownward className="ml-2 h-4 w-4" />;
  if (sortState === "desc") return <MdArrowUpward className="ml-2 h-4 w-4" />;
  return <BsArrowDownUp className="ml-2 h-4 w-4" />;
};

export default SorterArrowIcon;
