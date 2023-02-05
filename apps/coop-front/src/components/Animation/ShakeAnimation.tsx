import { motion } from "framer-motion";

const ShakeAnimation = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
      transition={{
        ease: "easeInOut",
        duration: 1,
        repeatDelay: 1,
        repeat: Infinity,
      }}
    >
      {children}
    </motion.div>
  );
};
export default ShakeAnimation;
