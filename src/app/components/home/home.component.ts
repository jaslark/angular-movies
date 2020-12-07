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
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [MovieService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public show: boolean = true;

  public slides = [
    'First slide',
    'Second slide',
    'Third slide'
  ];

  public disabled: boolean = false;

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  constructor(
    private service: MovieService,
    private cd: ChangeDetectorRef,
    public fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.config.scrollbar = false;
    this.config.navigation = false;
    this.config.pagination = this.pagination;
    this.componentRef.directiveRef.setIndex(0);
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
