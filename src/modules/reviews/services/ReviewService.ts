import {http} from "../../../../config";

class ReviewService {
    async all(page: number = 1, perPage: number = 12): Promise<Page<Review>> {
        const response = await http.get<Page<Review>>(`reviews?page=${page}&per_page=${perPage}`);
        return response.data;
    }

    async delete(id: number) {
        await http.delete(`admin/reviews/${id}`);
    }
}

const reviewService = new ReviewService();

export default reviewService;