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

export default { create };
