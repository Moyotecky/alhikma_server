import { IArticle } from "./article.interface";
import ArticleRepository from "./article.repository";

const articleRepo = new ArticleRepository();

export default class ArticleService {
    async createArticle(data: IArticle) {
        try {
            return await articleRepo.createArticle(data);
        } catch (error) {
            throw error;
        }
    }

    async getArticles() {
        try {
            return await articleRepo.getArticles();
        } catch (error) {
            throw error;
        }
    }

    async getArticlesSortedByMostRecent() {
        try {
            return await articleRepo.getArticlesSortedByMostRecent();
        } catch (error) {
            throw error;
        }
    }

    async getTrendingArticles() {
        try {
            return await articleRepo.getTrendingArticles();
        } catch (error) {
            throw error;
        }
    }

    async editArticleContent(id: string, content: string) {
        try {
            return await articleRepo.editArticleContent(id, content);
        } catch (error) {
            throw error;
        }
    }

    async likeArticle(id: string) {
        try {
            return await articleRepo.likeArticle(id);
        } catch (error) {
            throw error;
        }
    }

    async unlikeArticle(id: string) {
        try {
            return await articleRepo.unlikeArticle(id);
        } catch (error) {
            throw error;
        }
    }

    async commentOnArticle(id: string, comment: any) {
        try {
            return await articleRepo.commentOnArticle(id, comment);
        } catch (error) {
            throw error;
        }
    }

    async editArticleTitle(id: string, title: string) {
        try {
            return await articleRepo.editArticleTitle(id, title);
        } catch (error) {
            throw error;
        }
    }

    async editArticleTags(id: string, tags: string[]) {
        try {
            return await articleRepo.editArticleTags(id, tags);
        } catch (error) {
            throw error;
        }
    }

    async deleteArticle(id: string) {
        try {
            return await articleRepo.deleteArticle(id);
        } catch (error) {
            throw error;
        }
    }

    async getArticleById(id: string) {
        try {
            return await articleRepo.getArticleById(id);
        } catch (error) {
            throw error;
        }
    }

    async archiveArticle(id: string) {
        try {
            return await articleRepo.archiveArticle(id);
        } catch (error) {
            throw error;
        }
    }

    async unarchiveArticle(id: string) {
        try {
            return await articleRepo.unarchiveArticle(id);
        } catch (error) {
            throw error;
        }
    }

    async getArticlesByTag(tags: string[]) {
        try {
            return await articleRepo.getArticleByTags(tags);
        } catch (error) {
            throw error;
        }
    }

    async getArticlesByAuthor(author: string) {
        try {
            return await articleRepo.getArticlesByAuthor(author);
        } catch (error) {
            throw error;
        }
    }
}
