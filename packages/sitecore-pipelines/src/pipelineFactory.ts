import { run as pipelineRun, runWithCompilers as pipelineRunWithCompilers } from './pipeline';

export interface Processor {
  /**
   * name of the processor
   */
  name: string;
  /**
   * optional but must be specified if process is not
   */
  modulePath?: { workingDirectory: string, filePath: string } | string;
  /**
   * optional but must be specified if modulePath is not
   */
  process?: (args: any) => any;
  /**
   * additional arguments that should be passed to the processor when invoked
   */
  args?: any;
  moduleWrapper?: any;
}

export const processorFactory = {
  create: (name = '') => ({
    name,
    modulePath: '',
    args: {},
  } as Processor),
};

export interface ExecutablePipeline {
  /**
   * name of the pipeline
   */
  name: string;
  /**
   * Base args object for the pipeline.
   */
  args: any;
  /**
   * the processors for the pipeline
   */
  processors: () => Processor[];
}

export interface Pipeline extends ExecutablePipeline {
  /**
   * name of the pipeline
   */
  name: string;
  /**
   * Base args object for the pipeline.
   */
  args: any;
  /**
   * the processors for the pipeline
   */
  processors: () => Processor[];
  /**
   * adds a processor to the pipeline
   */
  addProcessor: (processor: Processor) => void;
  /**
   * runs the pipeline with the given pipeline args
   */
  run: () => Promise<any>;
  /**
   * runs the pipeline with the given pipeline args, importing the given compilers first
   */
  runWithCompilers: (compilers: string[]) => Promise<any>;
}

export const pipelineFactory = {
  /**
   * Create a pipeline
   */
  create: (name = '') => {
    const processors: Processor[] = [];

    const args = {}; // inconsistent API, this will be directly mutable, but processors not? Que pasa con eso?

    const addProcessor = (processor: Processor) => {
      const found = processors.findIndex((proc) => proc.name === processor.name);
      if (found === -1) {
        processors.push({ ...processor }); // weak attempt at immutability
      } else {
        console.warn(
          `processor "${
            processor.name
          }" already exists. you may experience unexpected results when trying to reference the processor by name.`
        );
      }
    };

    const updateProcessor = (processor: Processor, processorName = '') => {
      const procName = processorName || processor.name;
      if (!procName) {
        throw new Error(
          'no processor name specified for call to "updateProcessor", you must specify either' +
          ' processor.name or pass in a name via the "processorName" argument.'
        );
      }
      const found = processors.findIndex((proc) => proc.name === procName);
      if (found !== -1) {
        processors[found] = { ...processor };
      } else {
        throw new Error(`processor "${procName}" not found, can't be updated`);
      }
    };

    const getProcessor = (processorName: string) => {
      const processor = processors.find((proc) => proc.name === processorName);
      return processor ? { ...processor } : null; // weak attempt at immutability
    };

    const getProcessors = (predicate?: (processors: Processor[]) => Processor[]) => {
      if (predicate) {
        return predicate([...processors]); // weak attempt at immutability
      }
      return [...processors]; // weak attempt at immutability
    };

    const run = async () => {
      const pipeline = { name, processors: getProcessors, args };
      return pipelineRun(pipeline);
    };

    const runWithCompilers = async (compilers: string[]) => {
      const pipeline = { name, processors: getProcessors };
      return pipelineRunWithCompilers(compilers)(pipeline);
    };

    return {
      name,
      args,
      addProcessor,
      updateProcessor,
      getProcessor,
      getProcessors,
      processors: getProcessors,
      run,
      runWithCompilers,
    } as Pipeline;
  },
};
