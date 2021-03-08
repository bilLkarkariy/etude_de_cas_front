
export interface UserRight {
    claims: {
        features_rights: {
            admin_tools: number;
            adscale_datalab: number;
            adscale_gtp: number;
            adscale_media: number;
            ams_feed: number;
            ams_gtp: number;
            ams_lab: number;
            ams_media: number;
        };
        authorized_clients: string[];
    };
    name: string;
    email: string;
    id: number;
}


export interface Client{
    id: number;
    name: string;
    slug: string;
}

export interface RolesInterface {
    Admin: {
        admin_tools: number;
        adscale_datalab: number;
        adscale_gtp: number;
        adscale_media: number;
        ams_feed: number;
        ams_gtp: number;
        ams_lab: number;
        ams_media: number;
        fda: number;
        users: number;
    },
    Consultant: {
        admin_tools: number
        adscale_datalab: number
        adscale_gtp: number
        adscale_media: number
        ams_feed: number
        ams_gtp: number
        ams_lab: number
        ams_media: number
    },
    'Consultant Admin': {
        admin_tools: number;
        adscale_datalab: number;
        adscale_gtp: number;
        adscale_media: number;
        ams_feed: number;
        ams_gtp: number;
        ams_lab: number;
        ams_media: number;
        users: number;
    },
};

export interface EditedSetting {
    features_rights: { adscale_gtp: number };
    authorized_clients: [];
    imports: [];
    channels: [];
    email: string;
    name: string;
}
