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
  nextId = 1;
  isLoading = true;
  title = 'karros';

  page_popular = 1;
  page_top = 1;
  page_upcoming = 1;

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
    this.isLoading = true;
    const params = {
      page: this.page_popular
    };
    this.service.getListPopularMovies(params).subscribe(
      res => {
        try {
            this.listPopular = this.listPopular.concat(res.results);
            console.log(this.listPopular);

            this.listPopular.map((item: any) => {
              item['genre'] = this.getGenre(item.genre_ids).join(', ');
            });
            this.isLoading = false;
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
    this.isLoading = true;
    const params = {
      page: this.page_top
    };
    this.service.getListTopratedMovies(params).subscribe(
      res => {
        try {
            this.listTopRated = this.listTopRated.concat(res.results);
            this.listTopRated.map((item: any) => {
              item['genre'] = this.getGenre(item.genre_ids).join(', ');
            });
            this.isLoading = false;
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
    this.isLoading = true;
    const params = {
      page: this.page_upcoming
    };
    this.service.getListUpcomingMovies(params).subscribe(
      res => {
        try {
            this.listUpcoming = this.listUpcoming.concat(res.results);
            this.listUpcoming.map((item: any) => {
              item['genre'] = this.getGenre(item.genre_ids).join(', ');
            });
            this.isLoading = false;
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
    this.nextId = event.nextId;

    switch (event.nextId) {
      case 1:
        if (this.listPopular.length <= 0) {
          this.getListPopularMovies();
        }
        break;
      case 2:
        if (this.listTopRated.length <= 0) {
          this.getListTopratedMovies();
        }
        break;
      case 3:
        if (this.listUpcoming.length <= 0) {
          this.getListUpcomingMovies();
        }
        break;
      case 4:

        break;
    }
  }

  onScroll() {
    console.log('scrolled!!');
    switch (this.nextId) {
      case 1:
        this.page_popular++;
        this.getListPopularMovies();
        break;
      case 2:
        this.page_top++;
        this.getListTopratedMovies();
        break;
      case 3:
        this.page_upcoming++;
        this.getListUpcomingMovies();
        break;
    }

  }

}
