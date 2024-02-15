import { ObjectId } from "mongoose";
import { IArticle } from "./article.interface";
import Article from "./article.model";

export default class ArticleRepository {
    async createArticle(data: IArticle) {
        const article = new Article(data);
        return article.save();
    }

    async getArticles() {
        return Article.find({ isArchived: false });
    }

    async getArticlesSortedByMostRecent() {
        return Article.find({ isArchived: false }).sort({ date: -1 });
    }

    async likeArticle(id: string) {
        return Article.updateOne({ _id: id }, { $inc: { likes: 1 } });
    }

    async unlikeArticle(id: string) {
        return Article.updateOne({ _id: id }, { $inc: { likes: -1 } });
    }

    async commentOnArticle(id: string, comment: any) {
        return Article.updateOne({ _id: id }, { $push: { comments: comment } });
    }

    async getTrendingArticles() {
        return Article.find({ isTrending: true });
    }

    async editArticleContent (id: string, content: string) {
        return Article.updateOne({ _id: id }, { content: content });
    }

    async editArticleTitle (id: string, title: string) {
        return Article.updateOne({ _id: id }, { title: title });
    }

    async editArticleTags (id: string, tags: string[]) {
        return Article.updateOne({ _id: id }, { tags: tags });
    }

    async deleteArticle(id: string) {
        return Article.deleteOne({ _id: id });
    }

    async getArticleByTags(tags: string[]) {
        return Article.find({ tags: { $in: tags } });
    }

    async getArticlesByAuthor(author: string) {
        return Article.find({ author: author });
    }

    async getArticleById(id: string) {
        return Article.findById(id);
    }

    async archiveArticle(id: string) {
        return Article.updateOne({ _id: id }, { isArchived: true });
    }

    async unarchiveArticle(id: string) {
        return Article.updateOne({ _id: id }, { isArchived: false });
    }
}