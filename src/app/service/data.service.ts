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
    return this.http.post(this.env.apiEndpoint + '/api/v1/job', job);

  }

  updateJob(job: JobModel) {
    console.log(job)
    return this.http.patch(this.env.apiEndpoint + '/api/v1/job', job);
  }

  addSteps(steps: StepModel) {
    return this.http.post(this.env.apiEndpoint + '/api/v1/steps/bulk', steps)
  }

  udpateSteps(steps: StepModel) {
    return this.http.patch(this.env.apiEndpoint + '/api/v1/steps/bulk', steps)
  }

  deleteStep(stepId: number) {
    return this.http.delete(this.env.apiEndpoint + '/api/v1/steps/' + stepId)

  }

  addHazards(hazards: HazardModel) {
    return this.http.post(this.env.apiEndpoint + '/api/v1/hazards/bulk', hazards)
  }

  updateHazards(hazards: HazardModel) {
    return this.http.patch(this.env.apiEndpoint + '/api/v1/hazards/bulk', hazards)
  }

  deleteHazard(hazardId: number) {
    return this.http.delete(this.env.apiEndpoint + '/api/v1/hazards/' + hazardId)
  }

  addSafeguards(safeguards: SafeguardModel) {
    return this.http.post(this.env.apiEndpoint + '/api/v1/safeguards/bulk', safeguards)
  }

  updateSafeguards(safeguards: SafeguardModel) {
    return this.http.patch(this.env.apiEndpoint + '/api/v1/safeguards/bulk', safeguards)
  }

  deleteSafeguards(safeguardId: number) {
    return this.http.delete(this.env.apiEndpoint + '/api/v1/safeguards/' + safeguardId)
  }
}
