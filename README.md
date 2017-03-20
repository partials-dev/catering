# Partials Cooking App

> A simple utility for the band to use because we CANNOT remember whose turn it is to cook for rehersal.

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)


## What's new:
 - Activity log with undo function!

## Features:
 - Pulls events from a google calendar
 - Lazily loads and assigns members to cook on those days
 - Functionality to set, add, delete, and swap cooks around
 - Fancy material interface!
 - Authentication: Doesn't mess with the database when logged out
 - set uncatered rehersals by adding 'uncatered' to the description of the calendar event.

 ## Deployment

 Build with `meteor build ./.bin/ --architecture os.linux.x86_64`
