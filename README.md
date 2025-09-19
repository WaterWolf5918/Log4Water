# Log⁴Water
A javascript / typescript logger built to be used for all my personal projects.
## How to build
1. ``
npm i
``

2. ``
npm run build
``
## How to use in other projects
Copy the file ``/out/log4water-{version}.js`` to the directory of the other project. Than use either import or require to import the package and create a new logger. 
```js
import { Logger } from "./log4water-0.0.1.js";
const logger = new Logger("Logger ID / Entry Point (Main/Filename/etc)");
```
> [!NOTE]
> There are plans to publish the package to npm in the future but there is currently not a npm download.