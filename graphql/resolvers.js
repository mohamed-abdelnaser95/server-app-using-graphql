const { UserInputError, ApolloError } = require('apollo-server')
const { Op, QueryTypes } = require("sequelize");
const { User, sequelize } = require('../models')

const resolvers = {
    Query: {
        getUsers: async() => {
            try {
                const users = await User.findAll()
                return users
            }catch(err) {
                console.log(err)
            }
        },

        getUserById: async ( _, { id } )=> {
            try {
                const user = await User.findByPk(id)
                if(!user) return "Cant find User!!"
                return user
            }catch(err) {
                console.log(err)
            }
        }, 

        getUsersByEmail: async ( _, { strEmail } )=> {
            try {
                // const users = await sequelize.query("SELECT * FROM cbmisdb.users WHERE strEmail like '%@Gmail.com'", {
                //     type: QueryTypes.SELECT
                // });
                const users = await User.findAll({where : { strEmail: {[Op.endsWith]: strEmail} }})
                if(!users || users.length == 0) console.log ("Cant find User!!")
                return users
            }catch(err) {
                console.log(err.message)
            }
        },

        loginUser: async ( _, { strEmail, strPassword } )=> {
            try {
                const user = await User.findOne({where : { strEmail, strPassword }})
                if(!user) throw new Error ("Email or password is wrong!!")
                return user
            }catch(err) {
                console.log(err)
                throw new UserInputError("bad Input", { errors: err})
            }
        },
    },

    Mutation: {
        addUser: async ( _, args)=> {
            try{
                console.log(args)
                const { strName, dtmDOB, strEmail, strPassword, blnIsActive } = args
                const newUser = await User.create({
                    strName, 
                    dtmDOB, 
                    strEmail, 
                    strPassword, 
                    blnIsActive
                })
                return newUser
            }catch(err) {
                console.log(err)
                throw err
            }   
        },

        deleteUser: async (_, { id }) =>{
            try{
                const user = await User.findByPk(id)
                if(!user) throw new Error("No user found to delete it, please check the input")
                await user.destroy()
                return "User deleted"
            }catch(err){
                console.log(err)
            }
        },

        updateUser: async ( _, args)=> {
            try{
                // const { id ,strName, dtmDOB, strPassword, strEmail } = args
                const user = await User.findByPk(args.id)
                const userUpdated = await user.update({
                    ...args
                })
                if(!user) throw new Error("No user found for update, please check the input")
                return userUpdated
            }catch(err) {
                console.log(err)
                throw new ApolloError("Error to update the user")
            }
        },

        updateUserStatus: async ( _, args)=> {
            try{
                const { strEmail, blnIsActive } = args
                const user = await User.findOne({where : { strEmail }})
                const updateStatus = await user.update({
                    blnIsActive 
                })
                if(!user) throw new Error("No user found for update, please check the input")
                return updateStatus
            }catch(err) {
                console.log(err)
                throw new ApolloError("Error to update the user")
            }
        },
    }
}

module.exports = resolvers;