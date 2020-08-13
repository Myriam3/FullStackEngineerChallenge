<template>
  <div class="input">
    <label v-if="label">{{ label }}</label>
    <input :value="value" v-bind="$attrs" v-on="listeners" />
  </div>
</template>

<script>
import { formFieldMixin } from "@/mixins/formField";

export default {
  mixins: [formFieldMixin],
};
</script>

<style lang="scss" scoped></style>
