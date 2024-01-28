## ESlint Documentation

### Why?

Linter helps enforce consistent style through source code and prevent code-smells.

### Usage
Install vscode eslint extension to use linter issues inline.
```JavaScript
npm run lint // Lints the entire backend
``` 
```JavaScript
npm run lint -- --fix // To fix fixable linter issues
``` 
```JavaScript
npx eslint {dir/} // To lint a specific directory or file
``` 

### How to Disable Rules
To disable linting current line.
```JavaScript
// eslint-disable-line {rule}
```
To disable linting next line.
```JavaScript
// eslint-disable-next-lint {rule}
```
To disable linting the entire file, add to the top of the file.
```JavaScript
/* eslint-disable {rule} */
```

### Configuration
```.eslintignore``` configures the files for the linter to ignore.
```.eslintrc.cjs``` configures the specifies the rules of the linter.
