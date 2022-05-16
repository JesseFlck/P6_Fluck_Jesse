// Import du modèle sauces
const Sauces = require('../models/sauces');


// Gestion des likes et dislikes

module.exports = {
    likeDislike: (req, res) => {
        const id = req.params.id;
        // Gestion des likes
        if (req.body.like === 1) {
            Sauces.updateOne(
                { _id: id },
                {
                    $inc: { likes: req.body.like++ },
                    $push: { usersLiked: req.body.userId },
                }
            )

                .then(() => res.status(200).json({ message: '+1 like' }))
                .catch((error) => res.status(400).json({ error }));
        } else if (req.body.like === -1) {
        // Gestion des dislikes
            Sauces.updateOne(
                { _id: id },
                {
                    $inc: { dislikes: req.body.like++ * -1 },
                    $push: { usersDisliked: req.body.userId },
                }
            )

                .then(() => res.status(200).json({ message: '+1 dislike' }))
                .catch((error) => res.status(400).json({ error }));
        } else {
        // MAJ des likes et dislikes déjà effectifs
            Sauces.findOne({ _id: id })
                .then((sauce) => {
                    if (sauce.usersLiked.includes(req.body.userId)) {
                        Sauces.updateOne(
                            { _id: id },
                            {
                                $pull: { usersLiked: req.body.userId },
                                $inc: { likes: -1 },
                            }
                        )

                            .then(() =>
                                res.status(200).json({ message: 'like -1' })
                            )
                            .catch((error) => res.status(400).json({ error }));
                    } else if (sauce.usersDisliked.includes(req.body.userId)) {
                        Sauces.updateOne(
                            { _id: id },
                            {
                                $pull: { usersDisliked: req.body.userId },
                                $inc: { dislikes: -1 },
                            }
                        )
                            .then(() =>
                                res
                                    .status(200)
                                    .json({ message: 'Dislike -1 !' })
                            )
                            .catch((error) => res.status(400).json({ error }));
                    }
                })
                .catch((error) => res.status(400).json({ error }));
        }
    },
};
