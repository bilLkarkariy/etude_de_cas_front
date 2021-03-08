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

interface SaveDialogProps {
     isOpen: boolean;
     handleStay: () => void;
     handleLeave: () => void;
}

const SaveDialog: React.FC<SaveDialogProps> = ({
     isOpen,
     handleLeave,
     handleStay,
}) => (
     <div>
          <Dialog open={isOpen}>
               <DialogTitle>
                    <Typography variant="h2" style={{ fontSize: 16 }}>
                         You have unsaved changes.
                    </Typography>
               </DialogTitle>
               <DialogContent>
                    <DialogContentText style={{ fontSize: 14 }}>
                         Are you sure you want to leave this page?
                    </DialogContentText>
               </DialogContent>
               <DialogActions>
                    <Button onClick={handleStay} color="secondary">
                         STAY
                    </Button>
                    <Button onClick={handleLeave} color="primary">
                         LEAVE
                    </Button>
               </DialogActions>
          </Dialog>
     </div>
);
export default SaveDialog;
