# Partials Cooking App

A simple utility for the band to use because we CANNOT remember whose turn it is to cook for rehersal.

## Features:
 - Pulls events from a google calendar
 - Lazily loads and assigns members to cook on those days
 - Functionality to set, add, delete, and swap cooks around
 - Fancy material interface!
 - Authentication: Doesn't mess with the database when logged out
 - set uncatered rehersals by adding 'uncatered' to the description of the calendar event.

 ## Deployment

 Build with `meteor build ./.bin/ --architecture os.linux.x86_64`
