

import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { uiCloseModal } from '../../store/slices/ui/uiSlice';

const customStyles_modal = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        //marginRight: '-50%',
        transform: 'translate(0%, -30%)',
        // index : '1000'
      },
  };

export const ModalForm = ({ children }) => {

  const { viewModal } = useSelector( state => state.ui )
  const dispatch = useDispatch();

  const closeModal = () => {
        dispatch( uiCloseModal() )
  }

  return (
      <Modal 
        isOpen={ viewModal }
        style={ customStyles_modal }
        onRequestClose={ closeModal }
        closeTimeoutMS={ 200 }
        className='modal'
        overlayClassName=' modal-fondo '
        ariaHideApp= { false }
      > 
          { children }
      </Modal>
  )
}