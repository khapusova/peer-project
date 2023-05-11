import { ModalContext } from '@providers';
import { useContext } from 'react';

const useModal = () => useContext(ModalContext);

export default useModal;
