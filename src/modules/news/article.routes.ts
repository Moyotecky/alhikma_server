import express from 'express';
import { upload } from '../../utils/storage/multer';
import ArticleController from './article.controller';

const router = express.Router();
const articleController = new ArticleController();

// Define routes
router.post('/', upload.array('images', 3), checkAdminMiddleware, articleController.uploadArticle);
router.get('/', articleController.getArticles);
router.get('/trending', articleController.getTrendingArticles);
router.get('/recent', articleController.getArticlesSortedByMostRecent);
router.get('/:id', articleController.getArticleById);
router.put('/:id/content',  articleController.editArticleContent);
router.put('/:id/title',  articleController.editArticleTitle);
router.put('/:id/tags',  articleController.editArticleTags);
router.delete('/:id', articleController.deleteArticle);
router.post('/:id/comments', articleController.commentOnArticle);
router.put('/:id/like', articleController.likeArticle);
router.delete('/:id/unlike', articleController.unlikeArticle);
router.post('/tags', articleController.getArticleByTags);
router.get('/author/:author', articleController.getArticlesByAuthor);

export default router;