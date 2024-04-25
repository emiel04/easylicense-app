type Review = {
    id: number;
    name: string;
    grade: number;
    rating: number;
    content: string;
    user: ReviewUser;
}
type ReviewUser = {
    id: number;
    name: string;
}

