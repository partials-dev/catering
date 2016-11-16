import defaultUserCredentials from './gitignore/user-credentials'
import { Accounts} from 'meteor/accounts-base'

const existingUser = Accounts.findUserByUsername(defaultUserCredentials.username)

if (!existingUser) {
  Accounts.createUser(defaultUserCredentials)
}
