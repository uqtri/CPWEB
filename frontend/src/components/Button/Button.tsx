import { Link } from "react-router-dom";
import { BORDER_COLORS, TEXT_COLORS, BG_COLORS } from "../../constants/color";
type buttonProps = {
  label: string;
  color:
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "purple"
    | "primary"
    | "none"
    | "white";
  link: string;
  background:
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "purple"
    | "primary"
    | "none";
};
export default function Button({
  label,
  color,
  link,
  background,
}: buttonProps) {
  if (!background) background = "none";
  return (
    <Link to={link}>
      <button
        className={`py-3 w-full border cursor-pointer ${BORDER_COLORS[color]}  ${TEXT_COLORS[color]} ${BG_COLORS[background]} rounded-md text-center`}
      >
        {label}
      </button>
    </Link>
  );
}
