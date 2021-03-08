import React from 'react';
import { Fab, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ParameterDataGrid from '../DataGrid/ParameterDataGrid';
import FormDialog from '../Dialogs/FormDialog';
import ErrorDialog from '../Dialogs/ErrorDialog';
import LoadingDialog from '../Dialogs/LoadingDialog';
import DeleteDialog from '../Dialogs/DeleteDialog';
import SaveDialog from '../Dialogs/SaveDialog';
import { UserRight } from 'models/types';
import { fav, superpose } from 'styles/stylesConstant';

interface ViewProps {
     isLoading: boolean;
     activationButton: boolean;
     formNamePlaceholder: string;
     isSettingDialogOpen: boolean;
     isSaveDialogOpen: boolean;
     keyIndexName: string;
     action: 'Post' | 'Put';
     editedSetting: any;
     isButtonSaveEnabled: boolean;
     hideDeleteButton: any;
     children: any;
     enableButtonSave: (isEnabled: boolean) => void;
     errorDialog: any;
     errorDetails: any;
     deleteDialog: boolean;
     dataFormatter: (userRights: UserRight[]) => (readonly any[])[];
     settingsList: UserRight[];
     gridColumns: any;
     height?: number;
     rowFormatter?: () => void;
     openEditSettingDialog: (settingId: any, columnId: any) => void;
     updateSetting: () => void;
     postSetting: () => Promise<void>;
     openAddSettingDialog: () => void;
     deleteSetting: () => Promise<void>;
     handleDeleteDialog: () => void;
     handleChangeForm: (
          newEditedSetting: any,
          ignoredSettings?: never[],
          forceDisableSave?: boolean,
     ) => void;
     handleApiCall: (apiCall: any) => Promise<any>;
     handleCloseError: () => void;
     handleCloseDelete: () => void;
     handleLeave: () => void;
     handleStay: () => void;
     handleCloseDialogForm: () => void;
}

const View: React.FC<ViewProps> = props => {
     return (
          <div>
               <LoadingDialog isOpen={props.isLoading} />

               <Grid container style={{ padding: 20, width: '100%' }}>
                    <FormDialog
                         activationButton={props.activationButton}
                         isOpen={props.isSettingDialogOpen}
                         action={props.action}
                         namePlaceholder={props.formNamePlaceholder}
                         handleCloseDialogForm={props.handleCloseDialogForm}
                         updateSetting={props.updateSetting}
                         postSetting={props.postSetting}
                         handleDeleteDialog={props.handleDeleteDialog}
                         editedSetting={props.editedSetting}
                         handleChangeForm={props.handleChangeForm}
                         isButtonSaveEnabled={props.isButtonSaveEnabled}
                         hideDeleteButton={props.hideDeleteButton}
                    >
                         {props.children(
                              props.editedSetting,
                              props.handleChangeForm,
                              props.handleApiCall,
                              props.settingsList,
                              props.enableButtonSave,
                         )}
                    </FormDialog>

                    <ErrorDialog
                         errorDialog={props.errorDialog}
                         errorDetails={props.errorDetails}
                         handleCloseError={props.handleCloseError}
                    />

                    <DeleteDialog
                         isOpen={props.deleteDialog}
                         object={'settings'}
                         handleDelete={props.deleteSetting}
                         handleCloseDelete={props.handleCloseDelete}
                    ></DeleteDialog>

                    <SaveDialog
                         isOpen={props.isSaveDialogOpen}
                         handleLeave={props.handleLeave}
                         handleStay={props.handleStay}
                    />

                    <Grid item xs={12}>
                         <ParameterDataGrid
                              rows={props.dataFormatter(props.settingsList)}
                              gridColumns={props.gridColumns}
                              height={props.height}
                              onRowClick={props.openEditSettingDialog}
                              rowFormatter={props.rowFormatter}
                              keyIndexName={props.keyIndexName}
                         />
                         <div
                              style={superpose}
                         >
                              <Fab
                                   onClick={props.openAddSettingDialog}
                                   color="primary"
                                   style={fav}
                                   aria-label="add"
                              >
                                   <AddIcon />
                              </Fab>
                         </div>
                    </Grid>
               </Grid>
          </div>
     );
};

export default View;
