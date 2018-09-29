// compact function

import { injectable, inject } from 'inversify';
import { TYPES } from '../../inversify/types';
import { OperationExecutionService } from '../../core-providers/operation-execution-service/operation-execution-service';
import { FileValidationService } from '../../core-providers/file-services/file-validators/file-validation-service';
import { promises as jsonld, CompactOptions, JsonLd } from 'jsonld';
import { validated } from '../../core-providers/file-services/file-validators/validation-constant';


@injectable()
export class CompactOperation {

    constructor(@inject(TYPES.FileValidationService) private fileValidation: FileValidationService,
                @inject(TYPES.OperationExecutionService) private operationExecution: OperationExecutionService) {}

    compact(sourceFile: string, contextFile: string, 
        targetFile: string, options: CompactOptions): Promise<string> {

        return this.fileValidation.validateSourceModifierTarget({name: sourceFile, title: 'source file'}, {name: contextFile, title: 'context file'}, {name: targetFile, title: 'target file'})
                .then(valid => { if (valid === validated()) {
                                                                return this.operationExecution.sourceModifierOperation<JsonLd>(sourceFile, contextFile, targetFile, jsonld.compact, options);
                                                            }
                        else { return valid }
            });
    }

}