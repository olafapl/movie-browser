import React, { RefObject } from "react";
/** @jsx jsx */
import { jsx, Flex, Close } from "theme-ui";
import { motion, Variants, Transition } from "framer-motion";

const spring: Transition = {
  type: "spring",
  damping: 50,
  stiffness: 600
};

const backdrop: Variants = {
  open: {
    opacity: 0.8,
    pointerEvents: "unset"
  },
  closed: {
    opacity: 0,
    transitionEnd: {
      pointerEvents: "none"
    }
  }
};

interface DrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  drawerRef?: RefObject<HTMLDivElement>;
}

const Drawer = ({ isOpen, setIsOpen, children, drawerRef }: DrawerProps) => {
  return (
    <React.Fragment>
      <motion.div
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "background",
          zIndex: 99
        }}
        variants={backdrop}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        transition={spring}
      ></motion.div>
      <motion.div
        ref={drawerRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: [3, 4],
          right: 0,
          bottom: [3, 4],
          borderTopLeftRadius: 1,
          borderBottomLeftRadius: 1,
          minHeight: theme => [
            `calc(100vh - ${2 * theme.space[3]})`,
            `calc(100vh - ${2 * theme.space[4]})`
          ],
          width: "25rem",
          maxWidth: "67vw",
          backgroundColor: "muted",
          zIndex: 100
        }}
        initial={false}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={spring}
      >
        <Flex sx={{ px: 3, pt: 3, justifyContent: "flex-end" }}>
          <Close onClick={() => setIsOpen(false)} />
        </Flex>
        {children}
      </motion.div>
    </React.Fragment>
  );
};

export default Drawer;
