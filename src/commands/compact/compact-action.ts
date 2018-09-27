// compact function


import { sourceModifierOperation } from '../utils/source-mod-op-target';
import { validateSourceModifierTarget } from '../../core-providers/file-services/file-validators/validate-source-mod-target';
import { promises as jsonld, CompactOptions, JsonLd } from 'jsonld';
import { validated } from '../../core-providers/file-services/file-validators/validation-constant';


                             


export function compactAction(sourceFile: string, contextFile: string, 
                              targetFile: string, options: CompactOptions): Promise<string> {

    return validateSourceModifierTarget({name: sourceFile, title: 'source file'}, {name: contextFile, title: 'context file'}, {name: targetFile, title: 'target file'})
            .then(valid => { if (valid === validated()) {
                                                               return sourceModifierOperation<JsonLd>(sourceFile, contextFile, targetFile, jsonld.compact, options);
                                                              }
                                else { return valid }
                            });
}






