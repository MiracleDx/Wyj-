Page({
  data: {
    active: 1,
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },
});