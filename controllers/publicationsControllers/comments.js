const Publication = require('../../models/PublicationsModels/publications');
const User = require('../../models/user');
const Comments = require('../../models/PublicationsModels/comments')

const commentController ={

    createComment: async (req, res) => {
        try {
            const { content, publicationId } = req.body;
            let userId = null;

            // Verifica si el usuario está autenticado y obtén su ID
            if (req.user && req.user.id) {
                userId = req.user.id;
            } else {
                // Si el usuario no está autenticado, intenta encontrarlo por su nombre de usuario
                const { username } = req.body; // Asume que tienes el nombre de usuario en la solicitud
                const user = await User.findOne({ username });

                if (user) {
                    userId = user._id;
                } else {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
            }
            
            // Verifica si la publicación a la que se está comentando existe
            const publication = await Publication.findById(publicationId);
    
            if (!publication) {
                return res.status(404).json({ error: 'Publicación no encontrada' });
            }
    
            const newComment = new Comments({
                content,
                user: userId,
                publication: publicationId, // Asocia el comentario a la publicación
                
            });
    
            await newComment.save();
    
            res.json({ msg: 'Comentario creado correctamente', comment: newComment });
        } catch (error) {
            return res.status(500).json({ msg: error.message});
        }
    },
    
    updateComment: async (req, res) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const userId = req.user.id; // Obtén el ID del usuario autenticado
    
            const comment = await Comments.findById(id);
    
            if (!comment) {
                return res.status(404).json({ error: 'Comentario no encontrado' });
            }
    
            // Verifica si el usuario que intenta actualizar el comentario es el autor
            if (comment.user.toString() !== userId) {
                return res.status(403).json({ error: 'No tienes permiso para actualizar este comentario' });
            }
    
            comment.content = content;
            await comment.save();
    
            res.json({ msg: 'Comentario actualizado correctamente', comment });
        } catch (error) {
            return res.status(500).json({ msg: 'Error al actualizar el comentario' });
        }
    },
    
    deleteComment: async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id; // Obtén el ID del usuario autenticado
    
            const comment = await Comments.findById(id);
    
            if (!comment) {
                return res.status(404).json({ error: 'Comentario no encontrado' });
            }
    
            // Verifica si el usuario que intenta eliminar el comentario es el autor
            if (comment.user.toString() !== userId) {
                return res.status(403).json({ error: 'No tienes permiso para eliminar este comentario' });
            }
    
            await comment.remove();
    
            res.json({ msg: 'Comentario eliminado correctamente' });
        } catch (error) {
            return res.status(500).json({ msg: 'Error al eliminar el comentario' });
        }
    },
    getComments: async (req, res) => {
        try {
            const comments = await Comments.find({})
            res.json(comments.reverse())
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    getCommentsByPublicationId: async (req, res) => {
        try {
            const { publicationId } = req.params;
            const comments = await Comments.find({ publication: publicationId });
            res.json(comments);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

module.exports = commentController