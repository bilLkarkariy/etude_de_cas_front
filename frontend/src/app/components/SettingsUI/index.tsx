import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import update from 'immutability-helper';
import View from './View';
import { isEqual, omit } from 'lodash';
import { getCommonSearchParamFromURL } from 'utils/routingUtils';
import { UserRight } from 'models/types';
import { apiGetUsers, apiPostUser, apiPutUser } from 'api/userServices';

interface UIProps {
     handleSettingHasChanged?: () => void;
     /** whether to ignore click on given columns */
     ignoredColumns?: string[];
     rowFormatter?: () => void;
     formNamePlaceholder?: string;
     keyIndexName: keyof UserRight;
     gridColumns: any;
     dataFormatter: (userRights: UserRight[]) => (readonly any[])[];
     apiDeleteSettings?: () => void;
}

interface RouteParams {
     id: string;
}

type SettingsUIProps = UIProps & RouteComponentProps<RouteParams>;

const SettingsUI: React.FC<SettingsUIProps> = ({
     handleSettingHasChanged,
     gridColumns,
     location,
     keyIndexName,
     dataFormatter,
     match,
     ignoredColumns = [],
     apiDeleteSettings,
     ...props
}) => {
     const [isLoading, setIsLoading] = React.useState(false);
     // const [activationButton, setActivationButton] = React.useState(false);
     const [errorDialog, setErrorDialog] = React.useState(false);
     const [errorDetails, setErrorDetails] = React.useState('');
     const [isButtonSaveEnabled, setIsButtonSaveEnabled] = React.useState(
          false,
     );
     const [settingsList, setSettingsList] = React.useState([] as UserRight[]);
     const [editedSetting, setEditedSetting] = React.useState({} as UserRight);
     const [isSettingDialogOpen, setIsSettingDialogOpen] = React.useState(
          false,
     );
     const [isSaveDialogOpen, setIsSaveDialogOpen] = React.useState(false);
     const [deleteDialog, setDeleteDialog] = React.useState(false);

     React.useEffect(() => {
          // fetching Users
          apiGetUsers()
               .then(data => {
                    setSettingsList([...data.users]);
                    setIsLoading(true);
               })
               .finally(() => {
                    setIsLoading(false);
                    if (match.params.id === 'new') {
                         setIsSettingDialogOpen(true);
                         setIsButtonSaveEnabled(true);
                    } else if (match.params.id) {
                         let settingFromUrl = settingsList.find(
                              setting =>
                                   setting.id === parseInt(match.params.id, 10),
                         );
                         if (settingFromUrl !== undefined) {
                              setEditedSetting(settingFromUrl as UserRight);
                              setIsSettingDialogOpen(true);
                         } else {
                              let basePath = match.url.replace(
                                   `/${match.params.id}`,
                                   '',
                              );
                              let path = `${basePath}${getCommonSearchParamFromURL(
                                   location.search,
                              )}`;
                              props.history.push(path);
                         }
                    }
               })
               .catch(reason => {
                    setErrorDialog(true);
                    setErrorDetails(reason.toString());
                    setIsLoading(false);
               });
          }, 
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [JSON.stringify(settingsList)]);


     // /****************
     //  *
     //  * API Calls
     //  *
     //  ***************/

     const updateSetting = async () => {
          try {
               setIsLoading(true);

               const data = await apiPutUser(editedSetting);
               let idx = settingsList.findIndex(r => {
                    return r[keyIndexName] === data[keyIndexName];
               });
               let newSettings: readonly UserRight[] = update(settingsList, {
                    [idx]: { $set: data },
               });
               setSettingsList(newSettings as UserRight[]);
               setEditedSetting(data);
               setIsLoading(false);
               setIsButtonSaveEnabled(false);
          } catch (err) {
               setErrorDialog(true);
               setIsSettingDialogOpen(true);
               setIsLoading(false);
               setErrorDetails(err);
          }
          handleSettingHasChanged && handleSettingHasChanged();
     };

     const postSetting = async () => {
          try {
               setIsLoading(true);
               const data = await apiPostUser(editedSetting);
               let newSettings: readonly UserRight[] = settingsList;

               newSettings = update(newSettings, { $push: [data] });
               let basePath = match.url.replace(
                    match.params.id,
                    data[keyIndexName],
               );
               let path = `${basePath}${getCommonSearchParamFromURL(
                    location.search,
               )}`;
               props.history.push(path);

               setSettingsList(newSettings as UserRight[]);
               setEditedSetting(data);
               setIsLoading(false);
               setIsButtonSaveEnabled(false);
               setIsSaveDialogOpen(false);
          } catch (err) {
               setErrorDialog(true);
               setIsSettingDialogOpen(true);
               setIsLoading(false);
               setErrorDetails(err);
          }
          handleSettingHasChanged && handleSettingHasChanged();
     };

     const handleApiCall = async (apiCall: () => any) => {
          const data = await apiCall();

          let idx = settingsList.findIndex(
               r => r[keyIndexName] === data[keyIndexName],
          );

          const newSettings: readonly UserRight[] = update(settingsList, {
               [idx]: { $set: data },
          });
          setSettingsList(newSettings as UserRight[]);
          return data;
     };

     const deleteSetting = async () => {
          try {
               setIsLoading(true);
               setDeleteDialog(false);

               let deletedSetting = editedSetting;

               // @TODO NEVER IMPLEMENT DOESNT EXIST !!!
               //  await apiDeleteSettings(deletedSetting);

               let settingsListCopy = settingsList;

               let newSettings: readonly UserRight[] = settingsListCopy.filter(
                    setting => {
                         return (
                              setting[keyIndexName] !==
                              deletedSetting[keyIndexName]
                         );
                    },
               );

               newSettings = update(settingsListCopy, { $set: newSettings });
               let basePath = match.url.replace(`/${match.params.id}`, '');
               let path = `${basePath}${getCommonSearchParamFromURL(
                    location.search,
               )}`;
               props.history.push(path);
               setIsLoading(false);
               setIsSettingDialogOpen(false);
               setEditedSetting({} as UserRight);
               setSettingsList(newSettings as UserRight[]);
          } catch (err) {
               setErrorDialog(true);
               setIsSettingDialogOpen(true);
               setIsLoading(false);
               setErrorDetails(err);
          }
          handleSettingHasChanged && handleSettingHasChanged();
     };

     // /**************** ***************/

     const openEditSettingDialog = (settingId: any, columnId: any) => {
          if (ignoredColumns && !ignoredColumns.includes(columnId)) {
               let editedSetting = settingsList.find(
                    setting => setting[keyIndexName] === settingId,
               );
               let path = `/${settingId}${getCommonSearchParamFromURL(
                    location.search,
               )}`;
               props.history.push(path);
               setIsSettingDialogOpen(true);
               setEditedSetting(editedSetting ?? ({} as UserRight));
          }
     };

     const openAddSettingDialog = () => {
          let path = `/new${getCommonSearchParamFromURL(location.search)}`;
          props.history.push(path);
          setIsSettingDialogOpen(true);
          setEditedSetting({} as UserRight);
          setIsButtonSaveEnabled(true);
     };

     const handleChangeForm = (
          newEditedSetting: UserRight,
          ignoredSettings = [],
          forceDisableSave: boolean = false,
     ) => {
          if (match.params.id !== 'new') {
               if (forceDisableSave) {
                    setEditedSetting(newEditedSetting);
                    setIsButtonSaveEnabled(false);
               } else {
                    setEditedSetting(newEditedSetting);
                    setIsButtonSaveEnabled(false);

                    setIsButtonSaveEnabled(
                         !isEqual(
                              omit(
                                   settingsList.find(
                                        setting =>
                                             setting[keyIndexName] ===
                                             newEditedSetting[keyIndexName],
                                   ),
                                   ignoredSettings,
                              ),
                              omit(newEditedSetting, ignoredSettings),
                         ),
                    );
               }
          } else {
               setEditedSetting(newEditedSetting);
          }
     };


     const handleCloseDialogForm = () => {
          if (
               isButtonSaveEnabled ||
               (!isButtonSaveEnabled &&
                    !isEqual(
                         settingsList.find(
                              setting =>
                                   setting[keyIndexName] ===
                                   editedSetting[keyIndexName],
                         ),
                         editedSetting,
                    ))
          ) {
               setIsSaveDialogOpen(true);
          } else {
               let basePath = match.url.replace(`/${match.params.id}`, '');
               let path = `${basePath}${getCommonSearchParamFromURL(
                    location.search,
               )}`;
               setIsSaveDialogOpen(false);
               setIsSettingDialogOpen(false);
               props.history.push(path);
               setEditedSetting({} as UserRight);
          }
     };

     const handleLeave = () => {
          let basePath = match.url.replace(`/${match.params.id}`, '');
          let path = `${basePath}${getCommonSearchParamFromURL(
               location.search,
          )}`;
          setIsSettingDialogOpen(false);
          setIsSaveDialogOpen(false);
          setEditedSetting({} as UserRight);
          props.history.push(path);
     };

     const enableButtonSave = (isEnabled: any) => {
          setIsButtonSaveEnabled(isEnabled);
     };

     /***********************************/

     return (
          <View
               {...props}
               dataFormatter={dataFormatter}
               isLoading={isLoading}
               activationButton
               deleteDialog={deleteDialog}
               editedSetting={editedSetting}
               errorDetails={errorDetails}
               errorDialog={errorDialog}
               gridColumns={gridColumns}
               keyIndexName={keyIndexName}
               isSaveDialogOpen={isSaveDialogOpen}
               isSettingDialogOpen={isSettingDialogOpen}
               settingsList={settingsList}
               enableButtonSave={enableButtonSave}
               formNamePlaceholder={props.formNamePlaceholder ?? ''}
               handleCloseDelete={() => setDeleteDialog(false)}
               handleDeleteDialog={() => setDeleteDialog(true)}
               handleCloseError={() => setErrorDialog(false)}
               handleApiCall={handleApiCall}
               handleChangeForm={handleChangeForm}
               handleCloseDialogForm={handleCloseDialogForm}
               openAddSettingDialog={openAddSettingDialog}
               openEditSettingDialog={openEditSettingDialog}
               isButtonSaveEnabled={isButtonSaveEnabled}
               updateSetting={updateSetting}
               postSetting={postSetting}
               deleteSetting={deleteSetting}
               hideDeleteButton={!apiDeleteSettings}
               handleStay={() => setIsSaveDialogOpen(true)}
               handleLeave={handleLeave}
               action={match.params.id === 'new' ? 'Post' : 'Put'}
               children={props.children}
          />
     );
};

export default withRouter(SettingsUI);
