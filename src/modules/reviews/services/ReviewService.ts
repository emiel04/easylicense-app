import {http} from "../../../../config";

class ReviewService {
    async all(page: number = 1, perPage: number = 12): Promise<Page<Review>> {
        const response = await http.get<Page<Review>>(`reviews?page=${page}&per_page=${perPage}`);
        return response.data;
    }

    async delete(id: number) {
        const response = await http.delete(`admin/reviews/${id}`);
        return response.data;
    }

    async create(review: CreateReview) {
        const response = await http.post('reviews', review);
        return response.data;
    }
}

const reviewService = new ReviewService();

export default reviewService;