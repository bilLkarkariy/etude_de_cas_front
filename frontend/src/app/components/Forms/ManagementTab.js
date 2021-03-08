import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { capitalize, cloneDeep, isEqual } from 'lodash';

class ManagementTab extends Component {
     handleChangeCheckBox = e => {
          console.log(e.currentTarget);
          // this.props.handleChangeForm(outputSetting);
     };

     handleCheckbox = (client_name, clientsRightIdMapping) => {
          if (!this.props.editedSetting.claims) {
               return false;
          }
          if (
               this.props.editedSetting.claims.authorized_clients.indexOf(
                    'all',
               ) > -1
          ) {
               return true;
          }
          const authorizedClients = this.props.editedSetting.claims.authorized_clients.map(
               right_id =>
                    Object.keys(clientsRightIdMapping).find(
                         client_id =>
                              clientsRightIdMapping[client_id] === right_id,
                    ),
          );
          if (!isEqual(this.props.editedSetting, {}) && authorizedClients) {
               return authorizedClients.indexOf(client_name) > -1;
          }
     };

     createClientsList = clientsRightIdMapping => {
          let clientsList = Object.keys(clientsRightIdMapping).map(
               client_id => {
                    return { name: client_id };
               },
          );
          return clientsList;
     };

     render() {
          let clientsList = cloneDeep(this.props.clients);
          clientsList = this.createClientsList(
               this.props.clientsRightIdMapping,
          );
          clientsList.unshift({ name: 'all' });
          let clientsColumn1 = clientsList.slice(0, clientsList.length / 2 + 1);
          let clientsColumn2 = clientsList.slice(
               clientsList.length / 2 + 1,
               clientsList.length + 1,
          );

          return (
               <div>
                    <Paper
                         elevation={0}
                         square={true}
                         style={{ height: 300, flex: 1, flexDirection: 'row' }}
                    >
                         <Grid container spacing={3}>
                              <Grid item xs={6}>
                                   <Table>
                                        <TableHead
                                             style={{ position: 'sticky' }}
                                        >
                                             <TableRow>
                                                  <TableCell></TableCell>
                                                  <TableCell align="right">
                                                       <Typography
                                                            style={{
                                                                 fontSize: 12,
                                                            }}
                                                       >
                                                            Active Clients
                                                       </Typography>
                                                  </TableCell>
                                             </TableRow>
                                        </TableHead>
                                        <TableBody>
                                             {clientsColumn1.map(client => (
                                                  <TableRow key={client.name}>
                                                       <TableCell align="right">
                                                            <Typography
                                                                 style={{
                                                                      fontSize: 12,
                                                                 }}
                                                            >
                                                                 {capitalize(
                                                                      client.name,
                                                                 ).replace(
                                                                      '_',
                                                                      ' ',
                                                                 )}
                                                            </Typography>
                                                       </TableCell>
                                                       <TableCell padding="checkbox">
                                                            <Checkbox
                                                                 name={`${client.name}`}
                                                                 checked={
                                                                      client.active
                                                                 }
                                                                 onChange={
                                                                      this
                                                                           .handleChangeCheckBox
                                                                 }
                                                            />
                                                       </TableCell>
                                                  </TableRow>
                                             ))}
                                        </TableBody>
                                   </Table>
                              </Grid>
                              <Grid item xs={6}>
                                   <Table>
                                        <TableHead
                                             style={{ position: 'sticky' }}
                                        >
                                             <TableRow>
                                                  <TableCell></TableCell>
                                                  <TableCell align="right">
                                                       <Typography
                                                            style={{
                                                                 fontSize: 12,
                                                            }}
                                                       >
                                                            Active Clients
                                                       </Typography>
                                                  </TableCell>
                                             </TableRow>
                                        </TableHead>
                                        <TableBody>
                                             {clientsColumn2.map(client => (
                                                  <TableRow key={client.name}>
                                                       <TableCell align="right">
                                                            <Typography
                                                                 style={{
                                                                      fontSize: 12,
                                                                 }}
                                                            >
                                                                 {capitalize(
                                                                      client.name,
                                                                 ).replace(
                                                                      '_',
                                                                      ' ',
                                                                 )}
                                                            </Typography>
                                                       </TableCell>
                                                       <TableCell padding="checkbox">
                                                            <Checkbox
                                                                 name={`${client.name}`}
                                                                 checked={this.handleCheckbox(
                                                                      client.name,
                                                                      this.props
                                                                           .clientsRightIdMapping,
                                                                 )}
                                                                 onChange={
                                                                      this
                                                                           .handleChangeCheckBox
                                                                 }
                                                            />
                                                       </TableCell>
                                                  </TableRow>
                                             ))}
                                        </TableBody>
                                   </Table>
                              </Grid>
                         </Grid>
                    </Paper>
               </div>
          );
     }
}

ManagementTab.defaultProps = {
     editedSetting: {
          id: '',
          features_rights: { client_view: 'Viewer' },
          authorized_clients: [],
          imports: [],
          channels: [],
          email: '',
     },
};

ManagementTab.propTypes = {
     clients: PropTypes.array.isRequired,
     clientsRightIdMapping: PropTypes.object.isRequired,
     editedSetting: PropTypes.shape({
          email: PropTypes.string,
          features_rights: PropTypes.object,
          authorized_clients: PropTypes.array,
          imports: PropTypes.array,
          channels: PropTypes.array,
     }),
     handleChangeForm: PropTypes.func.isRequired,
};

export default ManagementTab;
