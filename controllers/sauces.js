// Import du modèle sauces

const Sauces = require('../models/sauces');
const fs = require('fs');

module.exports = {
    // Récupération de l'affichage de la liste de toutes les sauces
    list: (req, res) => {
        Sauces.find()
            .then((sauces) => res.status(200).json(sauces))
            .catch((error) => res.status(400).json({ error }));
    },
    // Récupération d'une sauce précise
    show: (req, res) => {
        const id = req.params.id;
        Sauces.findOne({ _id: id })
            .then((sauce) => res.status(200).json(sauce))
            .catch((error) => res.status(404).json(error));
    },
    // Création de sauces
    create: (req, res) => {
        const sauceObject = JSON.parse(req.body.sauce);
        delete sauceObject._id;
        let Sauce = new Sauces({
            ...sauceObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        });

        Sauce.save()
            .then(() =>
                res.status(201).json({ message: 'Sauce enregistrée !' })
            )
            .catch((error) => res.status(400).json({ error }));
    },
    // Modification d'une sauce
    update: (req, res) => {
        const id = req.params.id;

        if (req.file) {
            Sauces.findOne({ _id: id })
                // Suppression de l'image de la sauce dans le dossier images
                .then((sauceImg) => {
                    const fileName = sauceImg.imageUrl.split('/images')[1];
                    fs.unlink(`images/${fileName}`, (error) => {if (error) throw error;});
                });
        }
        // Modification du corps de la sauce
        const sauceUpdate = req.file
            ? {
                  ...JSON.parse(req.body.sauce),
                  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
              }
            : { ...req.body };

        Sauces.updateOne({ _id: id }, { ...sauceUpdate, _id: id })

            .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
            .catch((error) => res.status(400).json({ error }));
    },
    // Suppression d'une sauce
    remove: (req, res) => {
        const id = req.params.id;
        Sauces.findOne({ _id: id })
            .then((sauceImgDelete) => {
                const filename = sauceImgDelete.imageUrl.split('/images')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauces.deleteOne({ _id: id })
                        .then(
                            res.status(200).json({ message: 'Sauce effacée de la base de donnée' })
                        )
                        .catch((error) => res.status(404).json({ error }));
                });
            })
            .catch((error) => res.status(500).json({ error }));
    },
};
