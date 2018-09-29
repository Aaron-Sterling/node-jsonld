// flatten action

import { injectable, inject } from 'inversify';
import { TYPES } from '../../inversify/types';
import { FileValidationService } from '../../core-providers/file-services/file-validators/file-validation-service';
import { OperationExecutionService } from '../../core-providers/operation-execution-service/operation-execution-service';
import { promises as jsonld, JsonLd, FlattenOptions } from 'jsonld';
import { validated } from '../../core-providers/file-services/file-validators/validation-constant';

@injectable()
export class FlattenOperation {

    constructor(@inject(TYPES.FileValidationService) private fileValidation: FileValidationService,
                @inject(TYPES.OperationExecutionService) private operationExecution: OperationExecutionService) {}

    flatten(sourceFile: string, targetFile: string, options: FlattenOptions): Promise<string> {

        return this.fileValidation.validateSourceTarget({name: sourceFile, title: 'source file'}, {name: targetFile, title: 'target file'})
                .then(valid => { if (valid === validated())       {
                                                                   return this.operationExecution.sourceOpTarget<JsonLd>(sourceFile, targetFile, jsonld.flatten, options);
                                                                  }
                                    else { return valid; }
                                });
    }

}
                        

