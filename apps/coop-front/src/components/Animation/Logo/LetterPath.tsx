import { ForwardRefComponent, motion, SVGMotionProps } from "framer-motion";

type LetterPropsType = {
  children?: React.ReactNode;
  d: string;
  fill?: string;
} & SVGMotionProps<SVGPathElement>;

const LetterPath = ({
  d,
  fill = "black",
  children,
  ...etc
}: LetterPropsType) => {
  return (
    <>
      <motion.path d={d} {...etc} />
      {children}
    </>
  );
};
export default LetterPath;
