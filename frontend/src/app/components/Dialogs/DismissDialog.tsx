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

interface DismissDialogProps {
   isOpen: boolean;
   handleCloseDismiss: () => void;
   handleDismiss: () => void;
}

const DismissDialog: React.FC<DismissDialogProps> = ({
   isOpen,
   handleCloseDismiss,
   handleDismiss,
}) => {
   return (
      <div>
         <Dialog open={isOpen}>
            <DialogTitle>
               <Typography component={'span'} variant="h2" style={{ fontSize: 16 }}>
                  Dismiss issue?
               </Typography>
            </DialogTitle>
            <DialogContent>
               <DialogContentText style={{ fontSize: 14 }}>
                  If you dismiss this issue, you will no longer be able to see
                  it and receive notifications about it
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCloseDismiss} color="secondary">
                  CANCEL
               </Button>
               <Button onClick={handleDismiss} color="primary">
                  DISMISS
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};

export default DismissDialog;
