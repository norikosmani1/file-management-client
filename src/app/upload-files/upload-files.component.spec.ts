import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UploadFilesComponent } from './upload-files.component';
import { SharedService } from '../services/shared.service';
import { SharedServiceMock } from '../mocks/shared.service.mock';


describe('UploadFilesComponent', () => {
  let component: UploadFilesComponent;
  let fixture: ComponentFixture<UploadFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFilesComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SharedService, useClass: SharedServiceMock }
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should contain AcceptableFiles setting`, async(() => { 
    expect(component.settings).toContain({ id: "1", key: "AcceptableFiles", value: 'png,jpg,pptx,docx,xlsx' });
  }));

  it(`Max files length should be greater than`, async(() => { 
    expect(component.settings[2].value).toBeGreaterThanOrEqual(5);
  }));
});
