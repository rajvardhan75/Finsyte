"use client";

import { Link } from "react-router-dom";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useVelocity,
  useMotionValue,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import AboutUs from "../components/AboutUs";
import api from "../services/api";
import {
  ArrowRight,
  Play,
  Check,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Brain,
  BarChart3,
  Wallet,
  Target,
  Users,
  Star,
  ChevronDown,
  Globe,
  Smartphone,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Award,
  Clock,
  DollarSign,
  ZapIcon,
} from "lucide-react";
// import { Link } from "react-router-dom";

// Enhanced animation variants
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 30, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
    },
  },
};

const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "backOut",
      type: "spring",
      stiffness: 200,
    },
  },
};

const rotateIn = {
  initial: { opacity: 0, rotate: -180, scale: 0 },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "backOut",
      type: "spring",
    },
  },
};

// Particle system hook
const useParticles = (count = 50) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: ["purple", "blue", "pink", "cyan"][Math.floor(Math.random() * 4)],
    }));
    setParticles(newParticles);
  }, [count]);

  return particles;
};

// Enhanced Mobile Navigation Hook
const useMobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = useMemo(
    () => [
      { id: "hero", label: "Home", icon: Rocket },
      { id: "features", label: "Features", icon: Zap },
      { id: "testimonials", label: "Testimonials", icon: Users },
      { id: "cta", label: "Get Started", icon: Target },
    ],
    []
  );

  const navigateToSection = useCallback(
    (index) => {
      const sectionId = sections[index]?.id;
      if (sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      setCurrentSection(index);
      setIsOpen(false);
    },
    [sections]
  );

  return {
    isOpen,
    setIsOpen,
    currentSection,
    setCurrentSection,
    sections,
    navigateToSection,
  };
};

// Enhanced Swipe Detection Hook
const useSwipeDetection = (
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown
) => {
  const handlePan = useCallback(
    (event, info) => {
      const { offset, velocity } = info;
      const swipeThreshold = 30;
      const velocityThreshold = 300;

      requestAnimationFrame(() => {
        if (Math.abs(offset.x) > Math.abs(offset.y)) {
          if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
            onSwipeRight?.();
          } else if (
            offset.x < -swipeThreshold ||
            velocity.x < -velocityThreshold
          ) {
            onSwipeLeft?.();
          }
        } else {
          if (offset.y > swipeThreshold || velocity.y > velocityThreshold) {
            onSwipeDown?.();
          } else if (
            offset.y < -swipeThreshold ||
            velocity.y < -velocityThreshold
          ) {
            onSwipeUp?.();
          }
        }
      });
    },
    [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]
  );

  return { handlePan };
};

