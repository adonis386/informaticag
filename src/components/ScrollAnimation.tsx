import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  delay?: number;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
