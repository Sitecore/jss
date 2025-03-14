import { h, defineComponent } from 'vue';

export const HiddenRendering = defineComponent({
  render() {
    return h(
      'div',
      {
        style: {
          backgroundSize: '3px 3px',
          backgroundImage:
            'linear-gradient(45deg, #ffffff 25%, #dcdcdc 25%, #dcdcdc 50%, #ffffff 50%, #ffffff 75%, #dcdcdc 75%, #dcdcdc 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px',
          color: '#aaa',
        },
      },
      'The component is hidden'
    );
  },
});
