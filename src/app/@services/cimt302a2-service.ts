import { Cimt302aApi } from './cimt302a-api';
import { AuthService } from './auth-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cimt302aView } from '../@models/Cimt302aView';
import { PlatformLocation } from '@angular/common';


@Injectable({
  providedIn: 'root',
})

export class Cimt302a2Service {

  constructor(private cimt302aApi: Cimt302aApi) {
  }

  getList() {
    return this.cimt302aApi.getOutList()
  }

}
