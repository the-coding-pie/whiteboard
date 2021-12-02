# WhiteBoard

A simple realtime whiteboard where user's can draw using different colors on the board.

![Screenshot from 2021-12-02 13-56-02](https://user-images.githubusercontent.com/63698375/144386492-824176ad-2f03-4a8d-b286-d398f5530f66.png)


# Technologies Used

## Frontend
- React + Typescript
- Tailwind CSS
- Socket IO Client
- Context API

## Backend
- Node + Typescript
- Express
- Socket IO


 ## How to setup locally on your computer
 
 ### Prerequisites
 
 In order to run this project on your computer, you must have the following technologies installed on your computer:
 
  - Node JS and npm/yarn
  
 ### Steps

1. `git clone` or `Download ZIP` this repo `https://github.com/the-coding-pie/whiteboard.git`
2. Now `cd` into the root directory (ie, whiteboard): 
 
``` bash
cd whiteboard
```

3. Install server dependencies

```bash
 cd server
 yarn install
```

4. Install client dependencies

```bash
 cd client
 yarn install
```

5. Create `.env` file directly inside `server` folder and add these values (replace corresponding values):

```
PORT=8000
```

6. Start the server

```bash
 cd server
 yarn start
```

7. Start the client

```bash
 cd client
 yarn start
```

8. Visit [http://localhost:3000](http://localhost:3000)

Open different tabs and draw. Your drawing will be broadcasted to all the other clients in realtime!
