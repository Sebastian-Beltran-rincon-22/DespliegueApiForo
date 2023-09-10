const Interactions = require('../../models/PublicationsModels/interactions')
const Publication = require('../../models/PublicationsModels/publications')
const User = require('../../models/user')

const interacControllers = {

    // manejo de likes
    likeInteraction: async (req, res) => {
        try {
            const { id } = req.params;
            const interaction = await Interactions.findById(id);
    
            if (!interaction) {
                return res.status(404).json({ error: 'Interacción no encontrada' });
            }
    
            const userId = req.user.id; // Obtén el ID del usuario autenticado
            const publicationId = interaction.publication;
    
            // Obtén la publicación asociada al publicationId
            const publication = await Publication.findById(publicationId);
    
            if (!publication) {
                return res.status(404).json({ error: 'Publicación no encontrada' });
            }
    
            // Verifica si el usuario ya ha dado like a esta interacción
            if (interaction.reactions.includes(userId)) {
                return res.status(400).json({ error: 'El usuario ya ha dado like a esta interacción' });
            }
    
            // Incrementa el contador de likes de la publicación
            publication.likesCount += 1;
    
            // Agrega el ID del usuario a la lista de reacciones y guarda la interacción
            interaction.reactions.push(userId);
            await interaction.save();
    
            // Guarda la publicación actualizada
            await publication.save();
    
            res.json({ msg: 'Like agregado correctamente' });
        } catch (error) {
            return res.status(500).json({ msg: 'Error al dar like a la interacción' });
        }
    },
    
    
    unlikeInteraction: async (req, res) => {
        try {
            const { id } = req.params;
            const interaction = await Interactions.findById(id);
    
            if (!interaction) {
                return res.status(404).json({ error: 'Interacción no encontrada' });
            }
    
            const userId = req.user.id; // Obtén el ID del usuario autenticado
    
            // Verifica si el usuario ha dado like a esta interacción
            if (!interaction.reactions.includes(userId)) {
                return res.status(400).json({ error: 'El usuario no ha dado like a esta interacción' });
            }
    
            // Quita el ID del usuario de la lista de reacciones y guarda la interacción
            interaction.reactions = interaction.reactions.filter(reactionId => reactionId !== userId);
            await interaction.save();
    
            res.json({ msg: 'Like quitado correctamente', likesCount: interaction.reactions.length });
        } catch (error) {
            return res.status(500).json({ msg: 'Error al quitar like de la interacción' });
        }
    },
    

}

module.exports = interacControllers