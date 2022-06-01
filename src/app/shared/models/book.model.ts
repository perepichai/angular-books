
export class BookEntity {
    id?: number | null;
    description: string;
    title: string;
    pageCount: number;
    excerpt?: string;
    publishDate: string;

    constructor(description: string, title: string, pageCount: number, publishDate: string, id?: number | null, excerpt?: string) {
        this.id = id;
        this.description = description;
        this.title = title;
        this.excerpt = excerpt;
        this.pageCount = pageCount;
        this.publishDate = publishDate;
    }
}