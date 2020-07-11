import React, { useRef } from "react";
/** @jsx jsx */
import { jsx, Flex, Close, Text } from "theme-ui";
import { motion, Variants, Transition } from "framer-motion";
import useOnClickOutside from "common/useOnClickOutside";

const spring: Transition = {
  type: "spring",
  damping: 50,
  stiffness: 600,
};

const backdrop: Variants = {
  open: {
    opacity: 0.8,
    pointerEvents: "unset",
  },
  closed: {
    opacity: 0,
    transitionEnd: {
      pointerEvents: "none",
    },
  },
};

interface DrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  title?: string;
}

const Drawer = ({ isOpen, setIsOpen, children, title }: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(() => setIsOpen(false), [drawerRef]);

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
          zIndex: 99,
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
          minHeight: (theme) => [
            `calc(100vh - ${2 * theme.space[3]})`,
            `calc(100vh - ${2 * theme.space[4]})`,
          ],
          width: "25rem",
          maxWidth: "67vw",
          backgroundColor: "muted",
          overflowY: "auto",
          zIndex: 100,
        }}
        initial={false}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={spring}
      >
        <Flex sx={{ px: 3, pt: 3, alignItems: "center" }}>
          <Text sx={{ fontSize: 3, fontWeight: "bold" }}>{title}</Text>
          <Close onClick={() => setIsOpen(false)} ml="auto" />
        </Flex>
        {children}
      </motion.div>
    </React.Fragment>
  );
};

export default Drawer;
