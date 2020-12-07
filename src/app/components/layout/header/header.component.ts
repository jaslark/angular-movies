import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isCollapsed = true;
  public isInputSearch = false;
  public model: any = {
    keySearch: ''
  };

  searchForm: FormGroup;
  constructor(
    public router: Router,
    public fb: FormBuilder
  ) {
    this.searchForm = fb.group({
      name: [null]
    });
  }
  ngOnInit() {

  }

  onSubmit() {
    console.log(this.searchForm.value.name);
    if (!this.searchForm.value.name) {
      this.isInputSearch = !this.isInputSearch;
    }
  }
}
