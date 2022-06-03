
export class BookEntity {
    id?: number;
    title: string;
    description: string;
    pageCount: number;
    excerpt?: string;
    publishDate: string;

    constructor(description: string, title: string, pageCount: number, publishDate: string, id?: number, excerpt?: string) {
        this.id = id || 0;
        this.description = description;
        this.title = title;
        this.excerpt = excerpt;
        this.pageCount = pageCount;
        this.publishDate = publishDate;
    }
}