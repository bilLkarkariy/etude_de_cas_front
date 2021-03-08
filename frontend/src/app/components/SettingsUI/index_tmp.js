import React from 'react';
import { withRouter } from 'react-router-dom';
import update from 'immutability-helper';
import View from '../../pages/Settings/View';
import PropTypes from 'prop-types';
import { isEqual, omit } from 'lodash';
import { getCommonSearchParamFromURL } from 'utils/routingUtils';
import { apiGetUsers, apiPostUser, apiPutUser } from 'api/userServices';

class SettingsUI extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            settingsList: [],
            editedSetting: undefined,
            isSettingDialogOpen: false,
            isLoading: false,
            errorDialog: false,
            errorDetails: '',
            deleteDialog: false,
            isButtonSaveEnabled: false,
            isSaveDialogOpen: false,
        };
    }

    componentDidMount = async() => {
        await this.getSetting();

        if (this.props.match.params.id === 'new') {
            this.setState({
                isSettingDialogOpen: true,
                isButtonSaveEnabled: true,
            });
        } else if (this.props.match.params.id) {
            let settingFromUrl = this.state.settingsList.find(
                setting =>
                setting[this.props.keyIndexName] ===
                parseInt(this.props.match.params.id, 10),
            );
            if (settingFromUrl !== undefined) {
                this.setState({
                    editedSetting: settingFromUrl,
                    isSettingDialogOpen: true,
                });
            } else {
                let basePath = this.props.match.url.replace(
                    `/${this.props.match.params.id}`,
                    '',
                );
                let path = `${basePath}${getCommonSearchParamFromURL(
                         this.props.location.search,
                    )}`;
                this.props.history.push(path);
            }
        }
    };

    /****************
     *
     * API Calls
     *
     ***************/

    getSetting = async() => {
        try {
            this.setState({ isLoading: true });
            const data = await apiGetUsers();
            this.setState({ settingsList: data.users, isLoading: false });
        } catch (err) {
            this.setState({
                errorDialog: true,
                isLoading: false,
                errorDetails: err.toString(),
            });
        }
    };

    enableButtonSave = isEnabled => {
        this.setState({ isButtonSaveEnabled: isEnabled });
    };

    updateSetting = async() => {
        try {
            this.setState({ isLoading: true });
            let editedSetting = this.state.editedSetting;

            const data = await apiPutUser(editedSetting);

            let newSettings = this.state.settingsList;
            let idx = newSettings.findIndex(r => {
                return (
                    r[this.props.keyIndexName] ===
                    data[this.props.keyIndexName]
                );
            });
            newSettings = update(newSettings, {
                [idx]: { $set: data },
            });
            this.setState({
                settingsList: newSettings,
                editedSetting: data,
                isLoading: false,
                isButtonSaveEnabled: false,
            });
        } catch (err) {
            this.setState({
                errorDialog: true,
                isSettingDialogOpen: true,
                isLoading: false,
                errorDetails: err,
            });
        }
        this.props.handleSettingHasChanged();
    };

    postSetting = async() => {
        try {
            this.setState({ isLoading: true });
            let createdSetting = this.state.editedSetting;

            const data = await apiPostUser(createdSetting);
            let newSettings = this.state.settingsList;
            newSettings = update(newSettings, { $push: [data] });
            let basePath = this.props.match.url.replace(
                this.props.match.params.id,
                data[this.props.keyIndexName],
            );
            let path = `${basePath}${getCommonSearchParamFromURL(
                    this.props.location.search,
               )}`;
            this.props.history.push(path);

            this.setState({
                settingsList: newSettings,
                editedSetting: data,
                isLoading: false,
                isButtonSaveEnabled: false,
                isSaveDialogOpen: false,
            });
        } catch (err) {
            this.setState({
                isSettingDialogOpen: true,
                errorDialog: true,
                isLoading: false,
                errorDetails: err,
            });
        }
        this.props.handleSettingHasChanged();
    };

    handleApiCall = async apiCall => {
        const data = await apiCall();

        let idx = this.state.settingsList.findIndex(
            r =>
            r[this.props.keyIndexName] ===
            data[this.props.keyIndexName],
        );

        const newSettings = update(this.state.settingsList, {
            [idx]: { $set: data },
        });

        this.setState({
            settingsList: newSettings,
        });
        return data;
    };

    deleteSetting = async() => {
        try {
            this.setState({ isLoading: true, deleteDialog: false });

            let deletedSetting = this.state.editedSetting;

            await this.props.apiDeleteSettings(deletedSetting);
            let settingsList = this.state.settingsList;

            let newSettings = settingsList.filter(setting => {
                return (
                    setting[this.props.keyIndexName] !==
                    deletedSetting[this.props.keyIndexName]
                );
            });

            newSettings = update(settingsList, { $set: newSettings });
            let basePath = this.props.match.url.replace(
                `/${this.props.match.params.id}`,
                '',
            );
            let path = `${basePath}${getCommonSearchParamFromURL(
                    this.props.location.search,
               )}`;
            this.props.history.push(path);
            this.setState({
                settingsList: newSettings,
                isLoading: false,
                editedSetting: {},
                isSettingDialogOpen: false,
            });
        } catch (err) {
            this.setState({
                isSettingDialogOpen: true,
                errorDialog: true,
                isLoading: false,
                errorDetails: err,
            });
        }
        this.props.handleSettingHasChanged();
    };

    handleCloseError = () => {
        this.setState({ errorDialog: false });
    };
    /**************** ***************/

    openEditSettingDialog = (settingId, columnId) => {
        if (!this.props.ignoredColumns.includes(columnId)) {
            let editedSetting = this.state.settingsList.find(
                setting => setting[this.props.keyIndexName] === settingId,
            );
            let path = `/${settingId}${getCommonSearchParamFromURL(
                    this.props.location.search,
               )}`;
            this.props.history.push(path);

            this.setState({
                isSettingDialogOpen: true,
                editedSetting: editedSetting,
            });
        }
    };

    openAddSettingDialog = () => {
        let path = `/new${getCommonSearchParamFromURL(
               this.props.location.search,
          )}`;
        this.props.history.push(path);
        this.setState({
            isSettingDialogOpen: true,
            editedSetting: undefined,
            isButtonSaveEnabled: true,
        });
    };

    handleChangeForm = (
        newEditedSetting,
        ignoredSettings = [],
        forceDisableSave = false,
    ) => {
        if (this.props.match.params.id !== 'new') {
            if (forceDisableSave) {
                this.setState({
                    editedSetting: newEditedSetting,
                    isButtonSaveEnabled: false,
                });
            } else {
                this.setState({
                    editedSetting: newEditedSetting,
                    isButtonSaveEnabled: !isEqual(
                        omit(
                            this.state.settingsList.find(
                                setting =>
                                setting[
                                    this.props.keyIndexName
                                ] ===
                                newEditedSetting[
                                    this.props.keyIndexName
                                ],
                            ),
                            ignoredSettings,
                        ),
                        omit(newEditedSetting, ignoredSettings),
                    ),
                });
            }
        } else {
            this.setState({ editedSetting: newEditedSetting });
        }
    };

    handleCloseDialogForm = () => {
        if (
            this.state.isButtonSaveEnabled ||
            (!this.state.isButtonSaveEnabled &&
                !isEqual(
                    this.state.settingsList.find(
                        setting =>
                        setting[this.props.keyIndexName] ===
                        this.state.editedSetting[
                            this.props.keyIndexName
                        ],
                    ),
                    this.state.editedSetting,
                ))
        ) {
            this.setState({ isSaveDialogOpen: true });
        } else {
            let basePath = this.props.match.url.replace(
                `/${this.props.match.params.id}`,
                '',
            );
            let path = `${basePath}${getCommonSearchParamFromURL(
                    this.props.location.search,
               )}`;
            this.props.history.push(path);
            this.setState({
                isSettingDialogOpen: false,
                editedSetting: undefined,
            });
        }
    };

    handleStay = () => {
        this.setState({ isSaveDialogOpen: false });
    };

    handleLeave = () => {
        let basePath = this.props.match.url.replace(
            `/${this.props.match.params.id}`,
            '',
        );
        let path = `${basePath}${getCommonSearchParamFromURL(
               this.props.location.search,
          )}`;
        this.props.history.push(path);
        this.setState({
            isSettingDialogOpen: false,
            isSaveDialogOpen: false,
            editedSetting: undefined,
        });
    };

    handleCloseDelete = () => {
        this.setState({ deleteDialog: false });
    };

    handleDeleteDialog = () => {
        this.setState({ deleteDialog: true });
    };

    /***********************************/

    render() {
        return ( <
            View {...this.props } {...this.state }
            handleApiCall = { this.handleApiCall }
            handleChangeForm = { this.handleChangeForm }
            handleCloseDialogForm = { this.handleCloseDialogForm }
            openAddSettingDialog = { this.openAddSettingDialog }
            openEditSettingDialog = { this.openEditSettingDialog }
            enableButtonSave = { this.enableButtonSave }
            updateSetting = { this.updateSetting }
            postSetting = { this.postSetting }
            deleteSetting = { this.deleteSetting }
            hideDeleteButton = {!this.props.apiDeleteSettings }
            handleCloseError = { this.handleCloseError }
            handleCloseDelete = { this.handleCloseDelete }
            handleDeleteDialog = { this.handleDeleteDialog }
            handleStay = { this.handleStay }
            handleLeave = { this.handleLeave }
            action = {
                this.props.match.params.id === 'new' ? 'Post' : 'Put'
            }
            />
        );
    }
}

SettingsUI.defaultProps = {
    apiDeleteSettings: null,
    handleSettingHasChanged: function() {},
    ignoredColumns: [],
    keyIndexName: 'id',
};

SettingsUI.propTypes = {
    editedSetting: PropTypes.object,
    handleSettingHasChanged: PropTypes.func,
    /** whether to ignore click on given columns */
    ignoredColumns: PropTypes.array,
    rowFormatter: PropTypes.func,
    formNamePlaceholder: PropTypes.string,
    match: PropTypes.object,
    location: PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string,
    }),
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    keyIndexName: PropTypes.string,
};

export default withRouter(SettingsUI);