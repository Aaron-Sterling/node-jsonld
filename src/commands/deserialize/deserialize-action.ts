// deserialize


import { sourceOpTarget } from '../utils/source-op-target';
import { validateSourceTarget } from '../../core-providers/file-services/file-validators/validate-source-target';
import { promises as jsonld, JsonLd, JsonLdObject, FromRdfOptions } from 'jsonld';
import { validated } from '../../core-providers/file-services/file-validators/validation-constant';
                        

export function deserializeAction(sourceFile: string, targetFile: string, options: FromRdfOptions): Promise<string> {

    const deserialize = (val: JsonLdObject) => jsonld.fromRDF(JSON.stringify(val));
    return validateSourceTarget({name: sourceFile, title: 'source file'}, {name: targetFile, title: 'target file'})
            .then(valid => { if (valid === validated()) {
                                                               return sourceOpTarget<JsonLd>(sourceFile, targetFile, deserialize, options);
                                                              }
                                else { return valid; }
                            });
}
