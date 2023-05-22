export interface JobModel {
  id?: number,
  title: string,
  description?: string,
  createdBy: string,
  steps?: StepModel[]
}

export interface StepModel {
  id?: number,
  jobId: number,
  title: string,
  hazards?: HazardModel[]
}

export interface HazardModel {
  id?: number,
  stepId: number,
  title: string,
  safeguards?: SafeguardModel[]
}

export interface SafeguardModel {
  id?: number,
  hazardId: number,
  title: string
}
