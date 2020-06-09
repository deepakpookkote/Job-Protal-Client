import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageName = 'myStorage';
  private data: any = {};

  constructor() {
    this.loadStorage();
  }

  loadStorage() {
    const temp = localStorage.getItem(this.storageName);
    if (temp === undefined || temp === null || temp === '') {
      this.data = {};
    } else {
      this.data = JSON.parse(temp);
    }

  }

  set(obj: any) {
    Object.keys(obj).forEach((key) => {
      this.data[key] = obj[key];
    });
    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem(this.storageName, JSON.stringify(this.data));
  }

  get(key: string = '') {
    if (key === '') {
      return this.data;
    } else {
      return this.data[key];
    }
  }

  remove(key: string) {
    delete this.data[key];
    this.updateStorage();
  }

  removeAll() {
    this.data = {};
    this.updateStorage();
  }


}
