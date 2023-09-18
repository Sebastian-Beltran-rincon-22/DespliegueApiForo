const Publication = require('../../models/PublicationsModels/publications');
const User = require('../../models/user');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;



const controllerPublication = {
    create: async (req, res) => {
        try {
            const {userId,description,image} = req.body
            const date_create = new Date();

            console.log("UserID:", userId)

            const user = await User.findById(userId) // buscar el ID del usuario
            if (!user){
                return res.status(404).json({error: "could not find user"})
            }

            const newPublication =  await Publication.create({
                user: user._id,
                date_create: date_create,
                description: description,
                image: image,
                likes: []
            });
            newPublication.likes = likes.map((userId) => mongoose.Types.ObjectId(userId));
            await newPublication.save()
            res.json({ msg: 'publication created', publication: newPublication });
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getPublication: async (req, res) => {
        try {
            const publications = await Publication.find({})
            res.json(publications.reverse())
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getPublicationById: async (req, res) => {
        try {
            const { id } = req.params
            const publication = await Publication.findById(id)
            res.json(publication)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updatePublication: async (req, res) => {
        try {
            const { id } = req.params
            const user = req.body.user
            const description = req.body.description
            const image = req.body.image

            await Publication.findByIdAndUpdate(id, {
                user: user._id,
                description: description,
                image: image,
            })
            res.json({ msg: 'Update' })
        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    },
    deletePublication: async (req, res) => {
        try {
            const { id } = req.params
            await Publication.findByIdAndDelete(id)
            res.json({ msg: "Publication deleted" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

     // Dar like a una publicación
    likePublication: async (req, res) => {
        try {
            const { id } = req.params;
            const { userId } = req.body;

            // Verifica si userId es un ObjectId válido
            if (!ObjectId.isValid(userId)) {
                return res.status(400).json({ error: 'userId no es válido' });
            }
    
            console.log(userId)

            const publication = await Publication.findById(id);

            if (!publication) {
                return res.status(404).json({ error: 'Publicación no encontrada' });
            }

            
            if (publication.likes.includes(userId)) {
                return res.status(400).json({ error: 'El usuario ya ha dado like a esta publicación' });
            }

            publication.likes.push(userId);
            await publication.save();

            res.json({ msg: 'Like agregado correctamente', publication});
        } catch (error) {
            return res.status(500).json({ msg: 'Error al dar like a la publicación', error: error.message });
        }
    },

    // Quitar like a una publicación
    unlikePublication: async (req, res) => {
        try {
            const { id } = req.params;
            const { userId } = req.body;

            // Verifica si userId es un ObjectId válido
            if (!ObjectId.isValid(userId)) {
                return res.status(400).json({ error: 'userId no es válido' });
            }

            console.log(userId)
    
            const publication = await Publication.findById(id);

            if (!publication) {
                return res.status(404).json({ error: 'Publicación no encontrada' });
            }

            if (!publication.likes.includes(userId)) {
                return res.status(400).json({ error: 'El usuario no ha dado like a esta publicación'});
            }

            publication.likes = publication.likes.filter(user => user.toString() !== userId);
            await publication.save();

            res.json({ msg: 'Like quitado correctamente', publication});
        } catch (error) {
            return res.status(500).json({ msg: 'Error al quitar like a la publicación', error: error.message});
        }
    }

}

module.exports = controllerPublication