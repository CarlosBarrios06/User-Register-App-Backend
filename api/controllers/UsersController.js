/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createUser: async (req, res) => {
        const data = req.body;

        try {
            const user = await Users.create({
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                age: data.age,
            }).fetch();
            res.send(user);
        } catch (error) {
            res.status(200).send(error);
        }
    },

    updateUser: async (req, res) => {
        const data = req.allParams();

        try {
            const user = await Users.update({ id: data.id }).set({
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                age: data.age,
            }).fetch();
            res.send(user);
        } catch (error) {
            res.status(200).send(error);
        }
    },

    deleteUser: async (req, res) => {
        const data = req.params;

        try {
            const user = await Users.destroy({
                id: data.id
            }).fetch();
            res.send(user);
        } catch (error) {
            res.status(200).send(error);
        }
    },
    getUser: function (req, res) {
        Users.find()
            .then(function (users) {
                if (!users || users.lenght === 0) {
                    return res.send({
                        'succes': false,
                        'message': 'no records found'
                    })
                }
                return res.send({
                    'succes': true,
                    'message': 'records fetched',
                    'data': users
                })
            })
            .catch(function (error) {
                sails.log.debug(error)

                return res.send({
                    'succes': false,
                    'message': 'unable to fetch records'
                })
            });
    },
    async findOne(req, res) {
        try {
            const user = await Users.findOne({
                id: req.params.id
            });
            return res.ok(user);
        } catch (error) {
            return res.serverError(error);
        }
    },

};

