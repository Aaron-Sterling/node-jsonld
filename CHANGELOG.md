# node-jsonld changelog

## 1.0.0

Added Inversion-of-Control-friendly code with Inversify.

**Breaking Change**: All methods now available through ``nodeJsonLd``. For example:
```
import { nodeJsonLd } from 'node-jsonld';
console.log(nodeJsonLd.getCompactHelpMessage());
```

*not the following*

```
import { getCompactHelpMessage } from 'node-jsonld'; // no longer works
// etc.
```

### 0.1.0 (26 September 2018)

First publication.