import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
interface DiscardChangesDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  handleDiscard: () => void;
}
const DiscardChangesDialog: React.FC<DiscardChangesDialogProps> = ({
  isOpen,
  handleClose,
  handleDiscard,
}) => {
  return (
    <div>
      <Dialog open={isOpen}>
        <DialogTitle>Discard changes?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you go back now, all your changes will not be taken into account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button onClick={handleDiscard} color="primary">
            DISCARD
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DiscardChangesDialog;
