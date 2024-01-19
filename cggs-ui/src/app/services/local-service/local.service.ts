import { Injectable } from '@angular/core';
import { UserDto, UserResponseDto } from '../api-service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {


  constructor() { }

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
}
