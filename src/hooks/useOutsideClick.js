import { useEffect, useRef } from "react";

// listenCapturing is a boolean that determines whether the event bubbles down or up in the DOM tree
// by default event listeners are added to the bubbling phase (listenCapturing = false) and the event bubbles up from the target element to the root element
// in our case it means that the event will bubble up from the target element to the document -> then 
// if modal is closed and we click on the opening button, the modal will be opened, but the event will bubble up to the document and close the modal immediately
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  // we should use document.addEventListener inside useEffect to avoid memory leaks and multiple event listeners because it is a side effect
  useEffect(
    function () {
      function handleClick(e) {
        // here ref.current is the modal window which we want to close when clicking outside
        // e.target is the element we clicked on
        // if the element we clicked on is not inside the modal window, then we should close the modal
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
