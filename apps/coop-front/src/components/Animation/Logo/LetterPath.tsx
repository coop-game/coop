import { motion } from "framer-motion";

type LetterPropsType = {
  children?: React.ReactNode;
  d: string;
  fill?: string;
};

const LetterPath = ({ d, fill = "black", children }: LetterPropsType) => {
  return (
    <>
      <motion.path d={d} />
      {children}
    </>
  );
};
export default LetterPath;
