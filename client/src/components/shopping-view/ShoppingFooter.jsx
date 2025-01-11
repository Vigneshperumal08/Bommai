import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"; // Importing LinkedIn icon

const ShoppingFooter = () => {
  return (
    <motion.footer
      className="bg-[#99b8f1] text-[#000000] py-8 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand Info */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <motion.h2
              className="text-4xl font-serif text-[#000000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Bommaikaran
            </motion.h2>
            <motion.p
              className="text-sm mt-2 text-[#000000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              "Your trusted online shopping destination"  
              <br /> Email: bbommaikaran@gmail.com  
              <br /> Phone: 7530073241
            </motion.p>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-8 mb-6 md:mb-0">
            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.2 }}
            >
              <Instagram className="w-8 h-8 text-[#000000] hover:text-[#e4405f] transition duration-300 ease-in-out" />
            </motion.a>
            {/* Facebook */}
            <motion.a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.2 }}
            >
              <Facebook className="w-8 h-8 text-[#000000] hover:text-[#bed3f1] transition duration-300 ease-in-out" />
            </motion.a>
            {/* Twitter */}
            <motion.a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.2 }}
            >
              <Twitter className="w-8 h-8 text-[#000000] hover:text-[#1da1f2] transition duration-300 ease-in-out" />
            </motion.a>
          </div>

          {/* Footer Creator */}
          <motion.div
            className="text-center md:text-right mt-6 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-sm text-[#000000]">
              <span className="font-semibold">App Created By:</span> Zoding Technologies
            </p>
            <div className="flex justify-center gap-8 mt-2">
              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                whileHover={{ scale: 1.2 }}
              >
                <Linkedin className="w-4 h-4 text-[#000000] hover:text-[#0077b5] transition duration-300 ease-in-out" />
              </motion.a>
              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                whileHover={{ scale: 1.2 }}
              >
                <Instagram className="w-4 h-4 text-[#000000] hover:text-[#e4405f] transition duration-300 ease-in-out" />
              </motion.a>
              {/* Facebook */}
              <motion.a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ scale: 1.2 }}
              >
                <Facebook className="w-4 h-4 text-[#000000] hover:text-[#bed3f1] transition duration-300 ease-in-out" />
              </motion.a>
              {/* Twitter */}
              <motion.a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.2 }}
              >
                <Twitter className="w-4 h-4 text-[#000000] hover:text-[#1da1f2] transition duration-300 ease-in-out" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default ShoppingFooter;
