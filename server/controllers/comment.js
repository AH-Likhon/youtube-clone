// --------------------------------------- ADD COMMENT --------------------------- //
export const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    try {

    } catch (error) {
        next(error);
    }
};


// ------------------------------------- DELETE COMMENT -------------------------- //
export const deleteComment = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
};


// --------------------------------------- GET COMMENTS -------------------------- //
export const getComments = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
}