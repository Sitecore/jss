import { storiesOf } from '@storybook/angular';
import { FormComponent } from './form.component';
import { FormModule } from './form.module';
import * as CopyMarkdown from './form.md';

// Add other dependencies so that this component may stand alone in Storybook
import {MatButtonModule} from '@angular/material';

storiesOf('Components/shared/forms', module)
  .add('form', () => ({
      component: FormComponent,
      // props: {
      //   disabled: boolean('disabled', false),
      //   vertical: boolean('vertical', false),
      //   onChange: action('change')
      // },
      moduleMetadata: {
        imports: [FormModule]
      }
}),
  {
    notes: {markdown: CopyMarkdown},
    cssresources: [
      {
        id: 'form',
        code: `<style>
          .form { /* Put SCSS HERE */ }
        </style>`,
        picked: true
      }
    ]
  }
);
