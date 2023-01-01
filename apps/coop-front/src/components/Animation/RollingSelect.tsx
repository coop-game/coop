import { motion } from "framer-motion";

const RollingSelect = () => {
  return (
    <motion.div
      animate={{ rotateX: 360 * 50 }}
      transition={{ duration: 1 }}
      style={{
        borderRadius: 10,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        height: 50,
        width: 150,
      }}
    />
  );
};
export default RollingSelect;
