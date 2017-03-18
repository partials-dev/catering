import defaultUserCredentials from './gitignore/user-credentials'
import { Accounts } from 'meteor/accounts-base'
// import stringify from 'json-stringify-safe'

const existingUser = Accounts.findUserByUsername(defaultUserCredentials.username)

// const allAccounts = Meteor.users.find({}).fetch()
// console.log(`Existing user: ${stringify(allAccounts)}`)

if (!existingUser) {
  Accounts.createUser(defaultUserCredentials)
}
