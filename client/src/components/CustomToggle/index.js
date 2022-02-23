import { useAccordionButton } from "react-bootstrap";

export const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey);
  return (
    <button
      className="btn btn-icon rounded-circle waves-effect btn-flat-success"
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
};
