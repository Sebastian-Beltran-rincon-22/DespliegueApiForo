const Interactions = require('../../models/PublicationsModels/interactions')
const Publication = require('../../models/PublicationsModels/publications')
const interactions = require('../../models/PublicationsModels/interactions')

const interacControllers = {

    create: async (req,res) =>{

        try{
        const {publicationId,reactions,comments,shares} = req.body

        console.log("PublicationID:", publicationId)

        const publication = await Publication.findById(publicationId) //Share Id Publications
        if(!publication){
            return res.status(404).json({error:'this action is not possible'}) //nou found
        }

        await Interactions.create({
            publication: publication._id,
            reactions: reactions,
            comments: comments,
            shares: shares
        })
        console.log('Interaction created');
        const response = {
            msg: 'New interaction created',
            interactions: {
                _id: interactions._id,
                reactions: interactions.reactions,
                comments: interactions.comments,
                shares: interactions.shares
            }
        }
        res.json({ response }); //
        }catch(error){
            return res.status(500).json({ msg: error.message })
        }
    },

    getInreract: async(req,res) =>{
        try{
            const interactions = await Interactions.find({})
            res.json(interactions)
        }catch (error){
            return res.status(500).json({ msg: error.message })
        }
    },
    getInteraById: async (req, res) => {
        try {
            const { id } = req.params
            const interaction = await Interactions.findById(id)
            res.json(interaction)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateInterac: async (req,res) =>{
        try{
            const {id} = req.params
            const {reactions,comments,publicationId,shares} = req.body

            await Interactions.findByIdAndUpdate(id,{
                publicationId: publicationId,
                reactions: reactions,
                comments: comments,
                shares: shares
            })
            res.json({msg: 'Update'})
            console.log(Interactions)

        }catch(error){
            return res.status(404).json({msg: error.message})
        }
    },
    deleteInterac: async (req,res) =>{
        try{
            const {id} = req.params
            await Interactions.findByIdAndDelete(id)
            res.json({msg: 'Deleted'})
        }catch (error){
            return res.status(400).json({msg: error.message})
        }
    }
}

module.exports = interacControllers