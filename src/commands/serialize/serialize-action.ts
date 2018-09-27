// serialize action

import { sourceOpTarget } from '../utils/source-op-target';
import { validateSourceTarget } from '../../core-providers/file-services/file-validators/validate-source-target';
import { promises as jsonld, ToRdfOptions } from 'jsonld';
import { validated } from '../../core-providers/file-services/file-validators/validation-constant';
         

export function serializeAction(sourceFile: string, targetFile: string, options: ToRdfOptions): Promise<string> {

    return validateSourceTarget({name: sourceFile, title: 'source file'}, {name: targetFile, title: 'target file'})
            .then(valid => { if (valid === validated()) {
                                                 return sourceOpTarget<string>(sourceFile, targetFile, jsonld.toRDF, options);
                                                }
                                else { return valid; }
                            });
}