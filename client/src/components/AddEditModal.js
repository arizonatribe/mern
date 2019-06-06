import React from 'react';
import { createPortal } from 'react-dom';
import StudentForm from './StudentForm';
import usePortal from './usePortal';

function Portal({ id, children }) {
  const target = usePortal(id);
  return createPortal(children, target);
}

function AddEditModal(props) {
  return (
    <Portal id="modal-root">
      <StudentForm {...props} />
    </Portal>
  );
}

export default AddEditModal;
