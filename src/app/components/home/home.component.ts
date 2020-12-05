import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewRef
} from '@angular/core';
import { MovieService } from '../../core/service/movies.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [MovieService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(
    private service: MovieService,
    private cd: ChangeDetectorRef,
    public fb: FormBuilder
  ) {

  }

  ngOnInit() {

  }
  /**
   * Table Event
   */
  refresh() {
    if (!(<ViewRef>this.cd).destroyed) {
      this.cd.detectChanges();
    }
  }

}
