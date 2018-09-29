// inversify container

import "reflect-metadata";
import { Container } from 'inversify';
import { TYPES } from './types';
//
import { NodeJSONLD } from '../main';
//
import { OperationService } from "../operations/operationService";
import { OperationExecutionService } from '../core-providers/operation-execution-service/operation-execution-service';
//
import { FileValidationService } from '../core-providers/file-services/file-validators/file-validation-service';
import { ReadWriteFileService } from '../core-providers/file-services/read-write-file-service';
//
import { CompactOperation } from '../operations/compact/compact-operation';
import { DeserializeOperation } from '../operations/deserialize/deserialize-operation';
import { ExpandOperation } from '../operations/expand/expand-operation';
import { FlattenOperation } from '../operations/flatten/flatten-operation';
import { FrameOperation } from '../operations/frame/frame-operation';
import { NormalizeOperation } from '../operations/normalize/normalize-operation';
import { SerializeOperation } from '../operations/serialize/serialize-operation';


const container = new Container();
// Main
container.bind<NodeJSONLD>(TYPES.NodeJSONLD).to(NodeJSONLD);
container.bind<OperationService>(TYPES.OperationService).to(OperationService);
container.bind<OperationExecutionService>(TYPES.OperationExecutionService).to(OperationExecutionService);
// File services
container.bind<FileValidationService>(TYPES.FileValidationService).to(FileValidationService);
container.bind<ReadWriteFileService>(TYPES.ReadWriteFileService).to(ReadWriteFileService);
// JSON-LD operations
container.bind<CompactOperation>(TYPES.CompactOperation).to(CompactOperation);
container.bind<DeserializeOperation>(TYPES.DeserializeOperation).to(DeserializeOperation);
container.bind<ExpandOperation>(TYPES.ExpandOperation).to(ExpandOperation);
container.bind<FlattenOperation>(TYPES.FlattenOperation).to(FlattenOperation);
container.bind<FrameOperation>(TYPES.FrameOperation).to(FrameOperation);
container.bind<NormalizeOperation>(TYPES.NormalizeOperation).to(NormalizeOperation);
container.bind<SerializeOperation>(TYPES.SerializeOperation).to(SerializeOperation);

export { container };