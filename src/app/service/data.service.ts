import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {HazardModel, JobModel, SafeguardModel, StepModel} from "../model/job.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  env = environment
  constructor(private http: HttpClient) {
  }

  getJobs(getChildData = false) {
    return this.http.get(this.env.apiEndpoint + '/jobs' + (getChildData ? '?includeSteps=1' : ''))
  }

  getJob(jobId:number) {
    return this.http.get(this.env.apiEndpoint + '/jobs/' + jobId + ('?includeSteps=1'))
  }

  addJob(job: JobModel) {
    return this.http.post(this.env.apiEndpoint + '/jobs', job);
  }

  bulkAdd(data:any, field:string) {
    return this.http.post(this.env.apiEndpoint + '/' + field + '/bulk', data);
  }

  updateJob(job: JobModel) {
    return this.http.patch(this.env.apiEndpoint + '/jobs/' + job.id, job);
  }

  addStep(step: StepModel) {
    return this.http.post(this.env.apiEndpoint + '/steps', step)
  }

  updateStep(step: StepModel) {
    return this.http.patch(this.env.apiEndpoint + '/steps/' + step.id, step)
  }

  editField(data: any, field: string) {
    return this.http.patch(this.env.apiEndpoint + '/'+field+'/' + data.id, data)
  }

  deleteStep(stepId: number) {
    return this.http.delete(this.env.apiEndpoint + '/steps/' + stepId)
  }

  deleteJob(jobId: number) {
    return this.http.delete(this.env.apiEndpoint + '/jobs/' + jobId)
  }

  updateHazard(hazard: HazardModel) {
    return this.http.patch(this.env.apiEndpoint + '/hazards/' + hazard.id, hazard)
  }

  deleteHazard(hazardId: number) {
    return this.http.delete(this.env.apiEndpoint + '/hazards/' + hazardId)
  }

  updateSafeguard(safeguard: SafeguardModel) {
    return this.http.patch(this.env.apiEndpoint + '/safeguards/' + safeguard.id, safeguard)
  }

  deleteSafeguard(safeguardId: number) {
    return this.http.delete(this.env.apiEndpoint + '/safeguards/' + safeguardId)
  }
}
