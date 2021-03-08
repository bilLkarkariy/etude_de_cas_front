import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { lowerCase } from 'lodash';

interface ErrorDialogProps {
  errorDialog: boolean;
  errorDetails?: string;
  handleCloseError: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({
  errorDialog,
  handleCloseError,
  errorDetails,
}) => {
  return (
    <div>
      <Dialog open={errorDialog}>
        <DialogTitle>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <SentimentDissatisfied
                style={{
                  color: '#E04C2E',
                  width: 40,
                  height: 40,
                  marginRight: 10,
                }}
              />
            </Grid>
            <Grid item>
              <Typography component={'span'} variant="body1">
                <b style={{ color: '#E04C2E' }}>Wow, that was unexpected !</b>
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          {errorDetails &&
          lowerCase(errorDetails) === 'internal server error' ? (
            <React.Fragment>
              <DialogContentText>
                <Typography variant="h2" align="justify">
                  An error occurred on our side, we apologize for the
                  inconvenience.
                </Typography>
              </DialogContentText>
              <DialogContentText>
                <Typography variant="h2" align="justify">
                  <br />
                  An alert was just sent to our Engineers, they will be working
                  on it as soon as possible.
                </Typography>
              </DialogContentText>
              <DialogContentText>
                <Typography variant="h2" align="justify">
                  <br />
                  <span style={{ color: '#E04C2E' }}>
                    An emergency we can help you with ?
                  </span>{' '}
                  Please contact our support team{' '}
                  <a
                    style={{ color: '#E04C2E' }}
                    href="mailto:support@smartfeeds.io"
                  >
                    support@smartfeeds.io
                  </a>
                  , we will do our best to assist you.
                </Typography>
              </DialogContentText>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <DialogContentText>
                <Typography variant="body1" align="justify">
                  More details:{' '}
                  <b style={{ color: '#E04C2E' }}>{errorDetails}</b>
                </Typography>
              </DialogContentText>
              <DialogContentText>
                <Typography variant="h2" align="justify">
                  <br />
                  Please try again or feel free to contact Product team.
                </Typography>
              </DialogContentText>
            </React.Fragment>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ErrorDialog;