// Enhanced Floating Particles Component
const FloatingParticles = React.memo(() => {
  const particles = useParticles(30);

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-1 h-1 bg-${particle.color}-400 rounded-full`}
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: particle.opacity,
          }}
          animate={{
            x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 100,
            y: particle.y + Math.cos(Date.now() * 0.001 + particle.id) * 100,
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
          }}
          transition={{
            duration: 10 + particle.id * 0.1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  );
});

FloatingParticles.displayName = "FloatingParticles";

// Enhanced Mobile Menu Component
const MobileMenu = React.memo(
  ({ isOpen, setIsOpen, sections, currentSection, navigateToSection }) => {
    return (
      <>
        <motion.button
          className="md:hidden relative z-50 p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/95 backdrop-blur-lg z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex flex-col items-center justify-center h-full space-y-8"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                exit="initial"
              >
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    className={`flex items-center space-x-4 text-2xl font-semibold transition-all duration-300 ${
                      currentSection === index
                        ? "text-purple-400 scale-110"
                        : "text-white hover:text-purple-400"
                    }`}
                    onClick={() => navigateToSection(index)}
                    variants={staggerItem}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                  >
                    <motion.div
                      animate={{ rotate: currentSection === index ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <section.icon className="w-6 h-6" />
                    </motion.div>
                    <span>{section.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

MobileMenu.displayName = "MobileMenu";

// Enhanced Swipeable Card Component
const SwipeableCard = React.memo(
  ({ children, onSwipeLeft, onSwipeRight, index }) => {
    const dragX = useMotionValue(0);
    const controls = useAnimation();

    const handleDragEnd = useCallback(
      async (event, info) => {
        const threshold = 50;
        if (info.offset.x > threshold) {
          await controls.start({ x: 300, opacity: 0 });
          onSwipeRight?.(index);
          controls.set({ x: 0, opacity: 1 });
        } else if (info.offset.x < -threshold) {
          await controls.start({ x: -300, opacity: 0 });
          onSwipeLeft?.(index);
          controls.set({ x: 0, opacity: 1 });
        } else {
          controls.start({ x: 0 });
        }
      },
      [onSwipeLeft, onSwipeRight, index, controls]
    );

    return (
      <motion.div
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileDrag={{
          scale: 1.05,
          rotate: dragX.get() * 0.1,
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="cursor-grab active:cursor-grabbing"
      >
        {children}
      </motion.div>
    );
  }
);

SwipeableCard.displayName = "SwipeableCard";

// Enhanced Touch Feedback Component
const TouchFeedback = React.memo(
  ({ children, haptic = false, variant = "default" }) => {
    const handleTouch = useCallback(() => {
      if (haptic && "vibrate" in navigator) {
        navigator.vibrate(10);
      }
    }, [haptic]);

    const variants = {
      default: { scale: 0.98 },
      bounce: { scale: 0.95, y: 2 },
      pulse: { scale: [1, 1.05, 1] },
      rotate: { scale: 0.98, rotate: 5 },
    };

    return (
      <motion.div
        whileTap={variants[variant]}
        whileHover={{ scale: 1.02 }}
        onTouchStart={handleTouch}
        className="touch-manipulation"
        transition={{ duration: 0.15, type: "spring" }}
      >
        {children}
      </motion.div>
    );
  }
);

TouchFeedback.displayName = "TouchFeedback";

// Enhanced Section Navigation Dots
const SectionDots = React.memo(
  ({ sections, currentSection, navigateToSection }) => {
    return (
      <motion.div
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col space-y-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            className={`relative group ${
              currentSection === index
                ? "w-4 h-4 bg-purple-500 border-2 border-purple-400"
                : "w-3 h-3 bg-transparent border-2 border-gray-500 hover:border-purple-400"
            } rounded-full transition-all duration-300`}
            onClick={() => navigateToSection(index)}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0.2, type: "spring" }}
            title={section.label}
          >
            <motion.div
              className="absolute inset-0 bg-purple-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: currentSection === index ? 1 : 0 }}
              transition={{ duration: 0.3, type: "spring" }}
            />
            <motion.div
              className="absolute -left-16 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              initial={{ x: 10 }}
              whileHover={{ x: 0 }}
            >
              {section.label}
            </motion.div>
          </motion.button>
        ))}
      </motion.div>
    );
  }
);

SectionDots.displayName = "SectionDots";

// Enhanced Animated Section
const AnimatedSection = React.memo(
  ({ children, className = "", delay = 0, variant = "fadeUp" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
      once: true,
      margin: "-50px",
      amount: 0.2,
    });

    const variants = {
      fadeUp: {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
      },
      fadeLeft: slideInLeft,
      fadeRight: slideInRight,
      scale: scaleIn,
      rotate: rotateIn,
    };

    return (
      <motion.div
        ref={ref}
        variants={variants[variant]}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedSection.displayName = "AnimatedSection";

// Enhanced Floating Card
const FloatingCard = React.memo(({ children, delay = 0, index = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.8, rotateX: 45 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
            }
          : {
              opacity: 0,
              y: 80,
              scale: 0.8,
              rotateX: 45,
            }
      }
      transition={{
        duration: 0.8,
        delay: delay + index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -15,
        scale: 1.05,
        rotateY: 5,
        boxShadow: "0 25px 50px rgba(139, 92, 246, 0.3)",
        transition: { duration: 0.3, type: "spring" },
      }}
      className="will-change-transform perspective-1000"
    >
      {children}
    </motion.div>
  );
});

FloatingCard.displayName = "FloatingCard";

// Enhanced Scroll Progress
const ScrollProgress = React.memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-50 will-change-transform"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      <motion.div
        className="fixed top-1 left-0 right-0 h-0.5 bg-white/20 z-50 will-change-transform"
        style={{
          scaleX: useTransform(scrollYProgress, [0, 1], [0, 1]),
          transformOrigin: "0%",
        }}
      />
    </>
  );
});

ScrollProgress.displayName = "ScrollProgress";

// Enhanced Parallax Text
const ParallaxText = React.memo(({ children, speed = 0.5, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`${className} will-change-transform`}
    >
      {children}
    </motion.div>
  );
});

ParallaxText.displayName = "ParallaxText";

// Enhanced Staggered Container
const StaggeredContainer = React.memo(
  ({ children, className = "", variant = "default" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const variants = {
      default: staggerContainer,
      wave: {
        animate: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      },
      spiral: {
        animate: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
          },
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={variants[variant]}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }
);

StaggeredContainer.displayName = "StaggeredContainer";

// New Animated Counter Component
const AnimatedCounter = React.memo(({ value, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const numericValue = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
    let startTime = null;

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );

      setCount(Math.floor(numericValue * progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  const displayValue = value.replace(/[0-9.]+/, count.toString());

  return (
    <motion.span
      ref={ref}
      initial={{ scale: 0 }}
      animate={isInView ? { scale: 1 } : { scale: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      {displayValue}
    </motion.span>
  );
});

AnimatedCounter.displayName = "AnimatedCounter";

// New Morphing Shape Component
const MorphingShape = React.memo(({ className = "" }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        borderRadius: [
          "60% 40% 30% 70%",
          "30% 60% 70% 40%",
          "70% 30% 40% 60%",
          "40% 70% 60% 30%",
          "60% 40% 30% 70%",
        ],
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 1.1, 0.9, 1.05, 1],
      }}
      transition={{
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  );
});

MorphingShape.displayName = "MorphingShape";

// Main App Component
function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  // Mobile navigation
  const {
    isOpen,
    setIsOpen,
    currentSection,
    setCurrentSection,
    sections,
    navigateToSection,
  } = useMobileNavigation();

  // Enhanced parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.2], [0, -2]);

  // Enhanced spring animations
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 300,
    damping: 40,
  });
  const backgroundBlur = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    [0, 0, 3]
  );
  const backgroundScale = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    [1, 1, 1.02]
  );

  // Enhanced swipe detection
  const { handlePan } = useSwipeDetection(
    useCallback(() => {
      const nextSection = Math.min(currentSection + 1, sections.length - 1);
      if (nextSection !== currentSection) {
        navigateToSection(nextSection);
      }
    }, [currentSection, sections.length, navigateToSection]),
    useCallback(() => {
      const prevSection = Math.max(currentSection - 1, 0);
      if (prevSection !== currentSection) {
        navigateToSection(prevSection);
      }
    }, [currentSection, navigateToSection]),
    useCallback(() => {
      const nextSection = Math.min(currentSection + 1, sections.length - 1);
      if (nextSection !== currentSection) {
        navigateToSection(nextSection);
      }
    }, [currentSection, sections.length, navigateToSection]),
    useCallback(() => {
      const prevSection = Math.max(currentSection - 1, 0);
      if (prevSection !== currentSection) {
        navigateToSection(prevSection);
      }
    }, [currentSection, navigateToSection])
  );

  // Enhanced scroll tracking
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + window.innerHeight / 2;
          const featuresSection = document.getElementById("features");
          const testimonialsSection = document.getElementById("testimonials");
          const ctaSection = document.getElementById("cta");

          if (ctaSection && scrollPosition >= ctaSection.offsetTop) {
            setCurrentSection(3);
          } else if (
            testimonialsSection &&
            scrollPosition >= testimonialsSection.offsetTop
          ) {
            setCurrentSection(2);
          } else if (
            featuresSection &&
            scrollPosition >= featuresSection.offsetTop
          ) {
            setCurrentSection(1);
          } else {
            setCurrentSection(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setCurrentSection]);

  // Enhanced mouse tracking
  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToFeatures = useCallback(() => {
    document.getElementById("features")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  // Enhanced background style
  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `
        radial-gradient(circle at ${mousePosition.x}px ${
        mousePosition.y
      }px, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
        radial-gradient(circle at ${mousePosition.x + 100}px ${
        mousePosition.y + 100
      }px, rgba(59, 130, 246, 0.2) 0%, transparent 50%)
      `,
      backgroundSize: "100px 100px, 150px 150px",
    }),
    [mousePosition.x, mousePosition.y]
  );

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-hidden relative"
      onPan={handlePan}
      style={{ touchAction: "pan-y" }}
    >
      <ScrollProgress />
      <SectionDots
        sections={sections}
        currentSection={currentSection}
        navigateToSection={navigateToSection}
      />
      <FloatingParticles />

      {/* Enhanced Animated Background */}
      <motion.div
        className="fixed inset-0 z-0 will-change-transform"
        style={{
          y: backgroundY,
          filter: `blur(${backgroundBlur}px)`,
          scale: backgroundScale,
        }}
      >
        {/* Enhanced Morphing Gradient Orbs */}
        <MorphingShape className="top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl" />
        <MorphingShape className="bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl" />
        <MorphingShape className="top-3/4 left-3/4 w-64 h-64 bg-gradient-to-r from-green-600/15 to-emerald-600/15 blur-2xl" />

        {/* Enhanced Interactive Grid */}
        <motion.div
          className="absolute inset-0 opacity-30 will-change-transform"
          style={backgroundStyle}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px, 50px 50px, 50px 50px",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Enhanced Navigation */}
      <motion.nav
        className="relative z-50 flex items-center justify-between p-6 lg:px-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <TouchFeedback variant="rotate">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center relative overflow-hidden"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <TrendingUp className="w-6 h-6 text-white relative z-10" />
            </motion.div>
            <motion.span
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Finsyte
            </motion.span>
          </motion.div>
        </TouchFeedback>

        {/* Enhanced Desktop Navigation */}
        <StaggeredContainer
          className="hidden md:flex items-center space-x-10"
          variant="wave"
        >
          {["Features", "Testimonials", "About"].map((item, index) => (
            <TouchFeedback key={item} variant="bounce">
              <motion.a
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-all duration-300 relative group text-lg font-medium"
                whileHover={{ y: -2 }}
              >
                {item}
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  whileHover={{ width: "100%", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg -z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            </TouchFeedback>
          ))}
          <TouchFeedback variant="rotate">
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -8,
                borderColor: "rgba(139, 92, 246, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-12 py-6 text-xl font-bold transition-all duration-300 bg-transparent backdrop-blur-sm relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      {/* <Rocket className="mr-4 w-8 h-8" /> */}
                    </motion.div>
                    Sign In
                  </span>
                </Button>
              </Link>
            </motion.div>
          </TouchFeedback>
        </StaggeredContainer>

        <MobileMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          sections={sections}
          currentSection={currentSection}
          navigateToSection={navigateToSection}
        />
      </motion.nav>

      {/* Enhanced Hero Section */}
      <motion.div
        id="hero"
        ref={heroRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pb-20 will-change-transform"
        style={{
          y: heroTextY,
          scale: heroScale,
          opacity: heroOpacity,
          rotate: heroRotate,
        }}
      >
        <div className="flex flex-col items-center max-w-6xl mx-auto">
          {/* Enhanced Hero Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
          >
            <TouchFeedback variant="pulse">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <Badge className="mb-10 bg-gradient-to-r from-purple-500/30 to-blue-500/30 border-2 border-purple-500/50 text-purple-200 hover:from-purple-500/40 hover:to-blue-500/40 transition-all duration-300 px-6 py-3 text-lg font-semibold backdrop-blur-sm">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-5 h-5 mr-3" />
                  </motion.div>
                  AI-Powered Finance Platform
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </Badge>
              </motion.div>
            </TouchFeedback>
          </motion.div>

          {/* Enhanced Main Heading */}
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              className="block mb-4"
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 200%" }}
              >
                Welcome to
              </motion.span>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-purple-400 via-pink-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent relative"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
              whileHover={{
                scale: 1.05,
                rotate: 1,
                transition: { duration: 0.3 },
              }}
              style={{ backgroundSize: "300% 300%" }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              >
                Finsyte!
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-xl -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </div>

          {/* Enhanced Description */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-5xl leading-relaxed"
          >
            <motion.span
              className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-semibold block mb-2"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Automate. Analyze. Ascend.
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Your all-in-one AI-powered personal finance navigator.
            </motion.span>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <StaggeredContainer
            className="flex flex-col sm:flex-row gap-6 mb-20"
            variant="wave"
          >
            <TouchFeedback haptic variant="bounce">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, type: "spring" }}
              >
                <Link to="/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-bold shadow-2xl shadow-purple-500/30 transition-all duration-300 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                    <span className="relative z-10 flex items-center">
                      Get Started Free
                      <motion.div
                        animate={{ x: [0, 8, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <ArrowRight className="ml-4 w-8 h-8" />
                      </motion.div>
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </TouchFeedback>
            <TouchFeedback variant="rotate">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  borderColor: "rgba(139, 92, 246, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, type: "spring" }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-12 py-6 text-xl font-bold transition-all duration-300 bg-transparent backdrop-blur-sm relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Play className="mr-3 w-6 h-6" />
                    </motion.div>
                    Watch Demo
                  </span>
                </Button>
              </motion.div>
            </TouchFeedback>
          </StaggeredContainer>

          {/* Enhanced Feature Highlights */}
          <StaggeredContainer
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mb-24"
            variant="spiral"
          >
            {[
              {
                icon: Check,
                text: "Free 30-day trial",
                color: "green",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: ZapIcon,
                text: "No credit card required",
                color: "blue",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Shield,
                text: "Bank-level security",
                color: "purple",
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((item, index) => (
              <TouchFeedback key={index} variant="pulse">
                <motion.div
                  className="flex items-center justify-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-gray-800/60 to-gray-900/60 border border-gray-700/50 backdrop-blur-lg relative overflow-hidden group"
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    transition: { duration: 0.3 },
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${
                        item.gradient.split(" ")[1]
                      }, ${item.gradient.split(" ")[3]})`,
                    }}
                  />
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center relative`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-2xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.5,
                      }}
                    />
                  </motion.div>
                  <span className="text-xl text-gray-200 font-semibold group-hover:text-white transition-colors duration-300">
                    {item.text}
                  </span>
                </motion.div>
              </TouchFeedback>
            ))}
          </StaggeredContainer>

          {/* Enhanced Stats Section */}
          <StaggeredContainer
            className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mb-32"
            variant="wave"
          >
            {[
              {
                value: "50K+",
                label: "Active Users",
                gradient: "from-purple-400 to-blue-400",
                icon: Users,
              },
              {
                value: "$2.5B+",
                label: "Managed Assets",
                gradient: "from-green-400 to-emerald-400",
                icon: DollarSign,
              },
              {
                value: "99.9%",
                label: "Uptime",
                gradient: "from-yellow-400 to-orange-400",
                icon: Clock,
              },
              {
                value: "4.9★",
                label: "User Rating",
                gradient: "from-pink-400 to-red-400",
                icon: Award,
              },
            ].map((stat, index) => (
              <TouchFeedback key={index} variant="bounce">
                <motion.div
                  className="text-center group cursor-pointer"
                  whileHover={{
                    scale: 1.1,
                    y: -10,
                    transition: { duration: 0.3, type: "spring" },
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1.8 + index * 0.1,
                    duration: 0.6,
                    type: "spring",
                  }}
                >
                  <motion.div className="mb-4 flex justify-center">
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <AnimatedCounter value={stat.value} duration={2} />
                  </motion.div>
                  <div className="text-gray-400 text-lg font-medium group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              </TouchFeedback>
            ))}
          </StaggeredContainer>
        </div>

        {/* Enhanced Scroll Indicator */}
        <TouchFeedback variant="bounce">
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer group"
            animate={{
              y: [0, 15, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            onClick={scrollToFeatures}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <motion.div
              className="w-16 h-16 border-2 border-gray-400 rounded-full flex items-center justify-center group-hover:border-purple-400 transition-colors duration-300"
              whileHover={{ borderColor: "#8b5cf6" }}
            >
              <ChevronDown className="w-8 h-8 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
            </motion.div>
            <motion.div
              className="absolute inset-0 border-2 border-purple-400 rounded-full opacity-0 group-hover:opacity-100"
              animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </TouchFeedback>
      </motion.div>

      {/* Enhanced Features Section */}
      <section
        id="features"
        className="relative z-10 py-32 px-6 lg:px-12 mt-20"
      >
        <AnimatedSection
          className="text-center mb-20"
          delay={0.2}
          variant="scale"
        >
          <TouchFeedback variant="pulse">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Badge className="mb-8 bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-2 border-blue-500/50 text-blue-200 px-6 py-3 text-lg font-semibold backdrop-blur-sm">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Brain className="w-5 h-5 mr-3" />
                </motion.div>
                Powerful Features
              </Badge>
            </motion.div>
          </TouchFeedback>

          <ParallaxText speed={0.2}>
            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              whileInView={{ scale: [0.9, 1.05, 1] }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Everything you need to
              <motion.span
                className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                style={{ backgroundSize: "200% 200%" }}
              >
                master your finances
              </motion.span>
            </motion.h2>
          </ParallaxText>

          <div className="flex items-center justify-center text-center">
            <motion.p
              className="text-2xl text-gray-400 max-w-4xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Harness the power of AI to transform your financial journey with
              intelligent insights and automated solutions.
            </motion.p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6.5xl mx-auto">
          {[
            {
              icon: Brain,
              title: "AI-Powered Insights",
              description:
                "Get personalized financial advice powered by advanced machine learning algorithms that learn from your spending patterns.",
              gradient: "from-purple-500 to-pink-500",
              color: "purple",
            },
            {
              icon: BarChart3,
              title: "Smart Analytics",
              description:
                "Visualize your spending patterns and investment performance with beautiful, interactive charts and real-time data.",
              gradient: "from-blue-500 to-cyan-500",
              color: "blue",
            },
            {
              icon: Wallet,
              title: "Expense Tracking",
              description:
                "Automatically categorize and track your expenses across all your accounts with intelligent transaction recognition.",
              gradient: "from-green-500 to-emerald-500",
              color: "green",
            },
            {
              icon: Target,
              title: "Goal Setting",
              description:
                "Set and track financial goals with AI-powered recommendations, milestones, and personalized strategies for success.",
              gradient: "from-orange-500 to-red-500",
              color: "orange",
            },
            {
              icon: Shield,
              title: "Security First",
              description:
                "Bank-level encryption and security protocols to keep your data safe with multi-factor authentication and fraud detection.",
              gradient: "from-indigo-500 to-purple-500",
              color: "indigo",
            },
            {
              icon: Smartphone,
              title: "Mobile Ready",
              description:
                "Access your finances anywhere with our responsive mobile-first design and native app experience across all devices.",
              gradient: "from-teal-500 to-blue-500",
              color: "teal",
            },
          ].map((feature, index) => (
            <SwipeableCard
              key={index}
              index={index}
              onSwipeLeft={() => console.log("Swiped left on card", index)}
              onSwipeRight={() => console.log("Swiped right on card", index)}
            >
              <FloatingCard delay={index * 0.1} index={index}>
                <TouchFeedback variant="bounce">
                  <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-2 border-gray-700/50 backdrop-blur-lg hover:border-purple-500/50 transition-all duration-500 h-full group relative overflow-hidden">
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardContent className="p-8 relative z-10">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 relative`}
                        whileHover={{
                          rotate: 360,
                          scale: 1.1,
                          boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                        }}
                        transition={{ duration: 0.6, type: "spring" }}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-2xl"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0, 0.6, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.3,
                          }}
                        />
                      </motion.div>
                      <motion.h3
                        className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-500"
                        whileHover={{ scale: 1.05 }}
                      >
                        {feature.title}
                      </motion.h3>
                      <motion.p
                        className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-500 text-lg"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {feature.description}
                      </motion.p>
                      <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </CardContent>
                  </Card>
                </TouchFeedback>
              </FloatingCard>
            </SwipeableCard>
          ))}
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section
        id="testimonials"
        className="relative z-10 py-40 px-6 lg:px-12 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm"
      >
        <AnimatedSection
          className="text-center mb-24"
          delay={0.2}
          variant="rotate"
        >
          <TouchFeedback variant="pulse">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ duration: 0.3 }}
            >
              <Badge className="mb-8 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-2 border-yellow-500/50 text-yellow-200 px-6 py-3 text-lg font-semibold backdrop-blur-sm">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Users className="w-5 h-5 mr-3" />
                </motion.div>
                What Our Users Say
              </Badge>
            </motion.div>
          </TouchFeedback>
          <ParallaxText speed={0.3}>
            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              whileInView={{ rotateY: [0, 5, 0] }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              Trusted by thousands of
              <motion.span
                className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                style={{ backgroundSize: "200% 200%" }}
              >
                financial enthusiasts
              </motion.span>
            </motion.h2>
          </ParallaxText>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-8xl mx-auto ">
          {[
            {
              name: "Sarah Johnson",
              role: "Financial Advisor",
              content:
                "Finsyte has revolutionized how I manage my clients' portfolios. The AI insights are incredibly accurate and have helped me make better investment decisions.",
              rating: 5,
              avatar: "👩‍💼",
              company: "Goldman Sachs",
            },
            {
              name: "Michael Chen",
              role: "Entrepreneur",
              content:
                "The automated expense tracking saved me hours every week. I can focus on growing my business instead of managing spreadsheets. Absolutely game-changing!",
              rating: 5,
              avatar: "👨‍💻",
              company: "TechStart Inc.",
            },
            {
              name: "Emily Rodriguez",
              role: "Software Engineer",
              content:
                "Finally, a finance app that understands my needs. The goal tracking feature is a game-changer for reaching my financial milestones. Love the clean interface!",
              rating: 5,
              avatar: "👩‍💻",
              company: "Meta",
            },
          ].map((testimonial, index) => (
            <SwipeableCard
              key={index}
              index={index}
              onSwipeLeft={() =>
                console.log("Swiped left on testimonial", index)
              }
              onSwipeRight={() =>
                console.log("Swiped right on testimonial", index)
              }
            >
              <FloatingCard delay={index * 0.15} index={index}>
                <TouchFeedback variant="rotate">
                  <Card className=" min-h-[350px] bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-2 border-gray-700/50 backdrop-blur-lg hover:border-yellow-500/50 transition-all duration-500 h-full group relative overflow-hidden">
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardContent className="p-8 relative z-10">
                      <div className="flex items-center mb-6">
                        <motion.div
                          className="text-4xl mr-4"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {testimonial.avatar}
                        </motion.div>
                        <div>
                          <motion.h4
                            className="font-bold text-white text-lg group-hover:text-yellow-300 transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                          >
                            {testimonial.name}
                          </motion.h4>
                          <p className="text-gray-400 text-sm">
                            {testimonial.role}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: index * 0.2 + i * 0.1,
                              duration: 0.3,
                            }}
                            whileHover={{ scale: 1.3, rotate: 360 }}
                          >
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                      <motion.p
                        className="text-gray-300 mb-6 leading-relaxed group-hover:text-white transition-colors duration-500 text-lg italic"
                        initial={{ opacity: 0.9 }}
                        whileHover={{ opacity: 1 }}
                      >
                        "{testimonial.content}"
                      </motion.p>
                      {/* <motion.div className="min-h-350px absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" /> */}
                    </CardContent>
                  </Card>
                </TouchFeedback>
              </FloatingCard>
            </SwipeableCard>
          ))}
        </div>
      </section>
      <section
        id="about"
        className="relative z-10 py-32 px-6 lg:px-12 bg-black"
      >
        <AboutUs />
      </section>

      {/* Enhanced CTA Section */}
      <section id="cta" className="relative z-10 py-40 px-6 lg:px-12">
        <AnimatedSection
          className="text-center max-w-6xl mx-auto"
          delay={0.2}
          variant="scale"
        >
          <ParallaxText speed={0.2}>
            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-10 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              whileInView={{ scale: [0.9, 1.1, 1] }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              Ready to transform your
              <motion.span
                className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                style={{ backgroundSize: "200% 200%" }}
              >
                financial future?
              </motion.span>
            </motion.h2>
          </ParallaxText>
          
          <div className="flex items-center justify-center">
            <motion.p
              className="text-2xl text-gray-400 mb-16 leading-relaxed max-w-4xl text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Join thousands of users who have already taken control of their
              finances with Finsyte's AI-powered platform. Start your journey
              today!
            </motion.p>
          </div>

          <StaggeredContainer
            className="flex flex-col sm:flex-row gap-8 justify-center"
            variant="wave"
          >
            <TouchFeedback haptic variant="bounce">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  y: -8,
                  boxShadow: "0 25px 50px rgba(139, 92, 246, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-16 py-8 text-2xl font-bold shadow-2xl shadow-purple-500/40 transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <motion.div
                     // animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                     <Rocket className="mr-4 w-8 h-8 transform rotate-0" />
                    </motion.div>
                    Start Your Free Trial
                    <motion.div
                      animate={{ x: [0, 8, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <ArrowRight className="ml-4 w-8 h-8" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </TouchFeedback>
            <TouchFeedback variant="rotate">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  y: -8,
                  borderColor: "rgba(139, 92, 246, 1)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-3 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-120 py-20 text-2xl font-bold transition-all duration-300 bg-transparent backdrop-blur-sm relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <motion.div
                  //   animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      <Globe className="mr-4 w-8 h-8" />
                    </motion.div>
                    Learn More
                  </span>
                </Button>
              </motion.div>
            </TouchFeedback>
          </StaggeredContainer>
        </AnimatedSection>
      </section>

      {/* Enhanced Floating Elements */}
      {[
        {
          top: "15%",
          left: "8%",
          color: "purple",
          delay: 1000,
          size: "w-3 h-3",
        },
        {
          top: "35%",
          right: "15%",
          color: "blue",
          delay: 2000,
          size: "w-2 h-2",
        },
        {
          bottom: "45%",
          left: "15%",
          color: "pink",
          delay: 500,
          size: "w-4 h-4",
        },
        {
          bottom: "15%",
          right: "8%",
          color: "green",
          delay: 1500,
          size: "w-2 h-2",
        },
        { top: "60%", left: "5%", color: "cyan", delay: 3000, size: "w-3 h-3" },
        {
          top: "80%",
          right: "25%",
          color: "yellow",
          delay: 2500,
          size: "w-2 h-2",
        },
      ].map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} bg-${element.color}-500 rounded-full will-change-transform`}
          style={{
            top: element.top,
            left: element.left,
            right: element.right,
            bottom: element.bottom,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(index) * 20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + index * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.delay / 1000,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Enhanced Mobile Navigation Hints */}
      <AnimatePresence>
        <motion.div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 md:hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <motion.div
            className="flex items-center space-x-4 bg-gray-900/90 backdrop-blur-lg rounded-full px-6 py-3 border border-gray-700/50"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(139, 92, 246, 0.3)",
                "0 0 30px rgba(139, 92, 246, 0.5)",
                "0 0 20px rgba(139, 92, 246, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="flex items-center text-gray-300 text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="mx-2">Swipe to navigate</span>
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default App;
