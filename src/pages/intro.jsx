import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = [
  "Hello",
  "\u0928\u092e\u0938\u094d\u0924\u0947",
  "Bonjour",
  "\u3053\u3093\u306b\u3061\u306f",
  "\u4f60\u597d",
  "\uc548\ub155\ud558\uc138\uc694",
  "Guten Tag",
];

export default function Intro({ onFinish }) {
  const NOIR = "#000000";
  const MIDNIGHT = "#122C4F";
  const PEARL = "#FBF9E4";
  const OCEAN = "#5B88B2";

  const [index, setIndex] = useState(0);
  const [showName, setShowName] = useState(false);
  const [slideDown, setSlideDown] = useState(false);

  useEffect(() => {
    if (showName) return;

    if (index < words.length - 1) {
      const t = setTimeout(() => setIndex(index + 1), 550);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setShowName(true), 700);
    return () => clearTimeout(t);
  }, [index, showName]);

  useEffect(() => {
    if (showName && !slideDown) {
      const t = setTimeout(() => setSlideDown(true), 700);
      return () => clearTimeout(t);
    }
  }, [showName, slideDown]);

  useEffect(() => {
    if (slideDown) {
      const t = setTimeout(() => onFinish?.(), 650);
      return () => clearTimeout(t);
    }
  }, [slideDown, onFinish]);

  return (
    <motion.div
      style={styles(NOIR, MIDNIGHT, OCEAN, PEARL).overlay}
      animate={slideDown ? { y: "100vh" } : { opacity: 1 }}
      transition={slideDown ? { duration: 0.6, ease: "easeInOut" } : { duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      <AnimatePresence mode="wait">
        {!showName && (
          <motion.div
            key={words[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={styles(NOIR, MIDNIGHT, OCEAN, PEARL).word}
          >
            {words[index]}
          </motion.div>
        )}

        {showName && (
          <motion.div
            key="morphing-text"
            initial={{
              opacity: 0,
              position: "fixed",
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              position: "fixed",
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
              opacity: 1,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              zIndex: 10000,
              color: PEARL,
            }}
          >
            <div style={{ position: "relative", display: "inline-block", paddingTop: "1.1rem" }}>
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: OCEAN,
                }}
              >
                I'm
              </span>

              <span
                style={{
                  fontSize: "clamp(4rem, 15vw, 12rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  fontStyle: "normal",
                  fontFamily: "\"Segoe UI\", Inter, Roboto, Arial, system-ui, sans-serif",
                  color: PEARL,
                  display: "inline-block",
                  lineHeight: "1.1",
                  textShadow: "0 8px 24px rgba(0,0,0,0.42)",
                }}
              >
                Varshitha
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const styles = (NOIR, MIDNIGHT, OCEAN, PEARL) => ({
  overlay: {
    position: "fixed",
    inset: 0,
    background: `radial-gradient(circle at 82% 16%, rgba(91,136,178,0.07), transparent 32%), ${NOIR}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  word: {
    fontSize: "clamp(2rem, 5vw, 4rem)",
    letterSpacing: "0.1em",
    color: PEARL,
    fontWeight: 400,
  },
});
