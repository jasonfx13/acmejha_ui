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

  addJob(job: JobModel) {
    console.log(job);
    return this.http.post(this.env.apiEndpoint + '/jobs', job);

  }

  updateJob(job: JobModel) {
    console.log(job)
    return this.http.patch(this.env.apiEndpoint + '/jobs/' + job.id, job);
  }

  addSteps(steps: StepModel[]) {
    return this.http.post(this.env.apiEndpoint + '/steps/bulk', steps)
  }
  addStep(step: StepModel) {
    return this.http.post(this.env.apiEndpoint + '/steps', step)
  }

  updateSteps(step: StepModel) {
    return this.http.patch(this.env.apiEndpoint + '/steps/' + step.id, step)
  }

  deleteStep(stepId: number) {
    return this.http.delete(this.env.apiEndpoint + '/steps/' + stepId)

  }

  addHazards(hazards: HazardModel) {
    return this.http.post(this.env.apiEndpoint + '/hazards/bulk', hazards)
  }

  updateHazard(hazard: HazardModel) {
    return this.http.patch(this.env.apiEndpoint + '/hazards/' + hazard.id, hazard)
  }

  deleteHazard(hazardId: number) {
    return this.http.delete(this.env.apiEndpoint + '/hazards/' + hazardId)
  }

  addSafeguards(safeguards: SafeguardModel) {
    return this.http.post(this.env.apiEndpoint + '/safeguards/bulk', safeguards)
  }

  updateSafeguard(safeguard: SafeguardModel) {
    return this.http.patch(this.env.apiEndpoint + '/safeguards/' + safeguard.id, safeguard)
  }

  deleteSafeguards(safeguardId: number) {
    return this.http.delete(this.env.apiEndpoint + '/safeguards/' + safeguardId)
  }
}
