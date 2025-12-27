import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";

const GoToUpHeroSection = ({ scrollToTop }) => {
   return (
      <Button
         variant="dark"
         className="position-fixed bottom-0 end-0 mb-3 me-3"
         style={{ zIndex: 100 }}
         onClick={scrollToTop}
      >
         <FaArrowUp className="fs-4" />
      </Button>
   );
};

export default GoToUpHeroSection;
