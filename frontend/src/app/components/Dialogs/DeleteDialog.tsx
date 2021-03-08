import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';

interface DeleteDialogProps {
  isOpen: boolean;
  object: string;
  customMessage?: string;
  handleCloseDelete: () => void;
  handleDelete: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  object,
  customMessage,
  handleCloseDelete,
  handleDelete,
}) => {
  return (
    <div>
      <Dialog open={isOpen}>
        <DialogTitle>
          <Typography component={'span'} variant="h2" style={{ fontSize: 16 }}>
            Delete {object} ?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontSize: 14 }}>
            {customMessage
              ? customMessage
              : `Deleting this ${object} permanently removes it.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="secondary">
            CANCEL
          </Button>
          <Button onClick={handleDelete} color="primary">
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteDialog;
