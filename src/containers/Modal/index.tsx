import { Transition } from '@headlessui/react';
import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  containerStyles?: string;
}

const Modal = ({ isOpen, containerStyles, children }: ModalProps) => {
  const modalRoot = global?.window?.document?.getElementById('__next');

  if (!modalRoot) return <></>;

  return createPortal(
    <Transition
      show={isOpen}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto">
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <div className={`relative z-40 bg-white shadow-lg ${containerStyles}`}>
          {children}
        </div>
      </div>
    </Transition>,
    modalRoot
  );
};

export default Modal;
