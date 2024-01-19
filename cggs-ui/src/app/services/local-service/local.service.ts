import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';
import { UserDto } from '../api-service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  key = "294013";

  constructor() { }

  public saveData(key: string, value: any) {
    // localStorage.setItem(key, this.encrypt(value));
    localStorage.setItem(key, value);
  }

  public getData(key: string): any | undefined {
    // let data = localStorage.getItem(key) || "";
    // return this.decrypt(data);
    let data = localStorage.getItem(key) || undefined;
    return data;
  }

  public setCurrentUser(value: any) {
    localStorage.setItem("currentUser", value);
  }
  public getCurrentUser(): any | undefined {
    let data = localStorage.getItem("currentUser") || undefined;
    return data;
  }
  public clearCurrentUser() {
    localStorage.removeItem("currentUser");
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: any): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string): any {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
