import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '../class/baseAPI.class';
import { API_ENDPOINT } from '../constants';
import { map } from 'rxjs/operators';

@Injectable()
export class MovieService extends BaseAPIClass {
  constructor(
    protected httpClient: HttpClient
  ) {
    super(httpClient);
  }

  // BANK
  getListBank(params: any) {
    return this.getAll(API_ENDPOINT.MASTER_DATA.BANK, params).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  getBankById(id: string) {
    return this.getById(API_ENDPOINT.MASTER_DATA.BANK, id).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  createBank(params: any) {
    return this.create(API_ENDPOINT.MASTER_DATA.BANK, params).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  updateBank(id: string, params: any) {
    return this.update(API_ENDPOINT.MASTER_DATA.BANK, id, params).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  deleteBank(id: string) {
    return this.delete(API_ENDPOINT.MASTER_DATA.BANK, id).pipe(
      map((body: any) => {
        return body;
      })
    );
  }
  generateCodeBank() {
    return this.getAll(`${API_ENDPOINT.MASTER_DATA.BANK}/generate-code`).pipe(
      map((body: any) => {
        return body;
      })
    );
  }
  // BRANCH
  getListBranch(bankId: string, params: any) {
    return this.getAll(
      `${API_ENDPOINT.MASTER_DATA.BANK}/${bankId}/branch`,
      params
    ).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  getBranchById(bankId: string, branchId: string) {
    return this.getById(
      `${API_ENDPOINT.MASTER_DATA.BANK}/${bankId}/branch/`,
      branchId
    ).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  createBranch(id: any, params: any) {
    return this.create(
      `${API_ENDPOINT.MASTER_DATA.BANK}/${id}/branch`,
      params
    ).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  updateBranch(bankId: string, branchId: string, params: any) {
    return this.update(
      `${API_ENDPOINT.MASTER_DATA.BANK}/${bankId}/branch/`,
      branchId,
      params
    ).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  deleteBranch(bankId: string, branchId: string) {
    return this.delete(
      `${API_ENDPOINT.MASTER_DATA.BANK}/${bankId}/branch/`,
      branchId
    ).pipe(
      map((body: any) => {
        return body;
      })
    );
  }
  generateCodeBranch() {
    return this.getAll(`${API_ENDPOINT.MASTER_DATA.BANK}/generate-code`).pipe(
      map((body: any) => {
        return body;
      })
    );
  }
  getListBankOption() {
    return this.getAll(`${API_ENDPOINT.MASTER_DATA.BANK}/option`).pipe(
      map((body: any) => {
        return body;
      })
    );
  }
  getListBranchOption(bankId: any) {
    return this.getAll(
      `${API_ENDPOINT.MASTER_DATA.BANK}/${bankId}/branch/option`
    ).pipe(
      map((body: any) => {
        return body;
      })
    );
  }
}
