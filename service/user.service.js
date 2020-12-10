const { Sequelize, where } = require('sequelize');
const mydb = new Sequelize('postgres://postgres:1234@127.0.0.1:5432/mydb');
const usersmodel = mydb.define('users', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});
usersmodel.sequelize.sync();


class UsersService {

	getUsers = (res) => {
		usersmodel.findAll()
			.then(data => res.send(data))
			.catch(err => 'Try again')
	};

	getUserById = (res, id) => {
		usersmodel.findByPk(id)
			.then(data => res.send(data))
			.catch(err => 'User not found')
	};

	addUser = (res, body) => {
		usersmodel.findOrCreate({where:{name:`${body.name}`, password:`${body.password}`}})
			.then(() => res.send('user created'))
			.catch(err => res.send(err.message))
	};

	changeUser = (res, body, id) => {
		usersmodel.findByPk(id)
			.then(data => {
				data.password = body.password;
				res.send(data);
			})
			.catch(err => res.send(err.message))
	};

	deleteUser = (res, id) => {
		usersmodel.destroy({where:{id:`${id}`}})
			.then(data => res.send('user deleted'))
			.catch(err => res.send(err.message))
	};
};


module.exports = new UsersService();