// drone position update (from socket)
export interface DroneFeature {
    type: "Feature";
    properties: {
        serial: string;
        registration: string;
        Name: string;
        altitude: number;
        pilot: string;
        organization: string;
        yaw: number;
    };
    geometry: {
        type: "Point";
        coordinates: [number, number];
    };
}

export interface DroneFeatureCollection {
    type: "FeatureCollection";
    features: DroneFeature[];
}

export interface DroneData {
    name: string;
    organization: string;
    pilot: string;
    path: [number, number][];
    serial: string;
    altitude: number;
    firstAppearance: Date;
    currentPosition: [number, number];
}
