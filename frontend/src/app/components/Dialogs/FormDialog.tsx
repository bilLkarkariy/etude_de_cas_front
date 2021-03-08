import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import update from 'immutability-helper/index';

import FormTitle from './FormTitle';
import CustomSwitch from '../Buttons/CustomSwitch';

interface EditedSetting extends Object {
     name?: string;
     enabled?: boolean;
}

interface FormDialogProps<T extends EditedSetting = EditedSetting> {
     editedSetting: T;
     handleChangeForm: (editedSetting: EditedSetting) => void;
     handleSettingNameValidation?: (value: string) => string | undefined;
     handleDeleteDialog: () => void;
     updateSetting: () => void;
     postSetting: () => void;
     action: string;
     isOpen: boolean;
     namePlaceholder: string;
     handleCloseDialogForm: () => void;
     children?: React.ReactNode;
     isButtonSaveEnabled: boolean;
     hideDeleteButton?: boolean;
     activationButton?: boolean;
     isTitleDisabled?: boolean;
}

class FormDialog<T extends EditedSetting> extends React.Component<
     FormDialogProps<T>,
     {}
> {
     static defaultProps: Pick<
          FormDialogProps,
          'editedSetting' | 'activationButton'
     > = {
          editedSetting: {
               name: '',
          },
          activationButton: false,
     };

     handleActionButton = () => {
          let action = this.props.action;
          switch (action) {
               case 'Post':
                    this.props.postSetting();
                    break;
               case 'Put':
                    this.props.updateSetting();
                    break;
          }
     };

     handleDeleteDialog = (e: React.ChangeEvent<{}>) => {
          this.props.handleDeleteDialog();
     };

     handleChangeFormTitle = (title: string) => {
          const outputSetting = update(this.props.editedSetting, {
               name: { $set: title },
          });

          this.props.handleChangeForm(outputSetting as T);
     };

     handleCustomSwitchChange = (
          e: React.ChangeEvent<{
               id: string;
               value: unknown;
               checked: boolean;
          }>,
     ) => {
          this.props.handleChangeForm({
               ...this.props.editedSetting,
               enabled: e.target.checked,
          } as any);
     };

     render() {
          return (
               <div>
                    <Dialog
                         maxWidth="md"
                         open={this.props.isOpen}
                         onClose={this.props.handleCloseDialogForm}
                    >
                         <DialogTitle>
                              <div
                                   style={{
                                        display: 'inline-flex',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        alignItems: 'center',
                                   }}
                              >
                                   <div
                                        style={{
                                             display: 'flex',
                                             justifyContent: 'space-between',
                                             width: '100%',
                                        }}
                                   >
                                        <FormTitle
                                             placeholder={
                                                  this.props.namePlaceholder
                                             }
                                             title={
                                                  this.props.editedSetting.name
                                                       ? this.props
                                                              .editedSetting
                                                              .name
                                                       : ''
                                             }
                                             handleChangeFormTitle={
                                                  this.handleChangeFormTitle
                                             }
                                             handleSettingNameValidation={
                                                  this.props
                                                       .handleSettingNameValidation
                                             }
                                             disabled={
                                                  this.props.isTitleDisabled
                                             }
                                        />
                                        {this.props.activationButton && (
                                             <div
                                                  style={{
                                                       display: 'flex',
                                                       alignItems: 'center',
                                                  }}
                                             >
                                                  <CustomSwitch
                                                       checked={
                                                            !!this.props
                                                                 .editedSetting
                                                                 .enabled
                                                       }
                                                       handleChange={
                                                            this
                                                                 .handleCustomSwitchChange
                                                       }
                                                  />
                                                  {this.props.editedSetting
                                                       .enabled ? (
                                                       <Typography
                                                            variant={'h2'}
                                                       >
                                                            Active
                                                       </Typography>
                                                  ) : (
                                                       <Typography
                                                            variant={'h2'}
                                                       >
                                                            Inactive
                                                       </Typography>
                                                  )}
                                             </div>
                                        )}
                                   </div>
                                   <IconButton
                                        color="inherit"
                                        onClick={
                                             this.props.handleCloseDialogForm
                                        }
                                        aria-label="Close"
                                   >
                                        <CloseIcon />
                                   </IconButton>
                              </div>
                         </DialogTitle>
                         <DialogContent>{this.props.children}</DialogContent>
                         <DialogActions>
                              {this.props.action !== 'Post' &&
                                   !this.props.hideDeleteButton && (
                                        <IconButton
                                             onClick={this.handleDeleteDialog}
                                             style={{
                                                  position: 'absolute',
                                                  left: 15,
                                             }}
                                        >
                                             <DeleteIcon color="secondary" />
                                        </IconButton>
                                   )}
                              <div style={{ margin: 15 }}>
                                   {this.props.isButtonSaveEnabled ? (
                                        <Button
                                             color="primary"
                                             onClick={this.handleActionButton}
                                        >
                                             <Typography
                                                  color="primary"
                                                  variant={'h6'}
                                             >
                                                  Save
                                             </Typography>
                                        </Button>
                                   ) : (
                                        <Button disabled>
                                             <Typography variant={'h6'}>
                                                  Save
                                             </Typography>
                                        </Button>
                                   )}
                              </div>
                         </DialogActions>
                    </Dialog>
               </div>
          );
     }
}

export default FormDialog;
