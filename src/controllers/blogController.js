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

const create = async (req, res) => {
    try {
        const input = req.body;
        const file = req.files;

        //upload file
        const { fileName, error: errFileUpload } = utils.processUploadFile(
            file.thumbnail
        );
        if (errFileUpload) {
            throw Error(errFileUpload);
        }

        const authorId = req.authData._id;
        const createBlog = {
            ...input,
            author_id: authorId,
            thumbnail: fileName,
            tags: input?.tags ? input?.tags.split(",") : "",
        };

        const create = blogSchema.create(createBlog);
        return utils.handlerResponse(res, "CREATED", {
            message: "Create Blog Success!",
            data: create,
        });
    } catch (error) {
        return utils.handlerResponse(res, "INTERNAL_ERROR", {
            message: error?.message || error || `Internal Server Error`,
        });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const existBlog = await blogSchema
            .findById(id)
            .populate("author_id", "username image");
        if (!existBlog) {
            return utils.handlerResponse(res, "NOT_FOUND", {
                message: "Not Found Blog!",
            });
        }
        return utils.handlerResponse(res, "OK", {
            message: "Get Blog By Id Success!",
            data: existBlog,
        });
    } catch (error) {
        return utils.handlerResponse(res, "INTERNAL_ERROR", {
            message: error?.message || error || `Internal Server Error`,
        });
    }
};

export default { getAll, create, getById };
