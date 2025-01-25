## Backend Commands Documentation

Transpile typescript into JavaScript code into ```server/build```. This code will be used in production.
```Bash
npm run build
``` 
Runs transpile and runs the server.
```Bash
npm run start
``` 
Continuously executes typescript code once changes are made to the typescript files. Uses ```ts-node``` to directly executes the typescript without transpiling and ```nodemon``` to watch for changes to code.
```Bash
npm run dev
``` 
Lints the entire backend.
```Bash
npm run lint
``` 
Runs test suites.
```Bash
npm run test
``` 

Additional scripts can be added to ```package.json``` file.