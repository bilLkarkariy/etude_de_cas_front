import React, { useEffect } from 'react';
import { isEqual, capitalize } from 'lodash';
import SettingsUI from 'app/components/SettingsUI';
import update from 'immutability-helper/index';
import { Client, UserRight } from 'models/types';
import FormUsersRights from 'app/components/Forms/FormUsersRights';
import { apiGetClients } from 'api/userServices';
import BaseLayout from 'app/layout/BaseLayout';

interface SettingsProps {
     location?: {
          pathname: string;
          search: string;
     };
}

const columnsUsersRightsDataGrid = [
     {
          key: 'name',
          name: 'Name ',
          resizable: true,
          filterable: true,
          sortable: true,
          width: 150,
     },
     {
          key: 'email',
          name: 'Email adress ',
          resizable: true,
          filterable: true,
          sortable: true,
          width: 150,
     },
     {
          key: 'role',
          name: 'Role',
          resizable: true,
          filterable: true,
          sortable: true,
     },
     {
          key: 'clients',
          name: 'Authorized Clients',
          resizable: true,
          filterable: true,
          sortable: true,
     },
];

const Settings: React.FC<SettingsProps> = ({ location }) => {
     const [clients, setClients] = React.useState([] as Client[]);
     const [clientsRightIdMapping, setClientsRightIdMapping] = React.useState(
          {} as { key: string },
     );

     useEffect(() => {
          apiGetClients().then(data => {
               setClients(data.clients);
               let map = {};
               for (let i = 0; i < clients.length; ++i) {
                    map[clients[i].name] = clients[i].slug;
               }
               setClientsRightIdMapping(map as { key: string });
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [JSON.stringify(clients)]);

     const roles = {
          Admin: {
               admin_tools: 3,
               adscale_datalab: 3,
               adscale_gtp: 3,
               adscale_media: 3,
               ams_feed: 3,
               ams_gtp: 3,
               ams_lab: 3,
               ams_media: 3,
               fda: 3,
               users: 3,
          },
          Consultant: {
               admin_tools: 2,
               adscale_datalab: 2,
               adscale_gtp: 2,
               adscale_media: 2,
               ams_feed: 2,
               ams_gtp: 2,
               ams_lab: 2,
               ams_media: 2,
          },
          'Consultant Admin': {
               admin_tools: 2,
               adscale_datalab: 2,
               adscale_gtp: 2,
               adscale_media: 2,
               ams_feed: 2,
               ams_gtp: 2,
               ams_lab: 2,
               ams_media: 2,
               users: 3,
          },
     };
     const features = [
          { name: 'adscale_media', active: true },
          { name: 'admin_tools', active: true },
          { name: 'ams_feed', active: true },
          { name: 'adscale_datalab', active: true },
          { name: 'ams_media', active: true },
          { name: 'adscale_gtp', active: true },
          { name: 'ams_gtp', active: true },
          { name: 'ams_lab', active: true },
          { name: 'users', active: true },
          { name: 'users2', active: true },
     ];

     const computeRole = (
          features_rights: any,
          roles: { [x: string]: any },
     ) => {
          for (let role in roles) {
               if (isEqual(features_rights, roles[role])) {
                    return role;
               }
          }
          return 'Custom';
     };

     const dataFormatterUsersRights = (userRights: UserRight[]) => {
          const rows: (readonly any[])[] = [];
          userRights.forEach(user => {
               if (!user.email) {
                    return;
               }
               let role = computeRole(user.claims.features_rights, roles);
               let authorizedClients: (string | undefined)[] = [];
               if (!user.claims.authorized_clients) {
                    authorizedClients = [];
               } else if (isEqual(user.claims.authorized_clients, ['all'])) {
                    authorizedClients = ['All Clients'];
               } else {
                    if (
                         clientsRightIdMapping !== undefined &&
                         Object.keys(clientsRightIdMapping).length > 0
                    ) {
                         authorizedClients = user.claims.authorized_clients.map(
                              right_id =>
                                   Object.keys(clientsRightIdMapping).find(
                                        client_id =>
                                             clientsRightIdMapping[
                                                  client_id
                                             ] === right_id,
                                   ),
                         );
                         authorizedClients = authorizedClients.filter(
                              client_id => client_id !== undefined,
                         );
                         authorizedClients = authorizedClients.map(client_id =>
                              capitalize(client_id.replace(/_/g, ' ')),
                         );
                    } else {
                         user.claims.authorized_clients.map(right_id =>
                              authorizedClients
                                   .push
                                   // capitalize(right_id.replace(/_/g, ' ')),
                                   (),
                         );
                    }
               }

               rows.push(
                    update(userRights, {
                         $merge: {
                              name: user.name,
                              email: user.email,
                              role: role,
                              clients: authorizedClients.join(', '),
                              id: user.id,
                         },
                    }),
               );
          });
          return rows;
     };

     return (
          <BaseLayout>
               <SettingsUI
                    gridColumns={columnsUsersRightsDataGrid}
                    dataFormatter={dataFormatterUsersRights}
                    formNamePlaceholder="Name"
                    keyIndexName="id"
               >
                    {(editedSetting: UserRight[], handleChangeForm: any) => (
                         <FormUsersRights
                              editedSetting={editedSetting}
                              handleChangeForm={handleChangeForm}
                              clients={clients}
                              clientsRightIdMapping={clientsRightIdMapping}
                              features={features}
                              roles={roles}
                              // importsList={importsList}
                              // channelsList={channelsList}
                              location={location}
                              // getUsersRights={getUsersRights}
                              computeRole={computeRole}
                         />
                    )}
               </SettingsUI>
          </BaseLayout>
     );
};

export default Settings;
