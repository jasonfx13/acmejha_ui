import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

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
}
