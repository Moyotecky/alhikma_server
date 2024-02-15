interface IApplication {
    name: string;
    email: string;
    phone: string;
    coverLetter: string;
    resume_url: string;
    date_applied?: Date;
    job_id?: string;
    status?: 'pending' | 'reviewing' | 'rejected' | 'hired';
    source?: string;
    additional_documents?: string[];
    metadata?: {
        ip_address?: string;
        user_agent?: string;
        referral_source?: string;
    };
}

export default IApplication;