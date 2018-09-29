// deserialize

import { injectable, inject } from 'inversify';
import { TYPES } from '../../inversify/types';
import { FileValidationService } from '../../core-providers/file-services/file-validators/file-validation-service';
import { OperationExecutionService } from '../../core-providers/operation-execution-service/operation-execution-service';
import { promises as jsonld, JsonLd, JsonLdObject, FromRdfOptions } from 'jsonld';
import { validated } from '../../core-providers/file-services/file-validators/validation-constant';
                        

@injectable()
export class DeserializeOperation {
    
    constructor(@inject(TYPES.FileValidationService) private fileValidation: FileValidationService,
                @inject(TYPES.OperationExecutionService) private operationExecution: OperationExecutionService) {}
    
    deserialize(sourceFile: string, targetFile: string, options: FromRdfOptions): Promise<string> {

        const deserialize = (val: JsonLdObject) => jsonld.fromRDF(JSON.stringify(val));
        return this.fileValidation.validateSourceTarget({name: sourceFile, title: 'source file'}, {name: targetFile, title: 'target file'})
                .then(valid => { if (valid === validated()) {
                                                                   return this.operationExecution.sourceOpTarget<JsonLd>(sourceFile, targetFile, deserialize, options);
                                                                  }
                                    else { return valid; }
                                });
    }
}

