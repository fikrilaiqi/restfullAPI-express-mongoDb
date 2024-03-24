import blogSchema from "../schemas/blogSchema.js";
import utils from "../utils/index.js";

const getAll = async (req, res) => {
    try {
        const blogs = await blogSchema
            .find({})
            .populate("author_id", "username image");
        return utils.handlerResponse(res, "OK", {
            message: "Get All Blogs Success!",
            data: blogs,
        });
    } catch (error) {
        return utils.handlerResponse(res, "INTERNAL_ERROR", {
            message: error?.message || error || `Internal Server Error`,
        });
    }
};

export default { getAll };
