import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
    const elRef = useRef(null); // A ref is a container to give yourself back the same thing every time
    if (!elRef.current) {
        elRef.current = document.createElement('div')
    }
    useEffect(() => {
        const modalRoot = document.getElementById("modal");
        modalRoot.appendChild(elRef.current);
        return () => modalRoot.removeChild(elRef.current);
        // Anything you return in an effect is run when the component will be unmounted from the DOM.
    }, [])

    return createPortal(<div>{children}</div>, elRef.current);
}

export default Modal;