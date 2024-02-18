import Joi from 'joi';

export const applicationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    coverLetter: Joi.string().required(),
    resume_url: Joi.string().required(),
    job_id: Joi.string().required(),
    status: Joi.string().valid('pending', 'reviewing', 'rejected', 'hired').default('pending'),
    source: Joi.string(),
    additional_documents: Joi.array().items(Joi.string()),
    metadata: Joi.object({
        ip_address: Joi.string(),
        user_agent: Joi.string(),
        referral_source: Joi.string()
    })
});
