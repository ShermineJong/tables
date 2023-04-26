export type Employee = {
    firstName?: string;
    lastName?: string;
    email?: string;
    jobTitle?: string;
    count?: number;
    startDate?: Date;
    signatureCatchPhrase?: string;
    arrived?: boolean;
    parentId?: string;
    subRows?: Employee[];
};
