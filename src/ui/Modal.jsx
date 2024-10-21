import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;


const ModalContext = createContext();

// Real magic happens here!

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  // Just return to the initial state
  const close = () => setOpenName("");

  // and this function will be the same as setOpenName function
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// <Modal.Open opens="cabin-form"> ... </Modal.Open>
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  // open(opensWindowName) is the same as setOpenName(opensWindowName passed as argument "opens")

  // about cloneElement: https://react.dev/reference/react/cloneElement
  // !!! Using cloneElement is uncommon and can lead to fragile code.
  // !!! It is better to use a function as a child or render prop.
  // lets you create a new React element using another element as a starting point.
  // It overrides the original element’s props with the props that you pass in.
  // Here we will create a clone of the children element and override onClick prop with open function
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

// <Modal.Window name="cabin-form"> ... </Modal.Window>
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  // we need ref to add to the modal window addEventListener to close the modal when clicking outside
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// Set them as properties of Modal
// They are connected with Modal component through context ModalContext
Modal.Open = Open;
Modal.Window = Window;

export default Modal;