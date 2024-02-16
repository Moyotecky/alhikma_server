import ArticleService from "./article.service";
import { v2 as cloudinary } from 'cloudinary';
import { extractPublicId } from "cloudinary-build-url";
import { Request, Response } from 'express';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLD_NAME,
    api_key: process.env.CLD_API_KEY,
    api_secret: process.env.CLD_API_SECRET
});


const articleService = new ArticleService();
const cloudinaryFolder = process.env.CLD_FOLDER || "alhikma";

// const extractFilenameFromCloudinaryUrl = (imageUrl: string) => {
//     const parts = imageUrl.split('/');
//     console.log("Filename from Cloudinary URL:",parts[parts.length - 1])
//     return parts[parts.length - 1];
// };

// const deleteItemFromLocalStorage = (publicID: string) => {
//     // Extract the file extension from the public ID
//     const parts = publicID.split('.');
//     const fileExtension = parts[parts.length - 1];

//     // Check if it's a jpg and replace it with jpeg
//     if (fileExtension === "jpg") {
//         const correctedPublicID = `${publicID.substring(0, publicID.lastIndexOf('.'))}.jpeg`;
//         const fileName = `${correctedPublicID}`;
//         const filePath = `./uploads/${fileName}`;

//         // Check if a file with the "jpeg" extension exists
//         if (fs.existsSync(filePath)) {
//             const originalFilePath = `./uploads/${publicID}`;
//             try {
//                 fs.unlinkSync(originalFilePath);
//                 console.log(`Local file ${fileName} deleted successfully.`);
//             } catch (err : any) {
//                 console.error(`Error deleting local file ${fileName}: ${err.message}`);
//             }
//         } else {
//             try {
//                 // If no file with the "jpeg" extension exists, delete the original, aka switch back to jpg

//             } catch (err : any) {
//                 console.error(`Error deleting local file ${fileName}: ${err.message}`);
//             }
//         }
//     } else {
//         // For other file extensions, use the original public ID
//         const fileName = `${publicID}.${fileExtension}`;
//         const filePath = `./uploads/${fileName}`;

//         try {
//             fs.unlinkSync(filePath);
//             console.log(`Local file ${fileName} deleted successfully.`);
//         } catch (err: any) {
//             console.error(`Error deleting local file ${fileName}: ${err.message}`);
//         }
//     }
// };

// const deleteUploadedImages = async (imageUrls: string[]) => {
//     for (const imageUrl of imageUrls) {
//       try {
//         // Extract the filename from the Cloudinary URL

//         const filename = extractFilenameFromCloudinaryUrl(imageUrl);
  
//         // Delete the item image from local storage
//         deleteItemFromLocalStorage(filename);

//         // Extract the public ID from the Cloudinary URL
//         const publicID = extractPublicId(imageUrl);
  
//         // Attempt to delete the image from Cloudinary
//         const cloudinaryResponse = await cloudinary.uploader.destroy(publicID);

//       if (cloudinaryResponse.result === 'ok') {
//         console.log("Image deleted:", imageUrl);
//       } else {
//         console.error('Error deleting uploaded image from Cloudinary:', cloudinaryResponse.result);
//       }
//       } catch (error) {
//         console.error('Error deleting uploaded image from Cloudinary:', error);
  
//         return; // Exit the loop on error
//       }  
//     }
// };

export default class ArticleController {

