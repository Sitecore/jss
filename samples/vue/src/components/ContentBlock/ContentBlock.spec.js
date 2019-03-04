import { shallowMount } from '@vue/test-utils';
import ContentBlock from '@/components/ContentBlock/ContentBlock.vue';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-vue';

describe('ContentBlock.vue', () => {
  it('renders props.fields when passed', () => {
    const fields = {
      heading: { value: 'heading' },
      content: { value: 'content' },
    };
    const wrapper = shallowMount(ContentBlock, {
      propsData: { fields },
      stubs: {
        ScText: Text,
        ScRichText: RichText,
      },
    });

    expect(wrapper.html()).toContain('<h2 class="display-4">heading</h2>');
    expect(wrapper.html()).toContain('<div class="contentDescription">content</div>');
  });
});
