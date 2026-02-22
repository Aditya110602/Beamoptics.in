"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollAnimator from "./ScrollAnimator";

export default function SiteFrame({ children }) {
  return (
    <>
      <ScrollAnimator />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
