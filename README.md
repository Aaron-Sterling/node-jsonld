# node-jsonld

NodeJS interface with JSON-LD library. Run compact, expand, flatten algorithms, etc., by reading from and writing to local files. Verbose error messages and help messages are built in. Uses jsonld.js as a peer dependency and requires Node 8 or higher.

## Installation

```
npm install jsonld node-jsonld
npm install types/jsonld --save-dev
```

**IMPORTANT: You need Python 2.x (2.7 recommended) in order to build jsonld**. jsonld has the [node-gyp](https://github.com/nodejs/node-gyp) library as a dependency. Building the node-gyp library requires Python 2.x; it *does not work* with Python 3.x. You do not need to know any Python to use this tool; the language is invisible after the build process.

## Usage

You can either use the NodeJS ``require`` function, or ES6 import syntax, as follows.

```
import { compact } from 'node-jsonld';

const sourceFile = 'NameOfSourceFile.json';
const contextFile = 'NameOfContextFile.json';
const targetFile = 'NameOfTargetFile.json';

compact(sourceFile, contextFile, targetFile).then(res => console.log(res)); 

// res is 'operation successful' if the compact operation was successful
//     is an error message otherwise
```

If not specified, the default value for the target file is ``targetFile.json``. Advanced users can specify options for the JSON-LD operations. If not specified, simple default options are used.

Help messages are available for all operations. The messages closely follow the documentation of jsonld.js. You can use a getter to grab each help message as a string, and then display it however you wish, such as in a tooltip.

```
import { getcompactHelpMessage } from 'node-jsonld';

const compactHelpMessage = getCompactHelpMessage();
```

## Related

See also the JSON-LD NodeJS command line tool [jldc](https://github.com/Aaron-Sterling/jldc), which uses related code. Both node-jsonld and jldc have as a peer dependency the official JSON-LD Javascript library [jsonld.js](https://github.com/digitalbazaar/jsonld.js/), written and supported by DigitalBazaar. For Angular users, [ngx-jsonld-provider](https://github.com/Aaron-Sterling/ngx-jsonld-provider) is available, and Cory Rylan has written [ngx-json-ld](https://github.com/coryrylan/ngx-json-ld), which uses an Angular component (not a provider) to connect to JSON-LD operations.
