export interface ICareer {
    name: string;
    category: string;
    description: string;
    company: string;
    salary: {
        min: number;
        max?: number;
        currency: string;
    };
    location: string;
    status?: string;
    isHired: boolean;
    level?: string;
    work_location?: string;
    shortid: string;
    date?: Date;
}