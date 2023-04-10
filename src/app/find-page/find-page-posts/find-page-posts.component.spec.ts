import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPagePostsComponent } from './find-page-posts.component';

describe('FindPagePostsComponent', () => {
  let component: FindPagePostsComponent;
  let fixture: ComponentFixture<FindPagePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindPagePostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindPagePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
