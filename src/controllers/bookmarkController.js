import blogSchema from "../schemas/blogSchema.js";
import bookmarkSchema from "../schemas/bookmarkSchema.js";
import utils from "../utils/index.js";

const create = async (req, res) => {
    try {
        const { blog_id } = req.body;
        const userId = req.authData;

        const existBookmark = await bookmarkSchema.findOne({
            user_id: userId,
            blog_id,
        });

        if (existBookmark) {
            return utils.handlerResponse(res, "BAD_REQUEST", {
                message: "Already Bookmark!",
            });
        }

        const existBlog = await blogSchema.findOne({
            _id: blog_id,
        });

        if (existBlog.author_id.toString() === userId) {
            return utils.handlerResponse(res, "BAD_REQUEST", {
                message: "Author Not Allow bookmark!",
            });
        }

        await bookmarkSchema.create({ blog_id, user_id: userId });

        return utils.handlerResponse(res, "CREATED", {
            message: "Create Bookmark Success!",
        });
    } catch (error) {
        return utils.handlerResponse(res, "INTERNAL_ERROR", {
            message: error?.message || error || `Internal Server Error`,
        });
    }
};

const historyUserByBlogId = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.authData._id;

        const exitBookmark = await bookmarkSchema
            .findOne({
                blog_id: blogId,
                user_id: userId,
            })
            .populate("blog_id", "title tags");

        if (!exitBookmark) {
            return utils.handlerResponse(res, "NOT_FOUND", {
                message: "Empty history bookmark!",
            });
        }

        return utils.handlerResponse(res, "OK", {
            message: "Get History user by blog id success!",
            data: exitBookmark,
        });
    } catch (error) {
        return utils.handlerResponse(res, "INTERNAL_ERROR", {
            message: error?.message || error || `Internal Server Error`,
        });
    }
};

const historyByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const histories = await bookmarkSchema.find({ user_id: userId });

        const blogIds = [];
        for (let i = 0; i < histories.length; i++) {
            const { blog_id } = histories[i];
            blogIds.push(blog_id);
        }

        const listBlogs = await blogSchema
            .find({ _id: { $in: blogIds } })
            .populate("author_id", "username image");

        return utils.handlerResponse(res, "OK", {
            message: "Get History by user id success!",
            data: listBlogs,
        });
    } catch (error) {
        return utils.handlerResponse(res, "INTERNAL_ERROR", {
            message: error?.message || error || `Internal Server Error`,
        });
    }
};

export default { create, historyUserByBlogId, historyByUserId };
