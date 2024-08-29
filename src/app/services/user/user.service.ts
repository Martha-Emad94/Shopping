import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _fullName: string | null = null;
  constructor() { }

  setFullName(name: string) {
    this._fullName = name;
  }

  getFullName(): string | null {
    return this._fullName;
  }

  
}
