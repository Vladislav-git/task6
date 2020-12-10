const usersService = require('../service/user.service.js');


class UsersController {
	service = usersService

	get = (req, res, next) => {
		this.service.getUsers(res)
	};

	getById = (req, res, next) => {
		this.service.getUserById(res, req.params.id)
	};

	add = (req, res, next) => {
		this.service.addUser(res, req.body)
	};

	change = (req, res, next) => {
		this.service.changeUser(res, req.body, req.params.id)
	};
	
	delete = (req, res, next) => {
		this.service.deleteUser(res, req.params.id)
	}
}


module.exports = new UsersController();