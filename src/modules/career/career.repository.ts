import Career from "./career.model";


export default class CareerRepository {
    /**
     * Retrieves all items.
     *
     * @return {Promise<Array<Career>>} The list of all careers
     */
    async getAll() {
        return await Career.find({});
    }

    /**
     * Finds records within a specified date range.
     *
     * @param {Date} startDate - the start date of the range
     * @param {Date} endDate - the end date of the range
     * @return {Promise<Career[]>} the records within the specified date range
     */
    async findWithinDate(startDate: Date, endDate: Date) {
        return await Career.find({ date: { $gte: startDate, $lte: endDate } });
    }

    /**
     * Get a career by its short ID.
     *
     * @param {string} shortId - the short ID of the career
     * @return {Promise<Career | null>} the career with the specified short ID, or null if not found
     */
    async getByShortId(shortId: string) {
        return await Career.findOne({ shortid: shortId });
    }

    /**
     * Async function to get published career data.
     *
     * @return {Promise<Array>} Returns a promise with an array of published career data.
     */
    async getPublished() {
        return await Career.find({ status: 'published' });
    }

    async getWithFilters(filter: object, name: string = '') {
        if (name) {
            filter = { ...filter, name: { $regex: name, $options: 'i' } };
        }
        return await Career.find(filter);
    }
}