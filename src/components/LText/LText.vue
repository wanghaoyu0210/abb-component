<template>
  <component
    :is="tag"
    :style="styleProps"
    class="l-text-component"
    @click="handleClick"
  >
    {{ text }}
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  transformToComponentProps,
  textDefaultProps,
  textStylePropNames,
} from '@/defaultProps';
import useComponentCommon from '@/hooks/useComponentCommon';
const defaultProps = transformToComponentProps(textDefaultProps);
export default defineComponent({
  name: 'LText',
  props: {
    ...defaultProps,
    tag: {
      type: String,
      default: 'div',
    },
  },
  setup(props) {
    const { styleProps, handleClick } = useComponentCommon(
      props,
      textStylePropNames
    );
    return {
      styleProps,
      handleClick,
    };
  },
});
</script>

<style scoped>
.l-text-component {
  position: relative !important;
}
</style>
