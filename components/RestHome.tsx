"use client";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import {
  FaCarSide,
  FaMapMarkedAlt,
  FaShieldAlt,
  FaClock,
  FaWallet,
  FaStar,
  FaRoute,
  FaHeadset,
  FaSmile,
} from "react-icons/fa";

export default function RestHome() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const featureCardVariants = {
    hover: { y: -10, scale: 1.05 },
    rest: { y: 0, scale: 1 },
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full text-left space-y-4 md:space-y-6 min-w-[320px] p-4 md:p-6 pt-9 sm:pt-24"
      >
        {/* Value Proposition Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
          className="py-12 space-y-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Revolutionizing Travel in Gujarat
          </h2>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={sectionVariants}
          >
            {[
              {
                icon: <FaShieldAlt />,
                title: "Safe & Secure",
                color: "bg-red-100",
              },
              {
                icon: <FaClock />,
                title: "24/7 Service",
                color: "bg-blue-100",
              },
              {
                icon: <FaWallet />,
                title: "Transparent Pricing",
                color: "bg-green-100",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={featureCardVariants}
                whileHover="hover"
                className={`p-6 rounded-xl ${item.color} flex flex-col items-center gap-4`}
              >
                <div className="text-4xl text-gray-700">{item.icon}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
        {/* Features Grid */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
          className="py-12 bg-gray-50 rounded-3xl"
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Sets Us Apart
            </h2>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={sectionVariants}
            >
              {[
                {
                  title: "Expert Chauffeurs",
                  content:
                    "Professional drivers with extensive local knowledge",
                  icon: <FaStar className="text-3xl text-yellow-500" />,
                },
                {
                  title: "Pan-Gujarat Coverage",
                  content: "Serving 100+ cities across the state",
                  icon: <FaRoute className="text-3xl text-blue-500" />,
                },
                {
                  title: "Luxury Fleet",
                  content: "Well-maintained, modern vehicles",
                  icon: <FaCarSide className="text-3xl text-green-500" />,
                },
              ].map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={featureCardVariants}
                  whileHover="hover"
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex gap-4 items-start">
                    <div className="p-3 rounded-full bg-opacity-20">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
        {/* How It Works Section */}
        <motion.section
          ref={ref}
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true }}
          className="py-12 relative overflow-hidden"
        >
          <motion.div
            style={{ y }}
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"
          />
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12">
              Seamless Booking Journey
            </h2>
            <motion.div
              className="space-y-12 relative"
              variants={sectionVariants}
            >
              {/* Timeline line */}
              <div className="absolute left-1/2 w-1 h-full bg-gray-200 rounded-full -translate-x-1/2" />

              {[
                { step: 1, title: "Choose Your Ride", icon: <FaCarSide /> },
                { step: 2, title: "Set Locations", icon: <FaMapMarkedAlt /> },
                { step: 3, title: "Confirm & Travel", icon: <FaShieldAlt /> },
              ].map((step, idx) => (
                <motion.div
                  key={step.step}
                  variants={featureCardVariants}
                  className="relative z-10 flex items-center justify-center gap-8 even:flex-row-reverse"
                >
                  <div className="w-1/2 p-4">
                    <h3 className="text-2xl font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {idx === 0 && "Select from our range of premium vehicles"}
                      {idx === 1 && "Enter your pickup and destination details"}
                      {idx === 2 && "Secure payment and instant confirmation"}
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
          className="py-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl"
        >
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <FaHeadset className="text-5xl mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl mb-8">
              Experience Gujarat like never before with our premium service
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto"
            >
              <FaSmile className="text-xl" />
              Start Your Journey
            </motion.button>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
}
