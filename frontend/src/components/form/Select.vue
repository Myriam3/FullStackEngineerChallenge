<template>
  <div class="select">
    <label v-if="label"> {{ label }}</label>
    <select :value="value" v-bind="$attrs" v-on="listeners">
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from "@/mixins/formField";
export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
