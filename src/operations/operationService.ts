// Provider of JSON-LD operations

import { injectable, inject } from 'inversify';
import { TYPES } from '../inversify/types';
//
import { CompactOptions, FromRdfOptions, ExpandOptions, FlattenOptions, FrameOptions,
         NormalizeOptions, ToRdfOptions } from 'jsonld';
//
import { CompactOperation } from './compact/compact-operation';
import { DeserializeOperation } from './deserialize/deserialize-operation';
import { ExpandOperation } from './expand/expand-operation';
import { FlattenOperation } from './flatten/flatten-operation';
import { FrameOperation } from './frame/frame-operation';
import { NormalizeOperation } from './normalize/normalize-operation';
import { SerializeOperation } from './serialize/serialize-operation';

@injectable()
export class OperationService {

    constructor(@inject(TYPES.CompactOperation) private compactOperation: CompactOperation,
                @inject(TYPES.DeserializeOperation) private deserializeOperation: DeserializeOperation,
                @inject(TYPES.ExpandOperation) private expandOperation: ExpandOperation,
                @inject(TYPES.FlattenOperation) private flattenOperation: FlattenOperation,
                @inject(TYPES.FrameOperation) private frameOperation: FrameOperation,
                @inject(TYPES.NormalizeOperation) private normalizeOperation: NormalizeOperation,
                @inject(TYPES.SerializeOperation) private serializeOperation: SerializeOperation) {}

    compact(sourceFile: string, contextFile: string, targetFile: string, options: CompactOptions): Promise<string> {

        return this.compactOperation.compact(sourceFile, contextFile, targetFile, options);
    }

    deserialize(sourceFile: string, targetFile: string, options: FromRdfOptions): Promise<string> {

        return this.deserializeOperation.deserialize(sourceFile, targetFile, options);
    }

    expand(sourceFile: string, targetFile: string, options: ExpandOptions): Promise<string> {

        return this.expandOperation.expand(sourceFile, targetFile, options);
    }

    flatten(sourceFile: string, targetFile: string, options: FlattenOptions) {

        return this.flattenOperation.flatten(sourceFile, targetFile, options);
    }

    frame(sourceFile: string, frameFile: string, targetFile: string, options: FrameOptions): Promise<string> {

        return this.frameOperation.frame(sourceFile, frameFile, targetFile, options);
    }

    normalize(sourceFile: string, targetFile: string, options: NormalizeOptions) {

        return this.normalizeOperation.normalize(sourceFile, targetFile, options);
    }

    serialize(sourceFile: string, targetFile: string, options: ToRdfOptions) {

        return this.serializeOperation.serialize(sourceFile, targetFile, options);
    }
}