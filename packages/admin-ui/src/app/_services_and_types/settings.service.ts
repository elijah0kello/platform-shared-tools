import {Injectable, isDevMode} from '@angular/core';

const USERNAME_KEYNAME = "username";
const ACCESSTOKEN_KEYNAME = "accessToken";

const DEVELOPMENT_ENV_NAME = "dev";
const PRODUCTION_ENV_NAME = "prod";

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _isDevMode: boolean;

  public accessToken: string | null;
  public username: string | null;

  constructor() {
    this.accessToken = localStorage.getItem(ACCESSTOKEN_KEYNAME);
    this.username = localStorage.getItem(USERNAME_KEYNAME);
    this._isDevMode = isDevMode();
  }

  get isDevMode(): boolean {
    return this._isDevMode;
  }

  get envName(): string{
    if(this._isDevMode){
      return DEVELOPMENT_ENV_NAME;
    }

    return PRODUCTION_ENV_NAME;
  }

  save(): boolean {
    if(this.accessToken)
      localStorage.setItem(ACCESSTOKEN_KEYNAME, this.accessToken);

    if(this.username)
      localStorage.setItem(USERNAME_KEYNAME, this.username);

    return true;
  }

  clearToken() {
    localStorage.removeItem(ACCESSTOKEN_KEYNAME);
  }

  clearAll() {
    localStorage.removeItem(ACCESSTOKEN_KEYNAME);
    localStorage.removeItem(USERNAME_KEYNAME);
  }

}
