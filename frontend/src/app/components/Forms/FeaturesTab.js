import PropTypes from 'prop-types';
import React, { Component } from 'react';
import update from 'immutability-helper';
import Typography from '@material-ui/core/Typography';

import CustomSelect from '../FormInputs/CustomSelect';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { capitalize, cloneDeep, isEqual } from 'lodash';

class FeaturesTab extends Component {
     handleChangeRole = ({ target: { value } }) => {
          const editedSetting = cloneDeep(this.props.editedSetting);
          const features_rights = this.getDefaultRoleSettings(value);
          editedSetting.claims.features_rights = features_rights;
          const outputSetting = update(this.props.editedSetting, {
               $set: editedSetting,
          });

          this.props.handleChangeForm(outputSetting);
     };

     getDefaultRoleSettings = role => {
          return this.props.roles[role] || { adscale_gtp: 1 };
     };

     handleChangeCheckBox = e => {
          const item = e.target.name;
          const isChecked = e.target.checked;
          const rights_mapper = {
               None: 0,
               Viewer: 1,
               Editor: 2,
               Admin: 3,
          };

          let cloneEditedSettings = cloneDeep(this.props.editedSetting);
          const [feature, rights] = item.split('-');
          if (isChecked) {
               cloneEditedSettings.claims.features_rights[feature] =
                    rights_mapper[rights];
          } else {
               delete cloneEditedSettings.claims.features_rights[feature];
          }

          const outputSetting = update(this.props.editedSetting, {
               $set: cloneEditedSettings,
          });

          this.props.handleChangeForm(outputSetting);
     };

     handleCheckbox = (feature, rightLevel) => {
          if (!isEqual(this.props.editedSetting, {})) {
               let rights = this.props.editedSetting.claims.features_rights;
               return rights[feature] === rightLevel;
          }
     };

