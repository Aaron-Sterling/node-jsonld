// frame action

import { sourceModifierOperation } from '../utils/source-mod-op-target';
import { validateSourceModifierTarget } from '../../core-providers/file-services/file-validators/validate-source-mod-target';
import { promises as jsonld, FrameOptions } from 'jsonld';
import { validated } from '../../core-providers/file-services/file-validators/validation-constant';

                             
export function frameAction(sourceFile: string, frameFile: string, targetFile: string, options: FrameOptions): Promise<string> {

    return validateSourceModifierTarget({name: sourceFile, title: 'source file'}, {name: frameFile, title: 'frame file'}, {name: targetFile, title: 'target file'})
            .then(valid => { if (valid === validated()) {
                                                               return sourceModifierOperation(sourceFile, frameFile, targetFile, jsonld.frame, options);
                                                              }
                                     else { return valid; }
                                });
}
