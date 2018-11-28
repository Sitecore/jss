import { ExecutablePipeline, Processor } from './pipelineFactory';
import { importModules, initCompilers } from './utils';

const enhanceProcessors = (processors: Processor[]) =>
  processors.map((processor: any) => {
    if (processor.modulePath) {
      const importArgs: any = {
        fileGlobs: [processor.modulePath],
      };
      if (processor.modulePath.workingDirectory && processor.modulePath.filePath) {
        importArgs.fileGlobs = [processor.modulePath.filePath];
        importArgs.workingDirectory = processor.modulePath.workingDirectory;
      }

      return {
        ...processor,
        moduleWrapper: importModules(importArgs)[0],
      };
    }
    return processor;
  });

const runProcessor = async ({
    processor,
    args,
  }: {
     processor: Processor,
     args: any
  }) => {
  if (args && args.debug) {
    console.log(`executing processor ${processor.name}`);
  }

  const { args: processorArgs, ...otherProcessorInfo } = processor;
  const mergedArgs = {
    ...args,
    ...processorArgs,
    processor: { ...otherProcessorInfo },
  };

  // processors can be a function defined via processor.process
  // or they can be modules that need to be imported
  if (typeof processor.process === 'function') {
    const result = await processor.process(mergedArgs);
    return result;
  } else if (processor.moduleWrapper) {
    const module = await processor.moduleWrapper.import();
    if (module.default) {
      const resultArgs = module.default(mergedArgs);
      // resultArgs can be a promise or object, so this abort check won't work if resultArgs is a promise
      if (resultArgs.abort) {
        throw new Error('abort');
      }
      return resultArgs;
    }
    return args;
  }

  throw new Error(
    `Pipeline processor '${processor.name}' does not specify 'modulePath' or 'process'`
  );
};

/**
 * @param args.processors the processors to run (optional but must be specified if pipeline is not specified)
 * @param args.pipelineArgs arguments to pass to the pipeline processors
 */
export const runProcessors = async ({
  processors,
  pipelineArgs = {},
}: {
  processors: Processor[],
  pipelineArgs: any
}) => {
  if (!processors || processors.length === 0) {
    throw new Error('no processors specified to run');
  }

  const finalProcessors = enhanceProcessors(processors);

  let pipelineResult = pipelineArgs;

  // eslint-disable-next-line no-restricted-syntax
  for (const processor of finalProcessors) {
    // eslint-disable-next-line no-await-in-loop
    pipelineResult = await runProcessor({ processor, args: pipelineResult });
  }

  return pipelineResult;
};

/**
 * @param pipeline the pipeline to run (optional but must be specified if processors is not specified)
 */
export const run = async (pipeline: ExecutablePipeline) => {
  if (!pipeline || !pipeline.processors() || pipeline.processors().length === 0) {
    throw new Error('no pipeline processors have been defined');
  }

  const pipelineName = pipeline ? `"${pipeline.name}" ` : '';

  if (pipeline.args.debug) {
    console.log(`\npipeline ${pipelineName}started`);
  }

  const pipelineResult = await runProcessors({
    processors: pipeline.processors(),
    pipelineArgs: pipeline.args,
  });

  if (pipeline.args.debug) {
    console.log(`pipeline ${pipelineName}complete`);
  }

  return pipelineResult;
};

/**
 * Run a pipeline, loading specified compilers first
 *
 */
export const runWithCompilers = (compilers: any) => async (pipeline: any) => {
  await initCompilers(compilers);
  return run(pipeline);
};