    async uploadArticle(req: Request, res: Response) {
        try {
            const { title, content, author } = req.body;
            // const images: Express.Multer.File[] = req.files as Express.Multer.File[] || [];

            if (!title || !content || !author ) {
                return res.status(400).json({ success: false, message: 'Title, content, and author are required' });
            }

            // if (images.length > 3) {
            //     return res.status(400).json({ success: false, message: 'Cannot upload more than 3 images' });
            // }

            // const uploadedImageUrls: string[] = [];

            // for (const image of images) {
            //     try {
            //         const result = await cloudinary.uploader.upload(image.path);
            //         uploadedImageUrls.push(result.secure_url);
            //     } catch (error) {
            //         // Handle error
            //         console.error('Error uploading image to Cloudinary:', error);
            //         // Rollback: Delete already uploaded images
            //         await deleteUploadedImages(uploadedImageUrls);
            //         return res.status(500).json({ success: false, message: 'Error uploading image' });
            //     }
            // }

            const articleData = {
                title,
                content,
                author,
            };

            const savedArticle = await articleService.createArticle(articleData);

            return res.status(201).json({ success: true, message: 'Article created successfully', data: savedArticle });
        } catch (error) {
            console.error('Error uploading article:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async getArticles(req: Request, res: Response) {
        try {
            const articles = await articleService.getArticles();
            return res.status(200).json({ success: true, data: articles });
        } catch (error) {
            console.error('Error getting articles:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    /**
     * Asynchronously retrieves trending articles.
     *
     * @param {Request} req - the request object
     * @param {Response} res - the response object
     * @return {Promise<void>} promise that resolves with the retrieved trending articles
     */
    async getTrendingArticles(req: Request, res: Response) {
        try {
            const trendingArticles = await articleService.getTrendingArticles();
            return res.status(200).json({ success: true, data: trendingArticles });
        } catch (error) {
            console.error('Error getting trending articles:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async getArticlesSortedByMostRecent(req: Request, res: Response) {
        try {
            const articles = await articleService.getArticlesSortedByMostRecent();
            return res.status(200).json({ success: true, data: articles });
        } catch (error) {
            console.error('Error getting articles:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async getArticleById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const article = await articleService.getArticleById(id);
            return res.status(200).json({ success: true, data: article });
        } catch (error) {
            console.error('Error getting article:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async archiveArticle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const article = await articleService.archiveArticle(id);
            return res.status(200).json({ success: true, data: article });
        } catch (error) {
            console.error('Error archiving article:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async deleteArticle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const article = await articleService.deleteArticle(id);
            return res.status(200).json({ success: true, data: article });
        } catch (error) {
            console.error('Error deleting article:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async editArticleContent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const article = await articleService.editArticleContent(id, content);
            return res.status(200).json({ success: true, data: article });
        } catch (error) {
            console.error('Error editing article content:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async editArticleTitle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const article = await articleService.editArticleTitle(id, title);
            return res.status(200).json({ success: true, data: article });
        } catch (error) {
            console.error('Error editing article title:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async editArticleTags(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { tags } = req.body;
            const article = await articleService.editArticleTags(id, tags);
            return res.status(200).json({ success: true, data: article });
        } catch (error) {
            console.error('Error editing article tags:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    /**
     * commentOnArticle - A function to comment on an article.
     *
     * @param {Request} req - the request object
     * @param {Response} res - the response object
     * @return {Promise<void>} a Promise that resolves to nothing
     */
    async commentOnArticle(req: Request, res: Response) {
        try {
        const { id } = req.params;
            const { comment } = req.body;
            const article = await articleService.commentOnArticle(id, comment);
            return res.status(200).json({ success: true, data: article });
        } catch (error) {
            console.error('Error commenting on article:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async likeArticle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const article = await articleService.likeArticle(id);
            return res.status(200).json({ success: true, data: article });
        } catch (error) {
            console.error('Error liking article:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    unlikeArticle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const article = articleService.unlikeArticle(id);
            return res.status(200).json({ success: true, data: article });
        } catch (error) {
            console.error('Error unliking article:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async getArticleByTags(req: Request, res: Response) {
        try {
            const { tags } = req.body;
            const article = await articleService.getArticlesByTag(tags);
            return res.status(200).json({ success: true, data: article });
        } catch (error) {
            console.error('Error getting article by tags:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    async getArticlesByAuthor(req: Request, res: Response) {
        try {
            const { author } = req.params;
            const article = await articleService.getArticlesByAuthor(author);
            return res.status(200).json({ success: true, data: article });
        } catch (error) {
            console.error('Error getting articles by author:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}