import React, { useEffect } from 'react';
import { Client } from 'models/types';
import { apiGetClients } from 'api/userServices';
import BaseLayout from 'app/layout/BaseLayout';

interface DataManagementProps {}

const DataManagement: React.FC<DataManagementProps> = () => {
     const [clients, setClients] = React.useState([] as Client[]);

     useEffect(() => {
          apiGetClients().then(data => {
               setClients(data.clients);
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [JSON.stringify(clients)]);

     return <BaseLayout></BaseLayout>;
};

export default DataManagement;
