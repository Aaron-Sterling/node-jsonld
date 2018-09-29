// Option types

import { CompactOptions, ExpandOptions, FlattenOptions, FromRdfOptions, NormalizeOptions,
         ToRdfOptions, FrameOptions } from 'jsonld';

export type OperationOptions = CompactOptions | ExpandOptions | FlattenOptions |
                               FrameOptions | FromRdfOptions | NormalizeOptions | ToRdfOptions;