#! /usr/bin/env node
// entrypoint

import { container } from './inversify//inversify.config';
import { TYPES } from './inversify/types';
import { NodeJSONLD } from './main';

const nodeJsonLd = container.get<NodeJSONLD>(TYPES.NodeJSONLD);

export { nodeJsonLd };