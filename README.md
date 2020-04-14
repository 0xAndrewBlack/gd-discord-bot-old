# GD Discord BOT

A simple bot **GD BOT** which just tags you and notifies you on Discord in a specific channel.
Tags you or your group who has lesson.

# Idea

A user has the class and the group role, and if his class is present he or his group gets a ping in the server.
Everybody can add their own timetable (1file and has the groups n stuff).
The BOT can DM you and can notify you that your class is starting, also pings the server, it can be changed and managed in the future.

# How it works?

In a .js file we have the whole timetable. (Now just for my class 12E but we plan it to add others)
In a config.js we have the BOT and the token for it.
Hosted on heroku with a simple worker.

# Commands

|   Command    | Description                       | Implemented | Syntax                   | Response                 |
| :----------: | --------------------------------- | ----------- | ------------------------ | ------------------------ |
|     help     | Shows help                        | ✅          | help <command>           | Embed with summary.      |
|  clearchat   | clearing messages                 | ✅          | clearchat or clearchat n | N/A                      |
|    reload    | reload a command                  | ✅          | reload <command>         | Command reloaded.        |
|     ping     | Dev Command                       | ✅          | ping                     | BOT: Pong!               |
|    getOra    | Get a specific class              | ❌          | getora <ora>             | Matek will start at 8:00 |
| getTimeTable | Get the full timetable of a class | ❌          | getTimeTable <12E:ID>    | {timetable}              |
|  checkClass  | Checks if a class is present      | ❌          | checkClass <12E>         | Yes, Matek óra van.      |

## Collaborate

1. Clone the repo
2. Enter a CLI and type `yarn install or npm i`
3. To start the development server type `npm run devStart`
4. Make changes
5. Open a PR (Pulll-Request)
6. Wait :)

## TODO

1. Make the bot parse the time and date, based on the lesson
2. Add command to get the timetable
3. Add command to get the current lesson
4. Add API
5. Collaborative something to upload 10 class and just import the one you need to work with it

> **Note:** It's still in development
