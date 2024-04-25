type Page<T> = {
    current_page: number;
    data: T[];
    from: number;
    last_page: number;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};