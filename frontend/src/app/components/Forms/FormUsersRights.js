import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import FeaturesTab from './FeaturesTab';
import ClientsTab from './ClientsTab';
import CustomTextField from '../FormInputs/CustomTextField';

class FormUsersRights extends Component {
     constructor(props) {
          super(props);
          this.state = { tabValue: 0, isDeleteDialogOpen: false };
     }

     componentDidMount() {
          this.props.handleChangeForm(this.props.editedSetting);
     }

     handleChangeTab = (event, value) => {
          this.setState({ tabValue: value });
     };

     render() {
          return (
               <div style={{ width: 800 }}>
                    <CustomTextField
                         id="email"
                         value={this.props.editedSetting.email}
                         placeholder="adress@domain.com"
                         handleChange={e =>
                              this.props.handleChangeForm({
                                   ...this.props.editedSetting,
                                   email: e.target.value,
                              })
                         }
                         type="text"
                         width={'50%'}
                         isRequired={true}
                    >
                         Email Adress
                    </CustomTextField>
                    <Tabs
                         fullWidth
                         value={this.state.tabValue}
                         onChange={this.handleChangeTab}
                         style={{
                              marginBottom: '20px',
                              marginLeft: '15px',
                              marginRight: '15px',
                              borderBottom: '1px solid',
                              justifyContent: 'space-around',
                              display: 'flex-grow',
                         }}
                    >
                         <Tab
                              label={
                                   <Typography variant="h6" color="inherit">
                                        Features
                                   </Typography>
                              }
                         />
                         <Tab
                              label={
                                   <Typography variant="h6" color="inherit">
                                        Clients
                                   </Typography>
                              }
                         />
                         <Tab
                              label={
                                   <Typography variant="h6" color="inherit">
                                        Data Management
                                   </Typography>
                              }
                         />
                    </Tabs>

                    <SwipeableViews index={this.state.tabValue}>
                         <FeaturesTab
                              editedSetting={this.props.editedSetting}
                              handleChangeForm={this.props.handleChangeForm}
                              roles={this.props.roles}
                              features={this.props.features}
                              computeRole={this.props.computeRole}
                         />
                         <ClientsTab
                              editedSetting={this.props.editedSetting}
                              userRights={this.props.userRights}
                              handleChangeForm={this.props.handleChangeForm}
                              clients={this.props.clients}
                              clientsRightIdMapping={
                                   this.props.clientsRightIdMapping
                              }
                         />
                    </SwipeableViews>
               </div>
          );
     }
}

FormUsersRights.defaultProps = {
     editedSetting: {
          claims: {
               features_rights: { adscale_gtp: 1 },
               authorized_clients: [],
               imports: [],
               channels: [],
          },
          email: '',
          name: '',
          id: undefined,
     },
};

FormUsersRights.propTypes = {
     clients: PropTypes.array.isRequired,
     clientsRightIdMapping: PropTypes.object.isRequired,
     editedSetting: PropTypes.shape({
          email: PropTypes.string,
          features_rights: PropTypes.object,
          authorized_clients: PropTypes.array,
     }),
     handleChangeForm: PropTypes.func.isRequired,
     roles: PropTypes.object.isRequired,
     features: PropTypes.array.isRequired,
     computeRole: PropTypes.func.isRequired,
     userRights: PropTypes.object,
     importsList: PropTypes.array,
     channelsList: PropTypes.array,
};

export default FormUsersRights;
