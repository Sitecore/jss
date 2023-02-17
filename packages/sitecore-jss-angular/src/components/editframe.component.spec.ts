import { Component, DebugElement, Input, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { EditFrameComponent } from './editframe.component';
import {
  DefaultEditFrameButton,
  EditButtonTypes,
  EditFrameDataSource,
} from '@sitecore-jss/sitecore-jss/utils';
import { LayoutServiceContextData, RouteData } from '@sitecore-jss/sitecore-jss/layout';
import { RouterTestingModule } from '@angular/router/testing';

const editingContext = {
  context: {
    pageEditing: true,
  },
  route: {
    name: 'styleguide',
    placeholders: {
      'JssTestWeb-jss-main': [],
    },
    itemId: 'testitemid',
  },
};

const normalContext = {
  context: {
    pageEditing: false,
  },
  route: {
    name: 'styleguide',
    placeholders: {
      'JssTestWeb-jss-main': [],
    },
    itemId: 'testitemid',
  },
};

@Component({
  selector: 'test-editframe',
  template: `
    <div>
      <sc-edit-frame
        [title]="title"
        [tooltip]="tooltip"
        [cssClass]="cssClass"
        [dataSource]="dataSource"
        [buttons]="buttons"
        [sitecore]="sitecore"
      >
        Wrapped text
      </sc-edit-frame>
    </div>
  `,
})
class TestComponent implements OnInit {
  @Input() dataSource: EditFrameDataSource;

  @Input() buttons: EditButtonTypes[];

  @Input() title: string;

  @Input() tooltip: string;

  @Input() cssClass: string;

  @Input() parameters: Record<string, string | number | boolean | undefined | null>;

  @Input() sitecore: LayoutServiceContextData & {
    route: RouteData<unknown> | null;
  };

  ngOnInit() {
    this.sitecore = normalContext;
  }
}

describe('<EditFrame />', () => {
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let editFrameComp: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFrameComponent, TestComponent],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('sc-edit-frame'));
    editFrameComp = fixture.componentInstance;
  });

  it('should render wrapped element when not in pageEditing mode', () => {
    editFrameComp.sitecore = normalContext;
    fixture.detectChanges();

    const rendered = de.nativeElement.textContent.trim();
    expect(rendered).toBe('Wrapped text');
  });

  it('should render a frame when in pageEditing mode', () => {
    editFrameComp.sitecore = editingContext;
    fixture.detectChanges();

    const frameDiv = de.query(By.css('div.scLooseFrameZone')).nativeElement;
    const frameSpan = de.query(By.css('div.scLooseFrameZone > span.scChromeData')).nativeElement;
    expect(frameDiv).toBeDefined();
    expect(frameSpan).toBeDefined();
    expect(frameSpan.textContent).toBe('{}');
  });

  it('should render child content within a frame when in pageEditing mode', () => {
    editFrameComp.sitecore = editingContext;
    fixture.detectChanges();

    const frameDiv = de.query(By.css('div.scLooseFrameZone')).nativeElement;
    expect(frameDiv.textContent).toContain('Wrapped text');
  });

  it('should render the title and tooltip', () => {
    editFrameComp.sitecore = editingContext;
    editFrameComp.title = 'Test Title';
    editFrameComp.tooltip = 'Test Tooltip';
    fixture.detectChanges();

    const frameSpan = de.query(By.css('div.scLooseFrameZone > span.scChromeData')).nativeElement;
    expect(frameSpan.textContent).toBe(
      '{"displayName":"Test Title","expandedDisplayName":"Test Tooltip"}'
    );
  });

  it('should render the added class in editing mode', () => {
    editFrameComp.sitecore = editingContext;
    editFrameComp.cssClass = 'topClass';
    fixture.detectChanges();

    const frameDiv = de.query(By.css('div.scLooseFrameZone')).nativeElement;
    const classDiv = de.query(By.css('div.topClass')).nativeElement;
    expect(frameDiv).toBe(classDiv);
  });

  it('should render the datasource in editing mode', () => {
    const mockDatasource = {
      itemId: 'testItemId',
      databaseName: 'master',
      language: 'en',
    };

    editFrameComp.sitecore = editingContext;
    editFrameComp.dataSource = mockDatasource;
    fixture.detectChanges();

    const frameDiv = de.query(By.css('div.scLooseFrameZone')).nativeElement;
    const frameSpan = de.query(By.css('div.scLooseFrameZone > span.scChromeData')).nativeElement;
    expect(frameDiv.getAttribute('sc_item')).toBe('sitecore://master/testItemId?lang=en');
    expect(frameSpan.textContent).toContain(
      '"contextItemUri":"sitecore://master/testItemId?lang=en"'
    );
  });

  it('should render the buttons in editing mode', () => {
    const mockDatasource = {
      itemId: 'testItemId',
      databaseName: 'master',
      language: 'en',
    };
    const mockButtons: EditButtonTypes[] = [
      DefaultEditFrameButton.insert,
      '|',
      DefaultEditFrameButton.edit,
    ];

    editFrameComp.sitecore = editingContext;
    editFrameComp.dataSource = mockDatasource;
    editFrameComp.buttons = mockButtons;
    fixture.detectChanges();

    const frameSpan = de.query(By.css('div.scLooseFrameZone > span.scChromeData')).nativeElement;

    expect(frameSpan.textContent).toContain(
      `
      "commands":
        [{"isDivider":false,
        "click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:new(id=testItemId)\',null,false)",
        "header":"Insert New",
        "icon":"/~/icon/Office/16x16/insert_from_template.png",
        "tooltip":"Insert a new item",
        "type":null},
        {"click":"chrome:dummy",
        "header":"Separator",
        "icon":"",
        "isDivider":true,
        "tooltip":null,
        "type":"separator"},
        {"isDivider":false,
        "click":"javascript:Sitecore.PageModes.PageEditor.postRequest(\'webedit:fieldeditor(command={70C4EED5-D4CD-4D7D-9763-80C42504F5E7}, fields=Title|Text, id=testItemId)\',null,false)",
        "header":"Edit Item",
        "icon":"/~/icon/people/16x16/cubes_blue.png",
        "tooltip":"Edit the item fields.",
        "type":null}
      ]`.replace(/(\r\n|\n|\r|[\s]{2,})/gm, '')
    ); // ensure expected output is readable for both human and runtime
  });
});
