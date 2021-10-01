import { Pipeline } from './pipelineFactory';

export interface PipelineRegistry {
  addPipeline: (pipeline: Pipeline) => void;
  updatePipeline: (pipeline: Pipeline, pipelineName?: string) => void;
  deletePipeline: (pipelineName: string) => void;
  getPipeline: (pipelineName: string) => Pipeline;
  getPipelines: () => { [key: string]: Pipeline };
}

export const createPipelinesRegistry = (existingPipelines: { [k: string]: Pipeline } = {}) => {
  const pipelines: { [k: string]: Pipeline } = { ...existingPipelines };

  const addPipeline = (pipeline: Pipeline) => {
    const found = pipelines[pipeline.name];
    if (!found) {
      pipelines[pipeline.name] = { ...pipeline }; // weak attempt at immutability
    } else {
      console.warn(
        `pipeline "${pipeline.name}" already exists. you may experience unexpected results when trying to reference the pipeline by name.`
      );
    }
  };

  const updatePipeline = (pipeline: Pipeline, pipelineName = '') => {
    const pipeName = pipelineName || pipeline.name;
    if (!pipeName) {
      throw new Error(
        'no pipeline name specified for call to "updatePipeline", ' +
          'you must specify either pipeline.name or pass in a name via the "pipelineName" argument.'
      );
    }
    const found = pipelines[pipeName];
    if (found) {
      pipelines[pipeName] = { ...pipeline }; // weak attempt at immutability
    } else {
      throw new Error(`pipeline "${pipeName}" not found, can't be updated`);
    }
  };

  const deletePipeline = (pipelineName: string) => {
    if (pipelines[pipelineName]) {
      delete pipelines[pipelineName];
    }
  };

  const getPipeline = (pipelineName: string) => ({ ...pipelines[pipelineName] }); // weak attempt at immutability

  const getPipelines = () => ({ ...pipelines }); // weak attempt at immutability

  return {
    addPipeline,
    updatePipeline,
    deletePipeline,
    getPipeline,
    getPipelines,
  } as PipelineRegistry;
};
