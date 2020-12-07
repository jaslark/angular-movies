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
  public listPopular: Array<Object> = [];
  public listTopRated: Array<Object> = [];
  public listUpcoming: Array<Object> = [];
  public listGenre: Array<Object> = [];

  public slides = [
    'First slide',
    'Second slide',
    'Third slide'
  ];
  active = 1;

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

  async ngOnInit() {
    this.config.scrollbar = false;
    this.config.navigation = false;
    this.config.pagination = this.pagination;
    // this.componentRef.directiveRef.setIndex(0);
    this.getListGenre();
    this.getListPopularMovies();
  }

  getListGenre() {
    const params = {};
    this.service.getListGenre(params).subscribe(
      res => {
        try {
          this.listGenre = res.genres;
        } catch (e) {
          console.log(e);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getListPopularMovies() {
    const params = {};
    this.service.getListPopularMovies(params).subscribe(
      res => {
        try {
          this.listPopular = res.results;
          this.listPopular.map((item: any) => {
            item['genre'] = this.getGenre(item.genre_ids).join(', ');
          })
          this.refresh();
        } catch (e) {
          console.log(e);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getListTopratedMovies() {
    const params = {};
    this.service.getListTopratedMovies(params).subscribe(
      res => {
        try {
          this.listTopRated = res.results;
          this.listTopRated.map((item: any) => {
            item['genre'] = this.getGenre(item.genre_ids).join(', ');
          })
          this.refresh();
        } catch (e) {
          console.log(e);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getListUpcomingMovies() {
    const params = {};
    this.service.getListUpcomingMovies(params).subscribe(
      res => {
        try {
          this.listUpcoming = res.results;
          this.listUpcoming.map((item: any) => {
            item['genre'] = this.getGenre(item.genre_ids).join(', ');
          })
          this.refresh();
        } catch (e) {
          console.log(e);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getGenre(genre_ids: any[]) {
    let array = [];
    genre_ids.map((x: any) => {
      this.listGenre.map((item: any) => {
        if (x == item.id) {
          array.push(item.name);
        }
      });
    });
    return array;
  }

  /**
   * Table Event
   */
  refresh() {
    if (!(<ViewRef>this.cd).destroyed) {
      this.cd.detectChanges();
    }
  }

  trackByFn(index: number, item: any) {
    return item.id || index;
  }

  navChanged(event) {
    console.log('navChanged', event);
    switch (event.nextId) {
      case 1:
        if (this.listPopular.length <= 0) {
          this.getListPopularMovies();
        }
        break;
      case 2:
        if (this.listTopRated.length <= 0) {
          this.getListPopularMovies();
        }
        this.getListTopratedMovies();
        break;
      case 3:
        if (this.listUpcoming.length <= 0) {
          this.getListPopularMovies();
        }
        this.getListUpcomingMovies();
        break;
      case 4:

        break;


      default:
        break;
    }
  }

}
