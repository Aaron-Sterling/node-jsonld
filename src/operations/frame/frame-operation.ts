// frame action

import { injectable, inject } from 'inversify';
import { TYPES } from '../../inversify/types';
import { FileValidationService } from '../../core-providers/file-services/file-validators/file-validation-service';
import { OperationExecutionService } from '../../core-providers/operation-execution-service/operation-execution-service';
import { promises as jsonld, FrameOptions } from 'jsonld';
import { validated } from '../../core-providers/file-services/file-validators/validation-constant';

                  
@injectable()
export class FrameOperation {

    constructor(@inject(TYPES.FileValidationService) private fileValidation: FileValidationService,
                @inject(TYPES.OperationExecutionService) private operationExecution: OperationExecutionService) {}

    frame(sourceFile: string, frameFile: string, targetFile: string, options: FrameOptions): Promise<string> {

        return this.fileValidation.validateSourceModifierTarget({name: sourceFile, title: 'source file'}, {name: frameFile, title: 'frame file'}, {name: targetFile, title: 'target file'})
                .then(valid => { if (valid === validated()) {
                                                                   return this.operationExecution.sourceModifierOperation(sourceFile, frameFile, targetFile, jsonld.frame, options);
                                                                  }
                                         else { return valid; }
                                    });
    }

}


