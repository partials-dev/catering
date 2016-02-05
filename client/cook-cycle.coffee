# Description:
#   Tracks cooking responsibilities for use with Google Calendar.
#
# Dependencies:
#   Not much
#
# Configuration:
#	  I dunno yet.
#
# Commands:
#
# Author:
#	Ian Edwards
#

capitalize = (word) ->
  word.charAt(0).toUpperCase() + word.slice 1

default_cooks = ['thomas', 'ian', 'jeff', 'adriana', 'dane']


class MealCycle
	constructor: () ->
    @upcoming_cooks = [] # lazily generate repeating list based on default_cooks
    @upcoming_rehearsals = [] # lazily get calendar events from rehearsal calendar

  next: () ->
    null







# OLD FUNCTIONALITY - REFACTOR BEFORE BRINGING UP

  mealMade: () -> #after end of reharsal calendar event, slice off [0] of both lists
    @upcoming_cooks.shift()
    @upcoming_rehearsals.shift()

  addTurn: (name) ->
    @upcoming_cooks.unshift(name.toLowerCase())

  exemptEvent: (date) -> #remove an event pulled from the calendar from the food list (i.e. recording)
    null

  # Reporting
  whosNext: () -> # returns the next cook on the list
    return "It is #{capitalize @upcoming_cooks[0]}'s turn to cook on #{@upcoming_rehearsals[0].date}."

  whoCooksOn: (date) ->
    if date?
      i = @upcoming_rehearsals.indexOf(date)
      return capitalize(@upcoming_cooks[i])
    else
      return 'Calendar event not found'

###
module.exports = (robot) ->
	robot.hear /dinner/i, (res) ->
		command =
			channel:
				id: res.message.rawMessage.channel
        name: res.message.room
			type:

		robot.emit

	robot.on 'cookCommand', (request, command, message) ->
	    envelope = room: request.channel.id

	    robot.send envelope, command
		robot.emit command.message
###
