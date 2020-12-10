import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home.component';
import { MovieService } from '../../core/service/movies.service';
import { of } from 'rxjs';

describe('TestMovieComponent', () => {
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const dummyData = [
    {title: 'Harry Potter'}
  ];

  const mockApiService = {
        getListPopularMovies({}) {
          return of(dummyData);
        }
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        NgbModule,
        SwiperModule
      ],
      declarations: [
        HomeComponent
      ],
      providers: [
        FormBuilder,
        MovieService,
        {provide: MovieService, useValue: mockApiService}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      comp = fixture.componentInstance; // HomeComponent test instance
    });
    // service = TestBed.get(MovieService);
  }));

  it('should render title movie slide', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('WRATH');
  });

  it(`should have as title 'karros'`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('karros');
  });

  it('should return array movie', inject([MovieService],
      (service: MovieService) => {
        expect(service).toBeTruthy();

        service.getListPopularMovies({}).subscribe(item => {
          expect(item.length).toBe(1);
          expect(item[0].title).toEqual('Harry Potter');
      });
    }));


});
