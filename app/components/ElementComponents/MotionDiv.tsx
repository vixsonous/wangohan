'use client';

import React, { memo, useRef } from "react";
import {motion, useInView} from 'framer-motion';

export default memo(function MotionDiv({children}: {children: React.ReactElement}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: true});
  return (
    <motion.div ref={ref} initial={{opacity: 0, y: 50}} animate={{opacity: isInView ? 1 : 0, y: isInView ? 0: 50}}>
      {children}
    </motion.div>
  )
});