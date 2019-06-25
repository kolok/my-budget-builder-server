import { User } from '../models/User'
import { Company } from '../models/Company'

class UserController {
    async index(ctx) {
        //Init a new user object
        const query = ctx.query

        //Get list of user
        try {
            let result = await User.findAll()
            ctx.body = result
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA' + error)
        }
    }
    async getCompany(ctx) {
        // get company id from params
        const params = ctx.params
        if (!params.id) ctx.throw(400, 'INVALID_DATA')

        //Get list of users which belongs to the company
        try {
            let result = await User.findByPk(params.id, {include: [{model:Company, as:'company'}]}).then(user => {return user})
            ctx.body = result
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA')
        }
    }
}

export default UserController
