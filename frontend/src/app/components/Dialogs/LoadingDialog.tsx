import React from 'react';
import logo from './../../../assets/logo_arcane_small.png';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import { modalStyle, StyleConstants } from 'styles/stylesConstant';



interface LoadingDialogProps {
  isOpen: boolean;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ isOpen }) => {
  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        disableAutoFocus
        open={isOpen}
      >
        <div style={modalStyle}>
          <div style={{ marginLeft: 40, marginTop: 45 }}>
            <img src={logo} height="45" alt="logo Arcane" />
            <div style={{ marginLeft: -25, marginTop: -75 }}>
              <CircularProgress size={105} style={StyleConstants.arcaneOrange} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoadingDialog;
