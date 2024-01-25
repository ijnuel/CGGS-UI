import { Injectable } from '@angular/core';
import { UserDto, UserResponseDto } from '../api-service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {


  constructor(
    private cookieService: CookieService) { }

  public saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key: string): any {
    let data = localStorage.getItem(key) || undefined;
    return data ? JSON.parse(data) : null;
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public setCurrentUser(value: UserResponseDto | undefined) {
    localStorage.setItem("currentUser", JSON.stringify(value));
  }
  public getCurrentUser(): UserResponseDto {
    let data = localStorage.getItem("currentUser");
    return data ? JSON.parse(data) : null;
  }
  public clearCurrentUser() {
    localStorage.removeItem("currentUser");
  }

  public errorHandler(err: any) {
    if (err.status == 401) {
      this.clearCurrentUser();
      location.href = "/";
    }
    else if (err.status == 403) {
      location.href = "/portal";
    }

    return {
      error: true,
      message:
        err?.error?.ExceptionMessage ||
        err?.error?.Message ||
        err?.Message ||
        "An error occurred.",
    };
  }

}
