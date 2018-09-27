// normalize action

import { sourceOpTarget } from '../utils/source-op-target';
import { validateSourceTarget } from '../../core-providers/file-services/file-validators/validate-source-target';
import { promises as jsonld, JsonLd, NormalizeOptions } from 'jsonld';
import { validated } from '../../core-providers/file-services/file-validators/validation-constant';


export function normalizeAction(sourceFile: string, targetFile: string, options: NormalizeOptions): Promise<string> {

    return validateSourceTarget({name: sourceFile, title: 'source file'}, {name: targetFile, title: 'target file'})
            .then(valid => { if (valid === validated()) {
                                                               return sourceOpTarget<JsonLd>(sourceFile, targetFile, jsonld.normalize, options);
                                                              }
                                 else { return valid; }
                            });
}
