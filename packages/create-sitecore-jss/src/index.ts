#!/usr/bin/env node

import { NextjsGenerator } from './initializers/nextjs/index';
console.log('INIT!');

new NextjsGenerator().generate({ template: 'nextjs' });