     render() {
          return (
               <div
                    style={{
                         display: 'flex',
                         flexDirection: 'row',
                         height: '32%',
                         justifyContent: 'space-between',
                    }}
               >
                    <CustomSelect
                         id={'role'}
                         value={this.props.computeRole(
                              this.props.editedSetting.claims?.features_rights,
                              this.props.roles,
                         )}
                         handleChange={this.handleChangeRole}
                         options={[
                              {
                                   value: 'Admin',
                                   label: 'Admin',
                              },
                              {
                                   value: 'Consultant',
                                   label: 'Consultant',
                              },
                              {
                                   value: 'Consultant Admin',
                                   label: 'Consultant Admin',
                              },
                              {
                                   value: 'SmartFeeds User',
                                   label: 'SmartFeeds User',
                              },
                              {
                                   value: 'Custom',
                                   label: 'Custom',
                              },
                         ]}
                         required={true}
                         width="30%"
                    >
                         Role
                    </CustomSelect>

                    <div>
                         <Paper
                              elevation={0}
                              square={true}
                              style={{
                                   height: 300,
                                   width: '100%',
                                   overflow: 'auto',
                              }}
                         >
                              <Table>
                                   <TableHead style={{ position: 'sticky' }}>
                                        <TableRow>
                                             <TableCell></TableCell>
                                             <TableCell align="right">
                                                  <Typography
                                                       style={{ fontSize: 12 }}
                                                  >
                                                       Admin
                                                  </Typography>
                                             </TableCell>
                                             <TableCell align="right">
                                                  <Typography
                                                       style={{ fontSize: 12 }}
                                                  >
                                                       Editor
                                                  </Typography>
                                             </TableCell>
                                             <TableCell align="right">
                                                  <Typography
                                                       style={{ fontSize: 12 }}
                                                  >
                                                       Viewer
                                                  </Typography>
                                             </TableCell>
                                        </TableRow>
                                   </TableHead>
                                   <TableBody>
                                        {this.props.features.map(feature => (
                                             <TableRow key={feature.name}>
                                                  <TableCell align="right">
                                                       <Typography
                                                            style={{
                                                                 fontSize: 12,
                                                            }}
                                                       >
                                                            {capitalize(
                                                                 feature.name,
                                                            ).replace(
                                                                 /_/g,
                                                                 ' ',
                                                            )}
                                                       </Typography>
                                                  </TableCell>
                                                  <TableCell padding="checkbox">
                                                       <Checkbox
                                                            name={`${feature.name}-Admin`}
                                                            checked={this.handleCheckbox(
                                                                 feature.name,
                                                                 3,
                                                            )}
                                                            onChange={
                                                                 this
                                                                      .handleChangeCheckBox
                                                            }
                                                            disabled={
                                                                 this.props.computeRole(
                                                                      this.props
                                                                           .editedSetting
                                                                           .features_rights,
                                                                      this.props
                                                                           .roles,
                                                                 ) ===
                                                                      'Custom' ||
                                                                 this.props.computeRole(
                                                                      this.props
                                                                           .editedSetting
                                                                           .features_rights,
                                                                      this.props
                                                                           .roles,
                                                                 ) ===
                                                                      'SmartFeeds User'
                                                                      ? false
                                                                      : true
                                                            }
                                                       />
                                                  </TableCell>
                                                  <TableCell padding="checkbox">
                                                       <Checkbox
                                                            name={`${feature.name}-Editor`}
                                                            checked={this.handleCheckbox(
                                                                 feature.name,
                                                                 2,
                                                            )}
                                                            onChange={
                                                                 this
                                                                      .handleChangeCheckBox
                                                            }
                                                            disabled={
                                                                 this.props.computeRole(
                                                                      this.props
                                                                           .editedSetting
                                                                           .features_rights,
                                                                      this.props
                                                                           .roles,
                                                                 ) ===
                                                                      'Custom' ||
                                                                 this.props.computeRole(
                                                                      this.props
                                                                           .editedSetting
                                                                           .features_rights,
                                                                      this.props
                                                                           .roles,
                                                                 ) ===
                                                                      'SmartFeeds User'
                                                                      ? false
                                                                      : true
                                                            }
                                                       />
                                                  </TableCell>
                                                  <TableCell padding="checkbox">
                                                       <Checkbox
                                                            name={`${feature.name}-Viewer`}
                                                            checked={this.handleCheckbox(
                                                                 feature.name,
                                                                 1,
                                                            )}
                                                            onChange={
                                                                 this
                                                                      .handleChangeCheckBox
                                                            }
                                                            disabled={
                                                                 this.props.computeRole(
                                                                      this.props
                                                                           .editedSetting
                                                                           .features_rights,
                                                                      this.props
                                                                           .roles,
                                                                 ) ===
                                                                      'Custom' ||
                                                                 this.props.computeRole(
                                                                      this.props
                                                                           .editedSetting
                                                                           .features_rights,
                                                                      this.props
                                                                           .roles,
                                                                 ) ===
                                                                      'SmartFeeds User'
                                                                      ? false
                                                                      : true
                                                            }
                                                       />
                                                  </TableCell>
                                             </TableRow>
                                        ))}
                                   </TableBody>
                              </Table>
                         </Paper>
                    </div>
               </div>
          );
     }
}

FeaturesTab.defaultProps = {
     editedSetting: {
          features_rights: { adscale_gtp: 1 },
          authorized_clients: [],
          imports: [],
          channels: [],
          email: '',
          name: '',
     },
};

FeaturesTab.propTypes = {
     handleChangeForm: PropTypes.func.isRequired,
     editedSetting: PropTypes.shape({
          email: PropTypes.string,
          features_rights: PropTypes.object.isRequired,
          authorized_clients: PropTypes.array,
          imports: PropTypes.array,
          channels: PropTypes.array,
     }),
     roles: PropTypes.object.isRequired,
     features: PropTypes.array.isRequired,
     computeRole: PropTypes.func.isRequired,
};

export default FeaturesTab;
