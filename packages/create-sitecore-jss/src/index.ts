#!/usr/bin/env node
import parseArgs, { ParsedArgs } from 'minimist';
import { NextjsGenerator } from './initializers/nextjs/index';

// parse any command line arguments passed into `init sitecore-jss`
// to pass to the generator prompts and skip them.
// useful for CI and testing purposes
const argv: ParsedArgs = parseArgs(process.argv.slice(2));

new NextjsGenerator().init(argv);
